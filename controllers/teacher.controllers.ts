import { Request, Response } from 'express';
import crypto from 'crypto';
import prisma from '../libs/prisma'; 
import { generateChallengeFromTopic } from '../services/ai.service';
import { SubmissionStatus } from '@prisma/client';

// --- 1. Classroom Management ---

export const createClassroom = async (req: Request, res: Response) => {
    // Use `profileId` which is the ID of the Teacher profile
    const teacherId = req.user?.profileId;
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Classroom name is required.' });
    }
    const joinCode = crypto.randomBytes(4).toString('hex').toUpperCase();

    try {
        const classroom = await prisma.classroom.create({
            // The `teacherId` in the Classroom model now correctly points to a Teacher's ID
            data: { name, teacherId: teacherId!, joinCode },
        });
        return res.status(201).json(classroom);
    } catch (error) {
        return res.status(500).json({ message: "Server error creating classroom.", error });
    }
};

export const getMyClassrooms = async (req: Request, res: Response) => {
    const teacherId = req.user?.profileId;

    try {
        const classrooms = await prisma.classroom.findMany({
            where: { teacherId: teacherId },
            include: { _count: { select: { students: true } } },
        });
        return res.status(200).json(classrooms);
    } catch (error) {
        return res.status(500).json({ message: "Server error fetching classrooms.", error });
    }
};

export const getClassroomDetails = async (req: Request, res: Response) => {
    const teacherId = req.user?.profileId;
    const { classroomId } = req.params;

    try {
        const classroom = await prisma.classroom.findFirst({
            where: { id: classroomId, teacherId: teacherId }, // Security check is the same
            include: {
                // The relations are now more explicit and type-safe
                students: {
                    select: {
                        student: { // Navigate through the ClassroomUser to the Student profile
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
    } catch (error) {
        return res.status(500).json({ message: "Server error fetching classroom details.", error });
    }
};

export const removeStudentFromClassroom = async (req: Request, res: Response) => {
    const teacherId = req.user?.profileId;
    const { classroomId, studentId } = req.body;

    if (!classroomId || !studentId) {
        return res.status(400).json({ message: "classroomId and studentId are required." });
    }

    try {
        const classroom = await prisma.classroom.findFirst({ where: { id: classroomId, teacherId: teacherId } });
        if (!classroom) {
            return res.status(403).json({ message: "You do not own this classroom." });
        }

        await prisma.classroomUser.delete({
            where: { classroomId_studentId: { classroomId, studentId } },
        });

        return res.status(204).send();
    } catch (error) {
        return res.status(404).json({ message: "Student not found in this classroom.", error });
    }
};

// --- 2. Challenge Management ---

export const createChallengeWithAI = async (req: Request, res: Response) => {
    const teacherId = req.user?.profileId; // This is now a Teacher ID
    const { topic, challenge_type } = req.body;

    if (!topic || !challenge_type) {
        return res.status(400).json({ message: 'Topic and challenge_type are required.' });
    }

    try {
        const generatedChallenge: any = await generateChallengeFromTopic({ topic, challenge_type });
        const newChallenge = await prisma.challenge.create({
            // The `authorId` in the Challenge model now correctly points to a Teacher's ID
            data: { ...generatedChallenge, authorId: teacherId! },
        });
        return res.status(201).json(newChallenge);
    } catch (error: any) {
        return res.status(500).json({ message: "Failed to generate content.", error: error.message });
    }
};

export const assignChallengeToClassroom = async (req: Request, res: Response) => {
    const teacherId = req.user?.profileId;
    const { classroomId, challengeId } = req.body;

    if (!classroomId || !challengeId) {
        return res.status(400).json({ message: "classroomId and challengeId are required." });
    }

    try {
        const classroom = await prisma.classroom.findFirst({ where: { id: classroomId, teacherId: teacherId } });
        if (!classroom) {
            return res.status(403).json({ message: "You do not own this classroom." });
        }

        const assignment = await prisma.classroomChallenge.create({
            data: { classroomId, challengeId },
        });

        return res.status(201).json(assignment);
    } catch (error) {
        return res.status(500).json({ message: "Failed to assign challenge.", error });
    }
};

// --- 3. Submission Management ---

export const approveSubmission = async (req: Request, res: Response) => {
    // This controller requires a significant refactor because `Project` and `Submission` are now linked to `Student`, not `User`.
    // The security check needs to verify the teacher is in the same institution as the student who made the submission.
    const teacherId = req.user?.profileId;
    const teacherInstitutionId = req.user?.institutionId;
    const { submissionId } = req.params;

    try {
        const updatedSubmission = await prisma.$transaction(async (tx) => {
            const submission = await tx.submission.findUnique({
                where: { id: submissionId },
                select: {
                    id: true,
                    status: true,
                    student: { // Include the student...
                        select: {
                            id: true,
                            institutionId: true // ...and their institution ID for the security check
                        }
                    },
                    project: { // Also include the project to get its point value if needed
                        select: {
                            // Assuming you add a points field to Project later on
                        }
                    }
                }
            });

            if (!submission) throw new Error("Submission not found.");
            if (submission.status === 'APPROVED') throw new Error("Submission has already been approved.");

            // CRITICAL SECURITY CHECK: Is this teacher from the same institution as the student?
            if (submission.student.institutionId !== teacherInstitutionId) {
                throw new Error("Forbidden: You can only approve submissions from your own institution.");
            }

            // 1. Update submission status
            const sub = await tx.submission.update({
                where: { id: submissionId },
                data: { status: SubmissionStatus.APPROVED },
            });

            // 2. Award ecoScore points to the student
            await tx.student.update({
                where: { id: submission.student.id },
                data: { ecoScore: { increment: 20 } }, // Example: 20 points for an approved project
            });

            return sub;
        });

        return res.status(200).json(updatedSubmission);
    } catch (error: any) {
        return res.status(403).json({ message: "Failed to approve submission.", error: error.message });
    }
};
// ... (at the end of your teacher.controller.ts file)

/**
 * Rejects a student's submission.
 */
export const rejectSubmission = async (req: Request, res: Response) => {
    const teacherInstitutionId = req.user?.institutionId;
    const { submissionId } = req.params;

    try {
        const submission = await prisma.submission.findUnique({
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

        const rejectedSubmission = await prisma.submission.update({
            where: { id: submissionId },
            data: { status: 'REJECTED' },
        });

        return res.status(200).json(rejectedSubmission);
    } catch (error: any) {
        return res.status(500).json({ message: "Failed to reject submission.", error: error.message });
    }
};