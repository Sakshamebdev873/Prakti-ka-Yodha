"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rejectSubmission = exports.approveSubmission = exports.assignChallengeToClassroom = exports.createChallengeWithAI = exports.removeStudentFromClassroom = exports.getClassroomDetails = exports.getMyClassrooms = exports.createClassroom = void 0;
const crypto_1 = __importDefault(require("crypto"));
const prisma_1 = __importDefault(require("../libs/prisma"));
const ai_service_1 = require("../services/ai.service");
const client_1 = require("@prisma/client");
// --- 1. Classroom Management ---
const createClassroom = async (req, res) => {
    // Use `profileId` which is the ID of the Teacher profile
    const teacherId = req.user?.profileId;
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Classroom name is required.' });
    }
    const joinCode = crypto_1.default.randomBytes(4).toString('hex').toUpperCase();
    try {
        const classroom = await prisma_1.default.classroom.create({
            // The `teacherId` in the Classroom model now correctly points to a Teacher's ID
            data: { name, teacherId: teacherId, joinCode },
        });
        return res.status(201).json(classroom);
    }
    catch (error) {
        return res.status(500).json({ message: "Server error creating classroom.", error });
    }
};
exports.createClassroom = createClassroom;
const getMyClassrooms = async (req, res) => {
    const teacherId = req.user?.profileId;
    try {
        const classrooms = await prisma_1.default.classroom.findMany({
            where: { teacherId: teacherId },
            include: { _count: { select: { students: true } } },
        });
        return res.status(200).json(classrooms);
    }
    catch (error) {
        return res.status(500).json({ message: "Server error fetching classrooms.", error });
    }
};
exports.getMyClassrooms = getMyClassrooms;
const getClassroomDetails = async (req, res) => {
    const teacherId = req.user?.profileId;
    const { classroomId } = req.params;
    try {
        const classroom = await prisma_1.default.classroom.findFirst({
            where: { id: classroomId, teacherId: teacherId }, // Security check is the same
            include: {
                // The relations are now more explicit and type-safe
                students: {
                    select: {
                        student: {
                            select: { id: true, name: true, ecoScore: true, account: { select: { email: true } } }
                        }
                    }
                }
            },
        });
        if (!classroom) {
            return res.status(404).json({ message: "Classroom not found or you do not have permission." });
        }
        return res.status(200).json(classroom);
    }
    catch (error) {
        return res.status(500).json({ message: "Server error fetching classroom details.", error });
    }
};
exports.getClassroomDetails = getClassroomDetails;
const removeStudentFromClassroom = async (req, res) => {
    const teacherId = req.user?.profileId;
    const { classroomId, studentId } = req.body;
    if (!classroomId || !studentId) {
        return res.status(400).json({ message: "classroomId and studentId are required." });
    }
    try {
        const classroom = await prisma_1.default.classroom.findFirst({ where: { id: classroomId, teacherId: teacherId } });
        if (!classroom) {
            return res.status(403).json({ message: "You do not own this classroom." });
        }
        await prisma_1.default.classroomUser.delete({
            where: { classroomId_studentId: { classroomId, studentId } },
        });
        return res.status(204).send();
    }
    catch (error) {
        return res.status(404).json({ message: "Student not found in this classroom.", error });
    }
};
exports.removeStudentFromClassroom = removeStudentFromClassroom;
// --- 2. Challenge Management ---
const createChallengeWithAI = async (req, res) => {
    const teacherId = req.user?.profileId; // This is now a Teacher ID
    const { topic, challenge_type } = req.body;
    if (!topic || !challenge_type) {
        return res.status(400).json({ message: 'Topic and challenge_type are required.' });
    }
    try {
        const generatedChallenge = await (0, ai_service_1.generateChallengeFromTopic)({ topic, challenge_type });
        const newChallenge = await prisma_1.default.challenge.create({
            // The `authorId` in the Challenge model now correctly points to a Teacher's ID
            data: { ...generatedChallenge, authorId: teacherId },
        });
        return res.status(201).json(newChallenge);
    }
    catch (error) {
        return res.status(500).json({ message: "Failed to generate content.", error: error.message });
    }
};
exports.createChallengeWithAI = createChallengeWithAI;
const assignChallengeToClassroom = async (req, res) => {
    const teacherId = req.user?.profileId;
    const { classroomId, challengeId } = req.body;
    if (!classroomId || !challengeId) {
        return res.status(400).json({ message: "classroomId and challengeId are required." });
    }
    try {
        const classroom = await prisma_1.default.classroom.findFirst({ where: { id: classroomId, teacherId: teacherId } });
        if (!classroom) {
            return res.status(403).json({ message: "You do not own this classroom." });
        }
        const assignment = await prisma_1.default.classroomChallenge.create({
            data: { classroomId, challengeId },
        });
        return res.status(201).json(assignment);
    }
    catch (error) {
        return res.status(500).json({ message: "Failed to assign challenge.", error });
    }
};
exports.assignChallengeToClassroom = assignChallengeToClassroom;
// --- 3. Submission Management ---
const approveSubmission = async (req, res) => {
    // This controller requires a significant refactor because `Project` and `Submission` are now linked to `Student`, not `User`.
    // The security check needs to verify the teacher is in the same institution as the student who made the submission.
    const teacherId = req.user?.profileId;
    const teacherInstitutionId = req.user?.institutionId;
    const { submissionId } = req.params;
    try {
        const updatedSubmission = await prisma_1.default.$transaction(async (tx) => {
            const submission = await tx.submission.findUnique({
                where: { id: submissionId },
                select: {
                    id: true,
                    status: true,
                    student: {
                        select: {
                            id: true,
                            institutionId: true // ...and their institution ID for the security check
                        }
                    },
                    project: {
                        select: {
                        // Assuming you add a points field to Project later on
                        }
                    }
                }
            });
            if (!submission)
                throw new Error("Submission not found.");
            if (submission.status === 'APPROVED')
                throw new Error("Submission has already been approved.");
            // CRITICAL SECURITY CHECK: Is this teacher from the same institution as the student?
            if (submission.student.institutionId !== teacherInstitutionId) {
                throw new Error("Forbidden: You can only approve submissions from your own institution.");
            }
            // 1. Update submission status
            const sub = await tx.submission.update({
                where: { id: submissionId },
                data: { status: client_1.SubmissionStatus.APPROVED },
            });
            // 2. Award ecoScore points to the student
            await tx.student.update({
                where: { id: submission.student.id },
                data: { ecoScore: { increment: 20 } }, // Example: 20 points for an approved project
            });
            return sub;
        });
        return res.status(200).json(updatedSubmission);
    }
    catch (error) {
        return res.status(403).json({ message: "Failed to approve submission.", error: error.message });
    }
};
exports.approveSubmission = approveSubmission;
// ... (at the end of your teacher.controller.ts file)
/**
 * Rejects a student's submission.
 */
const rejectSubmission = async (req, res) => {
    const teacherInstitutionId = req.user?.institutionId;
    const { submissionId } = req.params;
    try {
        const submission = await prisma_1.default.submission.findUnique({
            where: { id: submissionId },
            select: { status: true, student: { select: { institutionId: true } } }
        });
        if (!submission) {
            return res.status(404).json({ message: "Submission not found." });
        }
        if (submission.status !== 'PENDING') {
            return res.status(400).json({ message: `Cannot reject a submission with status '${submission.status}'.` });
        }
        // CRITICAL SECURITY CHECK: Ensure teacher is from the same institution as the student
        if (submission.student.institutionId !== teacherInstitutionId) {
            return res.status(403).json({ message: "Forbidden: You can only manage submissions from your own institution." });
        }
        const rejectedSubmission = await prisma_1.default.submission.update({
            where: { id: submissionId },
            data: { status: 'REJECTED' },
        });
        return res.status(200).json(rejectedSubmission);
    }
    catch (error) {
        return res.status(500).json({ message: "Failed to reject submission.", error: error.message });
    }
};
exports.rejectSubmission = rejectSubmission;
