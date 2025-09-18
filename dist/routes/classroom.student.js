"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const auth_middleware_js_1 = require("../middleware/auth.middleware.js");
const classroom_student_controller_js_1 = require("../controllers/classroom.student.controller.js");
const router = express_1.default.Router();
// --- Middleware Enforcement ---
// The student must be authenticated for all these routes.
router.use(auth_middleware_js_1.authenticate, (0, auth_middleware_js_1.authorize)([client_1.Role.STUDENT]));
// --- Student-Specific Classroom Routes ---
// The student's list of classrooms is personal, so it belongs under the /student prefix
// GET /api/student/classrooms
router.get('/student/classrooms', classroom_student_controller_js_1.getMyClassrooms);
// Joining a classroom is an action performed by a student
// POST /api/classrooms/join
router.post('/classrooms/join', classroom_student_controller_js_1.joinClassroom);
// Viewing and leaving a specific classroom
// These routes are on the /classrooms resource, but are protected by the student role.
router.get('/classrooms/:classroomId', classroom_student_controller_js_1.getClassroomDetails);
router.delete('/classrooms/:classroomId/leave', classroom_student_controller_js_1.leaveClassroom);
exports.default = router;
