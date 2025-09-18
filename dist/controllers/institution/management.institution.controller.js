"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClassroomsInInstitution = exports.getUsersInInstitution = void 0;
const prisma_1 = __importDefault(require("../../libs/prisma"));
const getUsersInInstitution = async (req, res) => {
    const { institutionId } = req.user || {};
    try {
        // This is a more complex query now. We fetch from each profile table.
        const students = await prisma_1.default.student.findMany({
            where: { institutionId: institutionId },
            select: { id: true, name: true, ecoScore: true, account: { select: { email: true, role: true } } },
        });
        const teachers = await prisma_1.default.teacher.findMany({
            where: { institutionId: institutionId },
            select: { id: true, name: true, account: { select: { email: true, role: true } } },
        });
        // Combine the results with their roles for the frontend
        const users = [...students, ...teachers].sort((a, b) => a.name.localeCompare(b.name));
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching institution users.", error });
    }
};
exports.getUsersInInstitution = getUsersInInstitution;
const getClassroomsInInstitution = async (req, res) => {
    const { institutionId } = req.user || {};
    try {
        const classrooms = await prisma_1.default.classroom.findMany({
            where: { teacher: { institutionId: institutionId } }, // Filter by the teacher's institution
            include: {
                teacher: { select: { name: true } },
                _count: { select: { students: true } },
            },
        });
        res.status(200).json(classrooms);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching classrooms.", error });
    }
};
exports.getClassroomsInInstitution = getClassroomsInInstitution;
