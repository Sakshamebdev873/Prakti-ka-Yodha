"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTeacher = exports.deleteTeacherInvitation = exports.getPendingInvitations = exports.getTeacherInInstitution = exports.getClassroomsInInstitution = exports.getUsersInInstitution = exports.inviteTeacher = exports.getInstitutionStats = void 0;
const prisma_1 = __importDefault(require("../../libs/prisma"));
const uuid_1 = require("uuid");
const getInstitutionStats = async (req, res) => {
    const institutionId = req.user.institutionId;
    try {
        const totalStudents = await prisma_1.default.user.count({
            where: { institutionId, role: "STUDENT" },
        });
        const totalTeachers = await prisma_1.default.user.count({
            where: { institutionId, role: "TEACHER" },
        });
        const ecoScoreAggregation = await prisma_1.default.user.aggregate({
            _sum: { ecoScore: true },
            where: { institutionId },
        });
        const totalEcoScore = ecoScoreAggregation._sum.ecoScore || 0;
        const topStudents = await prisma_1.default.user.findMany({
            where: { institutionId, role: "STUDENT" },
            orderBy: { ecoScore: "desc" },
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
        res
            .status(500)
            .json({ message: "Error fetching institution stats.", error });
    }
};
exports.getInstitutionStats = getInstitutionStats;
const inviteTeacher = async (req, res) => {
    const { email } = req.body;
    const institutionAdmin = req.user;
    if (!email) {
        return res.status(400).json({ message: "Teacher's email is required" });
    }
    try {
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        const token = (0, uuid_1.v4)();
        const invitation = await prisma_1.default.teacherInvitation.create({
            data: {
                email,
                institutionId: institutionAdmin.institutionId,
                token,
                expiresAt,
                invitedBy: institutionAdmin.userId,
            },
        });
        const registrationLink = `https://yourapp.com/register/teacher?token=${token}`;
        console.log(`(Email Sim) Teacher invite for ${email}: ${registrationLink}`);
        res
            .status(201)
            .json({ message: "Teacher invitation sent successfully.", invitation });
    }
    catch (error) {
        res.status(500).json({ message: "Error sending invitation.", error });
    }
};
exports.inviteTeacher = inviteTeacher;
const getUsersInInstitution = async (req, res) => {
    const institutionId = req.user.institutionId;
    try {
        const users = await prisma_1.default.user.findMany({
            where: { institutionId },
            select: { id: true, name: true, email: true, role: true, ecoScore: true },
            orderBy: { name: "asc" },
        });
        res.status(200).json({ users });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Erro fetching institution users.", error });
    }
};
exports.getUsersInInstitution = getUsersInInstitution;
const getClassroomsInInstitution = async (req, res) => {
    const institutionId = req.user.institutionId;
    try {
        const classrooms = await prisma_1.default.classroom.findMany({
            where: { teacher: { institutionId } },
            include: {
                teacher: { select: { name: true } },
                _count: { select: { students: true } },
            },
        });
        res.status(200).json({ classrooms });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching classrooms ", error });
    }
};
exports.getClassroomsInInstitution = getClassroomsInInstitution;
const getTeacherInInstitution = async (req, res) => {
    const institutionId = req.user.institutionId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;
    const skip = (page - 1) * limit;
    try {
        const teachers = await prisma_1.default.user.findMany({
            where: {
                institutionId,
                role: "TEACHER",
            },
            skip,
            take: limit,
            select: { id: true, name: true, email: true, createdAt: true },
            orderBy: { name: "asc" },
        });
        const totalTeachers = await prisma_1.default.user.count({
            where: { institutionId, role: "TEACHER" },
        });
        res
            .status(200)
            .json({
            data: teachers,
            currentPage: page,
            totalPage: Math.ceil(totalTeachers / limit),
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching teachers", error });
    }
};
exports.getTeacherInInstitution = getTeacherInInstitution;
const getPendingInvitations = async (req, res) => {
    const institutionId = req.user.institutionId;
    try {
        const invitations = await prisma_1.default.teacherInvitation.findMany({
            where: { institutionId, status: "PENDING" },
            select: { id: true, email: true, expiresAt: true, createdAt: true },
            orderBy: { createdAt: "desc" },
        });
        res.status(200).json(invitations);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error fetching pending invitations.", error });
    }
};
exports.getPendingInvitations = getPendingInvitations;
const deleteTeacherInvitation = async (req, res) => {
    const { invitationId } = req.params;
    const institutionId = req.user.institutionId;
    try {
        await prisma_1.default.teacherInvitation.delete({
            where: {
                id: invitationId,
                institutionId,
            },
        });
        res
            .status(200)
            .json({ message: "Teacher invitation has been revoked successfully" });
    }
    catch (error) {
        if (error.code === "P2025") {
            return res
                .status(404)
                .json({
                message: "Invitation not found or you do not have permission to delete it.",
            });
        }
        res.status(500).json({ message: "Error revoking invitation.", error });
    }
};
exports.deleteTeacherInvitation = deleteTeacherInvitation;
const deleteTeacher = async (req, res) => {
    const { teacherId } = req.params;
    const institutionId = req.user.institutionId;
    try {
        await prisma_1.default.user.delete({
            where: {
                id: teacherId,
                institutionId,
                role: "TEACHER",
            },
        });
        res
            .status(200)
            .json({ message: "Teacher has been removed from the instituion." });
    }
    catch (error) {
        if (error === "P2025") {
            return res
                .status(404)
                .json({
                message: "Teacher not found in this institution or you do not have permission to remove them.",
            });
        }
        res.status(500).json({ message: "Error removing teacher.", error });
    }
};
exports.deleteTeacher = deleteTeacher;
