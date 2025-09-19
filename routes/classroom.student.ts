import express from 'express';
import { Role } from '@prisma/client';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

import {
    joinClassroom,
    getMyClassrooms,
    getClassroomDetails,
    leaveClassroom
} from '../controllers/classroom.student.controller.js';

const router = express.Router();

// --- Middleware Enforcement ---
// The student must be authenticated for all these routes.
router.use(authenticate, authorize([Role.STUDENT]));

// --- Student-Specific Classroom Routes ---

// The student's list of classrooms is personal, so it belongs under the /student prefix
// GET /api/student/classrooms
router.get('/student/classrooms', getMyClassrooms);

// Joining a classroom is an action performed by a student
// POST /api/classrooms/join
router.post('/classrooms/join', joinClassroom);

// Viewing and leaving a specific classroom
// These routes are on the /classrooms resource, but are protected by the student role.
router.get('/classrooms/:classroomId', getClassroomDetails);
router.delete('/classrooms/:classroomId/leave', leaveClassroom);

export default router;