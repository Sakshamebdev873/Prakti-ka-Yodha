"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMySubmissions = exports.createSubmission = exports.startProjectForChallenge = void 0;
const prisma_1 = __importDefault(require("../libs/prisma"));
const client_1 = require("@prisma/client");
/**
 * @route   POST /api/projects/challenge/:challengeId/start
 * @desc    Creates a Project record for a student, linking it to a specific PROJECT challenge.
 * @access  Private (Student only)
 */
const startProjectForChallenge = async (req, res) => {
    const studentId = req.user?.profileId;
    const { challengeId } = req.params;
    const { title } = req.body;
    if (!studentId) {
        return res.status(401).json({ message: "Unauthorized: Student profile not found." });
    }
    if (!title || typeof title !== 'string' || title.length < 5) {
        return res.status(400).json({ message: "A project title of at least 5 characters is required." });
    }
    try {
        const project = await prisma_1.default.$transaction(async (tx) => {
            // Edge Case 1: Ensure the challenge is a valid, active project.
            const challenge = await tx.challenge.findUnique({
                where: { id: challengeId },
            });
            if (!challenge || challenge.type !== 'PROJECT') {
                throw new Error("This challenge is not a valid project.");
            }
            // Edge Case 2: Check if a project for this specific challenge already exists for the student.
            // This prevents creating multiple projects for the same challenge.
            const existingProject = await tx.project.findFirst({
                where: { studentId, challengeId: challenge.id } // Requires adding `challengeId` to Project model
            });
            if (existingProject) {
                throw new Error("You have already started a project for this challenge.");
            }
            // Step 1: Enroll the student in the challenge.
            await tx.userChallenge.upsert({
                where: { studentId_challengeId: { studentId, challengeId } },
                create: { studentId, challengeId, status: client_1.ChallengeStatus.PENDING },
                update: {},
            });
            // Step 2: Create the Project record.
            const newProject = await tx.project.create({
                data: {
                    title,
                    description: `Project for challenge: ${challenge.title}`,
                    studentId,
                    challengeId: challenge.id, // Requires adding `challengeId` to Project model
                }
            });
            return newProject;
        });
        res.status(201).json(project);
    }
    catch (error) {
        // Return a 409 Conflict status if a project for this challenge already exists.
        if (error.message.includes("already started a project")) {
            return res.status(409).json({ message: error.message });
        }
        res.status(400).json({ message: error.message });
    }
};
exports.startProjectForChallenge = startProjectForChallenge;
/**
 * @route   POST /api/submissions/project/:projectId
 * @desc    Allows a student to submit their work for a project they have started.
 * @access  Private (Student only)
 */
const createSubmission = async (req, res) => {
    const studentId = req.user?.profileId;
    const { projectId } = req.params;
    const { content } = req.body;
    if (!studentId) {
        return res.status(401).json({ message: "Unauthorized." });
    }
    if (!content || typeof content !== 'string' || content.length < 20) {
        return res.status(400).json({ message: "Submission content must be at least 20 characters." });
    }
    try {
        // Security Check 1: Verify the project exists and belongs to this student.
        const project = await prisma_1.default.project.findFirst({
            where: { id: projectId, studentId: studentId },
        });
        if (!project) {
            return res.status(403).json({ message: "Forbidden: Project not found or you are not the owner." });
        }
        // Edge Case 1 (LOGIC FIX): Check for an existing PENDING *submission*, not a UserChallenge.
        const existingPendingSubmission = await prisma_1.default.submission.findFirst({
            where: {
                projectId,
                studentId,
                status: client_1.SubmissionStatus.PENDING,
            }
        });
        if (existingPendingSubmission) {
            return res.status(409).json({
                message: "You already have a pending submission for this project. Please wait for it to be reviewed."
            });
        }
        // Edge Case 2: Check if there's an already APPROVED submission.
        const approvedSubmission = await prisma_1.default.submission.findFirst({
            where: { projectId, studentId, status: client_1.SubmissionStatus.APPROVED }
        });
        if (approvedSubmission) {
            return res.status(400).json({ message: "This project has already been approved. You cannot submit again." });
        }
        // If checks pass, create the new submission.
        const submission = await prisma_1.default.submission.create({
            data: {
                content,
                projectId,
                studentId,
                status: client_1.SubmissionStatus.PENDING,
            }
        });
        res.status(201).json(submission);
    }
    catch (error) {
        res.status(500).json({ message: "Server error creating submission.", error });
    }
};
exports.createSubmission = createSubmission;
/**
 * @route   GET /api/student/submissions
 * @desc    Gets a list of all submissions made by the logged-in student.
 * @access  Private (Student only)
 */
const getMySubmissions = async (req, res) => {
    const studentId = req.user?.profileId;
    try {
        const submissions = await prisma_1.default.submission.findMany({
            where: { studentId },
            orderBy: { createdAt: 'desc' },
            include: {
                project: {
                    select: { title: true }
                }
            }
        });
        // Improvement: Standardize the response format
        res.status(200).json(submissions);
    }
    catch (error) {
        res.status(500).json({ message: "Server error fetching submissions.", error });
    }
};
exports.getMySubmissions = getMySubmissions;
