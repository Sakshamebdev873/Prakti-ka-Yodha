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
router.post('/challenges/generate', authenticate_1.default, (0, authorize_1.default)(['TEACHER', 'ADMIN']), teacher_controllers_1.createChallengeWithAI);
router.post('/challenges/assign', authenticate_1.default, (0, authorize_1.default)(['TEACHER', 'ADMIN']), teacher_controllers_1.assignChallengeToClassroom);
router.post('/classrooms', authenticate_1.default, (0, authorize_1.default)(['TEACHER']), teacher_controllers_1.createClassroom);
router.get('/classrooms', authenticate_1.default, (0, authorize_1.default)(['TEACHER']), teacher_controllers_1.getMyClassrooms);
router.get('/classrooms/:classroomId', authenticate_1.default, (0, authorize_1.default)(['TEACHER']), teacher_controllers_1.getClassroomDetails);
router.delete('/classrooms/remove-student', authenticate_1.default, (0, authorize_1.default)(['TEACHER']), teacher_controllers_1.removeStudentFromClassroom);
router.patch('/submissions/:submissionId/approve', authenticate_1.default, (0, authorize_1.default)(['TEACHER', 'ADMIN']), teacher_controllers_1.approveSubmission);
exports.default = router;
