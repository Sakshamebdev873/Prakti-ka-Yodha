"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const auth_middleware_js_1 = require("../middleware/auth.middleware.js");
const challenge_controller_js_1 = require("../controllers/challenge.controller.js");
const router = express_1.default.Router();
// --- Middleware Enforcement ---
// All routes in this file require a user to be an authenticated STUDENT.
router.use(auth_middleware_js_1.authenticate, (0, auth_middleware_js_1.authorize)([client_1.Role.STUDENT]));
// --- Challenge Interaction Routes ---
// GET /api/challenges -> Get a list of challenges the student can start
router.get('/', challenge_controller_js_1.getAvailableChallenges);
// POST /api/challenges/:challengeId/start -> Accept a challenge
router.post('/:challengeId/start', challenge_controller_js_1.startChallenge);
// POST /api/challenges/user-challenge/:userChallengeId/complete -> Mark a daily/weekly/quiz challenge as done
router.post('/user-challenge/:userChallengeId/complete', challenge_controller_js_1.completedChallenge);
exports.default = router;
