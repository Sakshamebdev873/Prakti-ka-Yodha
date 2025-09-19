"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaveClassroom = exports.getClassroomDetails = exports.getMyClassrooms = exports.joinClassroom = void 0;
const prisma_1 = __importDefault(require("../libs/prisma"));
/**
 * @route   POST /api/classrooms/join
 * @desc    Allows a student to join a classroom using a join code.
 * @access  Private (Student only)
 */
const joinClassroom = async (req, res) => {
    const studentId = req.user?.profileId;
    const { joinCode } = req.body;
    if (!studentId) {
        return res
            .status(401)
            .json({ message: "Unauthorized: Student profile not found" });
    }
    if (!joinCode) {
        return res
            .status(400)
            .json({ message: "A classroom join code is required" });
    }
    try {
        const classroom = await prisma_1.default.classroom.findUnique({
            where: { joinCode },
        });
        if (!classroom) {
            return res
                .status(404)
                .json({ message: "Invalid joinCode. No classroom found. " });
        }
        // Use upsert to either create a new enrollment or do nothing if the
        //         student is already in the class. This prevents duplicate entry errors.
        const classroomUser = await prisma_1.default.classroomUser.upsert({
            where: {
                classroomId_studentId: {
                    classroomId: classroom.id,
                    studentId,
                },
            },
            create: {
                classroomId: classroom.id,
                studentId,
            },
            update: {},
        });
        res.status(201).json({
            message: `Successfully joined classroom: ${classroom.name}`,
            classroom: { id: classroom.id, name: classroom.name },
        });
    }
    catch (error) {
        console.error("Error joining classroom:", error);
        res
            .status(500)
            .json({ message: "Server error while trying to join classroom." });
    }
};
exports.joinClassroom = joinClassroom;
/**
 * @route   GET /api/student/classrooms
 * @desc    Fetches a list of all classrooms the student is currently a member of.
 * @access  Private (Student only)
 */
const getMyClassrooms = async (req, res) => {
    const studentId = req.user?.profileId;
    try {
        const classroomEnrollments = await prisma_1.default.classroomUser.findMany({
            where: { studentId },
            orderBy: { classroom: { name: "asc" } },
            include: {
                classroom: {
                    select: {
                        id: true,
                        name: true,
                        teacher: { select: { name: true } },
                        _count: { select: { students: true } },
                    },
                },
            },
        });
        const classrooms = classroomEnrollments.map((enrollment) => enrollment.classroom);
        res.status(200).json(classrooms);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error fetching classrooms." });
    }
};
exports.getMyClassrooms = getMyClassrooms;
/**
 * @route   GET /api/classrooms/:classroomId
 * @desc    Gets the detailed view of a single classroom the student is enrolled in.
 * @access  Private (Student only)
 */
const getClassroomDetails = async (req, res) => {
    const studentId = req.user?.profileId;
    const { classroomId } = req.params;
    try {
        const enrollment = await prisma_1.default.classroomUser.findUnique({
            where: { classroomId_studentId: { classroomId, studentId } },
        });
        if (!enrollment) {
            return res
                .status(403)
                .json({
                message: "Forbidden: You are not a member of this classroom.",
            });
        }
        const classroomDetails = await prisma_1.default.classroom.findUnique({
            where: { id: classroomId },
            include: {
                teacher: { select: { name: true, avatar: true } },
                classRoomChallenges: {
                    select: {
                        challenge: true,
                    },
                    orderBy: { assignedAt: "desc" },
                },
            },
        });
        res.status(200).json(classroomDetails);
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Server error fetching classroom details." });
    }
};
exports.getClassroomDetails = getClassroomDetails;
/**
 * @route   DELETE /api/classrooms/:classroomId/leave
 * @desc    Allows a student to un-enroll from a classroom.
 * @access  Private (Student only)
 */
const leaveClassroom = async (req, res) => {
    const studentId = req.user?.profileId;
    const { classroomId } = req.params;
    try {
        await prisma_1.default.classroomUser.delete({
            where: { classroomId_studentId: { classroomId, studentId } },
        });
        res.status(204).send(); // Success, No Content
    }
    catch (error) {
        // Prisma's P2025 error code means "Record to delete not found."
        if (error.code === "P2025") {
            return res
                .status(404)
                .json({ message: "You are not a member of this classroom." });
        }
        res.status(500).json({ message: "Server error while leaving classroom." });
    }
};
exports.leaveClassroom = leaveClassroom;
