import express from 'express';
import { Role } from '@prisma/client';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

import {
    startProjectForChallenge,
    createSubmission,
    getMySubmissions
} from '../controllers/submission.student.controller.js';

const router = express.Router();

// --- Middleware Enforcement ---
// All routes in this file require the user to be an authenticated STUDENT.
router.use(authenticate, authorize([Role.STUDENT]));


// --- Project & Submission Routes ---

// Start a new project based on a PROJECT-type challenge
// POST /api/projects/:challengeId/start
router.post('/projects/:challengeId/start', startProjectForChallenge);

// Create a new submission for a specific project
// POST /api/submissions/project/:projectId
router.post('/submissions/project/:projectId', createSubmission);

// Get a list of the logged-in student's personal submissions
// GET /api/student/submissions
router.get('/student/submissions', getMySubmissions);


export default router;