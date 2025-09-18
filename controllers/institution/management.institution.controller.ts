import { Request, Response } from 'express';
import prisma from '../../libs/prisma';

export const getUsersInInstitution = async (req: Request, res: Response) => {
    const { institutionId } = req.user || {};

    try {
        // This is a more complex query now. We fetch from each profile table.
        const students = await prisma.student.findMany({
            where: { institutionId : institutionId as string },
            select: { id: true, name: true, ecoScore: true, account: { select: { email: true, role: true } } },
        });

        const teachers = await prisma.teacher.findMany({
            where: { institutionId : institutionId as string },
            select: { id: true, name: true, account: { select: { email: true, role: true } } },
        });

        // Combine the results with their roles for the frontend
        const users = [...students, ...teachers].sort((a, b) => a.name.localeCompare(b.name));

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching institution users.", error });
    }
};

export const getClassroomsInInstitution = async (req: Request, res: Response) => {
    const { institutionId } = req.user || {};

    try {
        const classrooms = await prisma.classroom.findMany({
            where: { teacher: { institutionId : institutionId as string } }, // Filter by the teacher's institution
            include: {
                teacher: { select: { name: true } },
                _count: { select: { students: true } },
            },
        });
        res.status(200).json(classrooms);
    } catch (error) {
        res.status(500).json({ message: "Error fetching classrooms.", error });
    }
};