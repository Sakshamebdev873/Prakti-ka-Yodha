"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlatformStats = void 0;
const prisma_1 = __importDefault(require("../../libs/prisma"));
const getPlatformStats = async (req, res) => {
    try {
        const cacheStrategy = {
            ttl: 600, // Cache results for 10 minutes (600 seconds)
            swr: 60, // Optional: stale-while-revalidate. Serve stale data for 60s while fetching fresh data in the background.
        };
        const totalUsers = await prisma_1.default.user.count({ cacheStrategy });
        const totalInstitutions = await prisma_1.default.institution.count({ cacheStrategy });
        const totalChallengesCompleted = await prisma_1.default.userChallenge.count({
            where: { status: "COMPLETED" },
            cacheStrategy,
        });
        const totalSubmissions = await prisma_1.default.submission.count({ cacheStrategy });
        res.status(200).json({
            totalUsers,
            totalInstitutions,
            totalChallengesCompleted,
            totalSubmissions,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching platform stats.", error });
    }
};
exports.getPlatformStats = getPlatformStats;
