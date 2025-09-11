import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import { generateChallengeFromTopic } from '../services/ai.service';

const prisma = new PrismaClient();

//==========================================================================
// CHALLENGE & ASSIGNMENT MANAGEMENT
//==========================================================================

// in this take care of start date na dend Date
export const createChallengeWithAI = async (req: Request, res: Response): Promise<Response> => {
    // ... (This function remains the same as before)
    const teacherId = req.user?.userId;
    const { topic, challenge_type } = req.body;
    if (!topic || !challenge_type) {
        return res.status(400).json({ message: 'Topic and challenge_type are required.' });
    }
    try {
        const generatedChallenge : any = await generateChallengeFromTopic({ topic, challenge_type });
        const newChallenge = await prisma.challenge.create({
            data: { ...generatedChallenge, authorId: teacherId! }
        });
        return res.status(201).json(newChallenge);
    } catch (error: any) {
        console.error("Error creating AI challenge:", error.message);
        return res.status(500).json({ message: "Failed to generate content.", error: error.message });
    }
};

/**
 * Assigns an existing challenge to one of the teacher's classrooms.
 */
export const assignChallengeToClassroom = async (req: Request, res: Response): Promise<Response> => {
    const teacherId = req.user?.userId;
    const { classroomId, challengeId } = req.body;

    if (!classroomId || !challengeId) {
        return res.status(400).json({ message: "classroomId and challengeId are required." });
    }

    try {
        // Security Check: Verify the teacher owns the classroom
        const classroom = await prisma.classroom.findFirst({
            where: { id: classroomId, teacherId: teacherId }
        });
        if (!classroom) {
            return res.status(403).json({ message: "You do not own this classroom." });
        }

        const assignment = await prisma.classroomChallenge.create({
            data: { classroomId, challengeId }
        });

        return res.status(201).json(assignment);
    } catch (error) {
        // Prisma will throw an error if the challenge doesn't exist or assignment is a duplicate
        return res.status(500).json({ message: "Failed to assign challenge.", error });
    }
};


//==========================================================================
// CLASSROOM & STUDENT MANAGEMENT
//==========================================================================

/**
 * Creates a new classroom for the teacher.
 */
export const createClassroom = async (req: Request, res: Response): Promise<Response> => {
    // ... (This function remains the same as before)
    const teacherId = req.user?.userId;
    const { name } = req.body;
    if (!name) { return res.status(400).json({ message: 'Classroom name is required.' }); }
    const joinCode = crypto.randomBytes(4).toString('hex').toUpperCase();
    try {
        const classroom = await prisma.classroom.create({
            data: { name, teacherId: teacherId!, joinCode }
        });
        return res.status(201).json(classroom);
    } catch (error) {
        return res.status(500).json({ message: "Server error creating classroom.", error });
    }
};

/**
 * Retrieves a list of classrooms owned by the teacher.
 */
export const getMyClassrooms = async (req: Request, res: Response): Promise<Response> => {
    // ... (This function remains the same as before)
    const teacherId = req.user?.userId;
    try {
        const classrooms = await prisma.classroom.findMany({
            where: { teacherId: teacherId },
            include: { _count: { select: { students: true } } }
        });
        return res.status(200).json(classrooms);
    } catch (error) {
        return res.status(500).json({ message: "Server error fetching classrooms.", error });
    }
};

/**
 * Retrieves details of a single classroom, including its student roster.
 */
export const getClassroomDetails = async (req: Request, res: Response): Promise<Response> => {
    // ... (This function remains the same as before)
    const teacherId = req.user?.userId;
    const { classroomId } = req.params;
    try {
        const classroom = await prisma.classroom.findFirst({
            where: { id: classroomId, teacherId: teacherId },
            include: {
                students: { select: { student: { select: { id: true, name: true, email: true, ecoScore: true } } } }
            }
        });
        if (!classroom) {
            return res.status(404).json({ message: "Classroom not found or you do not have permission." });
        }
        return res.status(200).json(classroom);
    } catch (error) {
        return res.status(500).json({ message: "Server error fetching classroom details.", error });
    }
};

/**
 * Removes a student from a classroom owned by the teacher.
 */
export const removeStudentFromClassroom = async (req: Request, res: Response): Promise<Response> => {
    const teacherId = req.user?.userId;
    const { classroomId, studentId } = req.body;

    if (!classroomId || !studentId) {
        return res.status(400).json({ message: "classroomId and studentId are required." });
    }
    
    try {
        // Security Check: Verify the teacher owns the classroom
        const classroom = await prisma.classroom.findFirst({
            where: { id: classroomId, teacherId: teacherId }
        });
        if (!classroom) {
            return res.status(403).json({ message: "You do not own this classroom." });
        }
        
        // Find the specific ClassroomUser record to delete
        await prisma.classroomUser.delete({
            where: {
                classroomId_studentId: {
                    classroomId: classroomId,
                    studentId: studentId,
                }
            }
        });

        return res.status(204).send(); // Success, no content
    } catch (error) {
        // Prisma will throw an error if the student isn't in the class
        return res.status(404).json({ message: "Student not found in this classroom.", error });
    }
};


//==========================================================================
// EVALUATION
//==========================================================================

/**
 * Approves a student's submission, marks their challenge as complete, and awards points.
 */
export const approveSubmission = async (req: Request, res: Response): Promise<Response> => {
    const teacherId = req.user?.userId;
    const { submissionId } = req.params;

    try {
        // This is a complex transaction to ensure data integrity
        const updatedSubmission = await prisma.$transaction(async (tx) => {
            // 1. Find the submission
            const submission = await tx.submission.findUnique({
                where: { id: submissionId },
                include: { project: true }
            });

            if (!submission) {
                throw new Error("Submission not found.");
            }
            
            // Security Check: Is this teacher the author of the project for this submission?
            if (submission.project.userId !== teacherId) {
                throw new Error("You are not the author of the project for this submission.");
            }

            // 2. Update submission status
            const sub = await tx.submission.update({
                where: { id: submissionId },
                data: { status: 'APPROVED' }
            });

            // 3. Mark the UserChallenge as COMPLETED
            // This is a placeholder for a more complex lookup. You might need to find which challenge this project was for.
            // For now, we assume a direct link or a simple lookup is possible.

            // 4. Award points (ecoScore) to the student
            // For now, let's assume a fixed point value for an approved project
            await tx.user.update({
                where: { id: submission.userId },
                data: { ecoScore: { increment: 20 } } // Example: 20 points for an approved project
            });

            return sub;
        });

        return res.status(200).json(updatedSubmission);
    } catch (error: any) {
        return res.status(500).json({ message: "Failed to approve submission.", error: error.message });
    }
};