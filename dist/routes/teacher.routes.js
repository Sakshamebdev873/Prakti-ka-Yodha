"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_1 = __importDefault(require("../middleware/authenticate"));
const authorize_1 = __importDefault(require("../middleware/authorize"));
const teacher_controllers_1 = require("../controllers/teacher.controllers");
const router = (0, express_1.Router)();
// A user must be logged in (authenticate) AND have the correct role (authorize)
// to access any of these routes.
//==========================================================================
// CHALLENGE & ASSIGNMENT ROUTES
//==========================================================================
// POST /api/teacher/challenges/generate
// Creates a new challenge using the AI service.
// Accessible by Teachers and Admins.
router.post('/challenges/generate', authenticate_1.default, (0, authorize_1.default)(['TEACHER', 'ADMIN']), teacher_controllers_1.createChallengeWithAI);
// POST /api/teacher/challenges/assign
// Assigns an existing challenge to a specific classroom.
// Accessible by Teachers and Admins.
router.post('/challenges/assign', authenticate_1.default, (0, authorize_1.default)(['TEACHER', 'ADMIN']), teacher_controllers_1.assignChallengeToClassroom);
//==========================================================================
// CLASSROOM & STUDENT MANAGEMENT ROUTES
//==========================================================================
// POST /api/teacher/classrooms
// Creates a new classroom.
// Accessible only by Teachers.
router.post('/classrooms', authenticate_1.default, (0, authorize_1.default)(['TEACHER']), teacher_controllers_1.createClassroom);
// GET /api/teacher/classrooms
// Gets a list of the teacher's own classrooms.
// Accessible only by Teachers.
router.get('/classrooms', authenticate_1.default, (0, authorize_1.default)(['TEACHER']), teacher_controllers_1.getMyClassrooms);
// GET /api/teacher/classrooms/:classroomId
// Gets the detailed roster and information for a specific classroom.
// Accessible only by Teachers.
router.get('/classrooms/:classroomId', authenticate_1.default, (0, authorize_1.default)(['TEACHER']), teacher_controllers_1.getClassroomDetails);
// DELETE /api/teacher/classrooms/remove-student
// Removes a student from a classroom. We use DELETE as it's a destructive action.
// The required IDs are sent in the body for clarity.
router.delete('/classrooms/remove-student', authenticate_1.default, (0, authorize_1.default)(['TEACHER']), teacher_controllers_1.removeStudentFromClassroom);
//==========================================================================
// EVALUATION ROUTES
//==========================================================================
// PATCH /api/teacher/submissions/:submissionId/approve
// Approves a student's project submission.
// We use PATCH because we are modifying the state of the submission.
// Accessible by Teachers and Admins.
router.patch('/submissions/:submissionId/approve', authenticate_1.default, (0, authorize_1.default)(['TEACHER', 'ADMIN']), teacher_controllers_1.approveSubmission);
exports.default = router;
