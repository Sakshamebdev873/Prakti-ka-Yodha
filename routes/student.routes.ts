import express from 'express';
import { Role } from '@prisma/client';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

// Import the new controller functions
import {
    getStudentDashboard,
    getMyBadges
} from '../controllers/student/student.controller.js';

const router = express.Router();

// --- Middleware Enforcement ---
// This ensures that EVERY route in this file is only accessible by an
// authenticated user with the 'STUDENT' role.
router.use(authenticate, authorize([Role.STUDENT]));


// --- Dashboard and Profile Routes ---

// GET /api/student/dashboard -> Get all data for the main dashboard
router.get('/dashboard', getStudentDashboard);

// GET /api/student/badges -> Get a paginated list of the student's earned badges
router.get('/badges', getMyBadges);


export default router;