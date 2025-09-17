"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.completedChallenge = exports.startChallenge = exports.getAvailableChallenges = void 0;
const prisma_1 = __importDefault(require("../libs/prisma"));
const client_1 = require("@prisma/client");
/**
 * @route   GET /api/challenges
 * @desc    Gets a list of all challenges available to the student.
 *          It intelligently filters out challenges the student has already started or completed.
 * @access  Private (Student only)
 */
const getAvailableChallenges = async (req, res) => {
    const studentId = req.user?.profileId;
    const institutionId = req.user?.institutionId;
    if (!studentId || !institutionId) {
        return res
            .status(401)
            .json({ message: "Unauthorized: Missing user details." });
    }
    try {
        // Step 1: Find the IDs of all challenges the student is already involved with.
        const engagedChallengeIds = (await prisma_1.default.userChallenge.findMany({
            where: { studentId },
            select: { challengeId: true },
        })).map((c) => c.challengeId);
        const classroomsAssignments = await prisma_1.default.classroomUser.findMany({
            where: { studentId },
            include: {
                classroom: {
                    include: { classRoomChallenges: true },
                },
            },
        });
        const classRoomChallengeIds = classroomsAssignments
            .flatMap((cu) => cu.classroom.classRoomChallenges)
            .map((cc) => cc.challengeId);
        // Step 3: Fetch all challenges that are either global OR assigned to their class,
        //         AND that they haven't already started.
        const availableChallenges = await prisma_1.default.challenge.findMany({
            where: {
                id: { notIn: engagedChallengeIds },
                OR: [
                    {
                        // 1. It is a "global" challenge (not tied to any specific classroom).
                        //    (This assumes global challenges are not assigned to any classroom,
                        assignedInClassrooms: { none: {} },
                    },
                    {
                        id: { in: classRoomChallengeIds },
                    },
                ],
            },
            orderBy: { points: "asc" },
            select: {
                id: true,
                title: true,
                description: true,
                type: true,
                points: true,
            },
        });
        res.status(200).json(availableChallenges);
    }
    catch (error) {
        console.error("Error fetching available challenges:", error);
        res.status(500).json({ message: "Server error fetching challenges." });
    }
};
exports.getAvailableChallenges = getAvailableChallenges;
/**
 * @route   POST /api/challenges/:challengeId/start
 * @desc    Allows a student to officially start or accept a challenge.
 * @access  Private (Student only)
 */
const startChallenge = async (req, res) => {
    const studentId = req.user?.profileId;
    const { challengeId } = req.params;
    if (!studentId) {
        return res.status(401).json({ message: "Unauthorized." });
    }
    try {
        const existingUserChallenge = await prisma_1.default.userChallenge.findUnique({
            where: { studentId_challengeId: { studentId, challengeId } }
        });
        if (existingUserChallenge) {
            return res.status(409).json({ message: "You have already started this challenge." });
        }
        const userChallenge = await prisma_1.default.userChallenge.create({
            data: {
                studentId, challengeId, status: client_1.ChallengeStatus.PENDING
            }
        });
        res.status(201).json(userChallenge);
    }
    catch (error) {
        console.error("Error starting challenge:", error);
        // This could fail if the challengeId is invalid (P2025 error code)
        res.status(500).json({ message: "Server error starting challenge." });
    }
};
exports.startChallenge = startChallenge;
/**
 * @route   POST /api/challenges/user-challenge/:userChallengeId/complete
 * @desc    Marks a simple (e.g., DAILY, WEEKLY) challenge as complete and awards points.
 * @access  Private (Student only)
 */
const completedChallenge = async (req, res) => {
    const studentId = req.user?.profileId;
    const { userchallengeId } = req.params;
    if (!studentId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const result = await prisma_1.default.$transaction(async (tx) => {
            // Step 1: Find the UserChallenge record to make sure it exists and belongs to this student.
            const userChallenge = await tx.userChallenge.findFirst({
                where: { id: userchallengeId, studentId: studentId },
                include: { challenge: { select: { points: true, type: true } } }
            });
            if (!userChallenge) {
                throw new Error('Challenge not found or you do not have permission to complete it. ');
            }
            if (userChallenge.status !== client_1.ChallengeStatus.PENDING) {
                throw new Error(`This challenge is already marked as ${userChallenge.status}.`);
            }
            if (userChallenge.challenge.type === 'PROJECT') {
                throw new Error('Project challenges must be approved by a teacher and cannot be self-completed');
            }
            const updatedUserChallenge = await tx.userChallenge.update({
                where: { id: userchallengeId },
                data: {
                    status: client_1.ChallengeStatus.COMPLETED,
                    completedAt: new Date()
                }
            });
            await tx.student.update({
                where: { id: studentId },
                data: {
                    ecoScore: { increment: userChallenge.challenge.points }
                }
            });
            return updatedUserChallenge;
        });
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message }); // Send specific error messages to the client
    }
};
exports.completedChallenge = completedChallenge;
