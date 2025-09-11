import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPlatformStats = async (req:Request,res:Response) =>{
    try {
        const totalUsers = await prisma.user.count()
        const totalInstitutions = await prisma.institution.count()
        const totalChallengesCompleted = await prisma.userChallenge.count({
            where : {status : 'COMPLETED'}
        })
        const totalSubmissions = await prisma.submission.count()
        
        res.status(200).json({
            totalUsers,
            totalInstitutions,
            totalChallengesCompleted,
            totalSubmissions
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching platform stats.', error });
    }
}