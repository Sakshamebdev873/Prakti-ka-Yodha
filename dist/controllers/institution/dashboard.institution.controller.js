"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInstitutionStats = void 0;
const prisma_1 = __importDefault(require("../../libs/prisma"));
const getInstitutionStats = async (req, res) => {
    // The institutionId is attached to the JWT payload
    const institutionId = req.user?.institutionId;
    if (!institutionId) {
        return res.status(403).json({ message: "User is not associated with an institution." });
    }
    try {
        // Query the specific Student and Teacher tables, filtered by institutionId
        const totalStudents = await prisma_1.default.student.count({ where: { institutionId } });
        const totalTeachers = await prisma_1.default.teacher.count({ where: { institutionId } });
        // Aggregate ecoScore from the Student table
        const ecoScoreAggregation = await prisma_1.default.student.aggregate({
            _sum: { ecoScore: true },
            where: { institutionId },
        });
        const totalEcoScore = ecoScoreAggregation._sum.ecoScore || 0;
        // Find top students from the Student table
        const topStudents = await prisma_1.default.student.findMany({
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
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching institution stats.", error });
    }
};
exports.getInstitutionStats = getInstitutionStats;
