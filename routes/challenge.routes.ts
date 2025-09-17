import express from 'express';
import { Role } from '@prisma/client';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

import {
    getAvailableChallenges,
    startChallenge,
    completedChallenge
} from '../controllers/challenge.controller.js';

const router = express.Router();

// --- Middleware Enforcement ---
// All routes in this file require a user to be an authenticated STUDENT.
router.use(authenticate, authorize([Role.STUDENT]));


// --- Challenge Interaction Routes ---

// GET /api/challenges -> Get a list of challenges the student can start
router.get('/', getAvailableChallenges);

// POST /api/challenges/:challengeId/start -> Accept a challenge
router.post('/:challengeId/start', startChallenge);

// POST /api/challenges/user-challenge/:userChallengeId/complete -> Mark a daily/weekly/quiz challenge as done
router.post('/user-challenge/:userChallengeId/complete', completedChallenge);


export default router;