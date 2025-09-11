import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const getInstitutionStats = async (req:Request,res:Response) =>{
    const institutionId = (req as any).user.institutionId
    try {
        const totalStudents = await prisma.user.count({where : {institutionId,role : 'STUDENT'}})
        const totalTeachers = await prisma.user.count({where : {institutionId,role : "TEACHER"}})
        const ecoScoreAggregation = await prisma.user.aggregate({
            _sum : {ecoScore : true},
            where : {institutionId}
        })
        const totalEcoScore = ecoScoreAggregation._sum.ecoScore || 0;
        const topStudents = await prisma.user.findMany({
            where : {institutionId,role : 'STUDENT'},
            orderBy : {ecoScore : 'desc'},
            take : 5,
            select : {name : true,ecoScore : true}
        })
          res.status(200).json({
            totalStudents,
            totalTeachers,
            totalEcoScore,
            topStudents
        });
    } catch (error) {
         res.status(500).json({ message: 'Error fetching institution stats.', error });
    }
}