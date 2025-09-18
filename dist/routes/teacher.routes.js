"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const auth_middleware_js_1 = require("../middleware/auth.middleware.js");
// Import all the relevant controller functions
const teacher_controllers_js_1 = require("../controllers/teacher.controllers.js");
const router = express_1.default.Router();
// -----------------------------------------------------------------------------
// --- Middleware Enforcement ---
// -----------------------------------------------------------------------------
// This line applies to ALL routes defined in this file.
// Every request must have a valid JWT (`authenticate`) and the user's role
// must be 'TEACHER' (`authorize`).
router.use(auth_middleware_js_1.authenticate, (0, auth_middleware_js_1.authorize)([client_1.Role.TEACHER]));
// -----------------------------------------------------------------------------
// --- Classroom Management Routes ---
// -----------------------------------------------------------------------------
// Create a new classroom
// POST /api/teacher/classrooms
router.post('/classrooms', teacher_controllers_js_1.createClassroom);
// Get a list of all classrooms owned by the currently logged-in teacher
// GET /api/teacher/classrooms
router.get('/classrooms', teacher_controllers_js_1.getMyClassrooms);
// Get the detailed view of a single classroom, including its student list
// GET /api/teacher/classrooms/:classroomId
router.get('/classrooms/:classroomId', teacher_controllers_js_1.getClassroomDetails);
// Remove a student from a classroom
// DELETE /api/teacher/classrooms/students
router.delete('/classrooms/students', teacher_controllers_js_1.removeStudentFromClassroom);
// -----------------------------------------------------------------------------
// --- Challenge & Assignment Routes ---
// -----------------------------------------------------------------------------
// Create a new challenge using the AI service
// POST /api/teacher/challenges/ai-create
router.post('/challenges/ai-create', teacher_controllers_js_1.createChallengeWithAI);
// Assign an existing challenge to one of the teacher's classrooms
// POST /api/teacher/challenges/assign
router.post('/challenges/assign', teacher_controllers_js_1.assignChallengeToClassroom);
// -----------------------------------------------------------------------------
// --- Submission Review Routes ---
// -----------------------------------------------------------------------------
// Approve a student's project submission
// PUT /api/teacher/submissions/:submissionId/approve
router.put('/submissions/:submissionId/approve', teacher_controllers_js_1.approveSubmission);
// Reject a student's project submission
// PUT /api/teacher/submissions/:submissionId/reject
// (You'll need to create the `rejectSubmission` controller function for this)
router.put('/submissions/:submissionId/reject', teacher_controllers_js_1.rejectSubmission);
exports.default = router;
