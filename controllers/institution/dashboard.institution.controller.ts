import { Request, Response } from 'express';
import prisma from '../../libs/prisma';

export const getInstitutionStats = async (req: Request, res: Response) => {
    // The institutionId is attached to the JWT payload
    const institutionId = req.user?.institutionId;
    if (!institutionId) {
        return res.status(403).json({ message: "User is not associated with an institution." });
    }

    try {
        // Query the specific Student and Teacher tables, filtered by institutionId
        const totalStudents = await prisma.student.count({ where: { institutionId } });
        const totalTeachers = await prisma.teacher.count({ where: { institutionId } });

        // Aggregate ecoScore from the Student table
        const ecoScoreAggregation = await prisma.student.aggregate({
            _sum: { ecoScore: true },
            where: { institutionId },
        });
        const totalEcoScore = ecoScoreAggregation._sum.ecoScore || 0;

        // Find top students from the Student table
        const topStudents = await prisma.student.findMany({
            where: { institutionId },
            orderBy: { ecoScore: 'desc' },
            take: 5,
            select: { name: true, ecoScore: true },
        });

        res.status(200).json({
            totalStudents,
            totalTeachers,
            totalEcoScore,
            topStudents,
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching institution stats.", error });
    }
};