"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyBadges = exports.getStudentDashboard = void 0;
const prisma_1 = __importDefault(require("../../libs/prisma"));
/**
 * @route   GET /api/student/dashboard
 * @desc    Fetches all necessary data for the student's main dashboard page.
 * @access  Private (Student only)
 */
const getStudentDashboard = async (req, res) => {
    const studentId = req.user?.profileId;
    if (!studentId) {
        return res
            .status(401)
            .json({
            message: "Unauthorized: Student profile ID not found in token.",
        });
    }
    try {
        const [profile, pendingChallenges, recentBadges, leaderboardEntry] = await Promise.all([
            // Query 1: Get the core student profile info
            prisma_1.default.student.findUnique({
                where: { id: studentId },
                select: {
                    name: true,
                    ecoScore: true,
                    streakCount: true,
                    avatar: true,
                    institution: { select: { name: true } },
                },
            }),
            // Query 2: Get the 5 most recent challenges they've started but not completed
            prisma_1.default.badgeUser.findMany({
                where: { studentId },
                take: 3,
                orderBy: { awardedAt: "desc" },
                include: { badge: { select: { name: true, icon: true } } },
            }),
            // Query 3: Get the 3 most recently awarded badges
            prisma_1.default.badgeUser.findMany({
                where: { studentId },
                take: 3,
                orderBy: { awardedAt: "desc" },
                include: { badge: { select: { name: true, icon: true } } },
            }),
            // Query 4: Get the student's entry from the 'ALL_TIME' leaderboard
            // (You might need to create this leaderboard first in your database)
            prisma_1.default.leaderboardEntry.findFirst({
                where: {
                    studentId,
                    leaderboard: { period: "ALL_TIME" },
                },
                select: { score: true, leaderboard: { select: { name: true } } },
            }),
        ]);
        if (!profile) {
            return res.status(404).json({ message: "Student profile not found" });
        }
        const dashboardData = {
            profile,
            pendingChallenges,
            recentBadges,
            leaderboard: leaderboardEntry,
        };
        res.status(200).json(dashboardData);
    }
    catch (error) {
        console.error("Error fetching student dashboard:", error);
        res.status(500).json({ message: "Server error fetching dashboard data." });
    }
};
exports.getStudentDashboard = getStudentDashboard;
/**
 * @route   GET /api/student/badges
 * @desc    Gets a full, paginated list of all badges the student has earned.
 * @access  Private (Student only)
 */
const getMyBadges = async (req, res) => {
    const studentId = req.user?.profileId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    try {
        const badges = await prisma_1.default.badgeUser.findMany({
            where: { studentId }, skip,
            take: limit,
            orderBy: { awardedAt: 'desc' },
            include: {
                badge: { select: { name: true, description: true, tier: true, icon: true } }
            }
        });
        const totalBages = await prisma_1.default.badgeUser.count({ where: { studentId } });
        res.status(200).json({ data: badges, currentPage: page, totalPages: Math.ceil(totalBages / limit) });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching student badges." });
    }
};
exports.getMyBadges = getMyBadges;
