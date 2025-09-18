"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const auth_middleware_js_1 = require("../middleware/auth.middleware.js");
// Import the new controller functions
const student_controller_js_1 = require("../controllers/student/student.controller.js");
const router = express_1.default.Router();
// --- Middleware Enforcement ---
// This ensures that EVERY route in this file is only accessible by an
// authenticated user with the 'STUDENT' role.
router.use(auth_middleware_js_1.authenticate, (0, auth_middleware_js_1.authorize)([client_1.Role.STUDENT]));
// --- Dashboard and Profile Routes ---
// GET /api/student/dashboard -> Get all data for the main dashboard
router.get('/dashboard', student_controller_js_1.getStudentDashboard);
// GET /api/student/badges -> Get a paginated list of the student's earned badges
router.get('/badges', student_controller_js_1.getMyBadges);
exports.default = router;
