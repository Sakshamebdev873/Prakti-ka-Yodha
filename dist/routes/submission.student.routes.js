"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const auth_middleware_js_1 = require("../middleware/auth.middleware.js");
const submission_student_controller_js_1 = require("../controllers/submission.student.controller.js");
const router = express_1.default.Router();
// --- Middleware Enforcement ---
// All routes in this file require the user to be an authenticated STUDENT.
router.use(auth_middleware_js_1.authenticate, (0, auth_middleware_js_1.authorize)([client_1.Role.STUDENT]));
// --- Project & Submission Routes ---
// Start a new project based on a PROJECT-type challenge
// POST /api/projects/:challengeId/start
router.post('/projects/:challengeId/start', submission_student_controller_js_1.startProjectForChallenge);
// Create a new submission for a specific project
// POST /api/submissions/project/:projectId
router.post('/submissions/project/:projectId', submission_student_controller_js_1.createSubmission);
// Get a list of the logged-in student's personal submissions
// GET /api/student/submissions
router.get('/student/submissions', submission_student_controller_js_1.getMySubmissions);
exports.default = router;
