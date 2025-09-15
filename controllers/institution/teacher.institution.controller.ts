import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import prisma from '../../libs/prisma';

export const inviteTeacher = async (req: Request, res: Response) => {
    const { email } = req.body;
    const { institutionId, accountId } = req.user || {}; // Get data from JWT

    if (!email) {
        return res.status(400).json({ message: "Teacher's email is required." });
    }
    if (!institutionId || !accountId) {
        return res.status(403).json({ message: "Invalid user token for this action." });
    }

    try {
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        const token = uuidv4();
        
        const invitation = await prisma.teacherInvitation.create({
            data: {
                email,
                institutionId,
                token,
                expiresAt,
                invitedByAccountId: accountId, // Correctly link to the inviter's Account
            },
        });

        const registrationLink = `${process.env.FRONTEND_URL}/register/teacher?token=${token}`;
        console.log(`(Email Sim) Teacher invite for ${email}: ${registrationLink}`);

        res.status(201).json({ message: "Teacher invitation sent successfully.", invitation });
    } catch (error) {
        res.status(500).json({ message: "Error sending invitation.", error });
    }
};

export const getTeachersInInstitution = async (req: Request, res: Response) => {
    const { institutionId } = req.user || {};
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 15;
    const skip = (page - 1) * limit;

    try {
        const teachers = await prisma.teacher.findMany({
            where: { institutionId : institutionId as string },
            skip,
            take: limit,
            select: { id: true, name: true, account: { select: { email: true } } },
            orderBy: { name: 'asc' },
        });

        const totalTeachers = await prisma.teacher.count({ where: { institutionId : institutionId as string } });

        res.status(200).json({
            data: teachers,
            currentPage: page,
            totalPages: Math.ceil(totalTeachers / limit),
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching teachers.", error });
    }
};

export const getPendingInvitations = async (req: Request, res: Response) => {
    const { institutionId } = req.user || {};

    try {
        const invitations = await prisma.teacherInvitation.findMany({
            where: { institutionId : institutionId as string, status: 'PENDING' },
            select: { id: true, email: true, expiresAt: true, createdAt: true },
            orderBy: { createdAt: 'desc' },
        });
        res.status(200).json(invitations);
    } catch (error) {
        res.status(500).json({ message: "Error fetching pending invitations.", error });
    }
};

export const deleteTeacherInvitation = async (req: Request, res: Response) => {
    const { invitationId } = req.params;
    const { institutionId } = req.user || {};

    try {
        // Security check is built-in: can only delete invitations from own institution
        await prisma.teacherInvitation.delete({
            where: { id: invitationId, institutionId : institutionId as string},
        });
        res.status(204).send(); // 204 No Content is more appropriate
    } catch (error) {
        if ((error as any).code === 'P2025') {
            return res.status(404).json({ message: "Invitation not found or you do not have permission to delete it." });
        }
        res.status(500).json({ message: "Error revoking invitation.", error });
    }
};

export const deleteTeacher = async (req: Request, res: Response) => {
    const { teacherId } = req.params; // teacherId is the Teacher profile ID
    const { institutionId } = req.user || {};

    try {
        // This is a more complex delete. We must delete the Account, which will cascade.
        // First, find the teacher to get their accountId.
        const teacher = await prisma.teacher.findFirst({
            where: {
                id: teacherId,
        institutionId : institutionId as string
            },
            select: { accountId: true }
        });

        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found in this institution." });
        }

        // Now, delete the central Account record. The `onDelete: Cascade` in the schema
        // will automatically delete the linked Teacher profile.
        await prisma.account.delete({
            where: { id: teacher.accountId }
        });

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Error removing teacher.", error });
    }
};