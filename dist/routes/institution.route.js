"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
// Import the security middleware
const auth_middleware_js_1 = require("../middleware/auth.middleware.js");
// Import all the relevant controller functions for the Institution Admin
const dashboard_institution_controller_js_1 = require("../controllers/institution/dashboard.institution.controller.js");
const teacher_institution_controller_js_1 = require("../controllers/institution/teacher.institution.controller.js");
const management_institution_controller_js_1 = require("../controllers/institution/management.institution.controller.js");
const router = express_1.default.Router();
// -----------------------------------------------------------------------------
// --- Middleware Enforcement ---
// -----------------------------------------------------------------------------
// This line applies to ALL routes defined in this file.
// Every request must have a valid JWT (`authenticate`) and the user's role
// must be 'INSTITUTION_ADMIN' (`authorize`).
router.use(auth_middleware_js_1.authenticate, (0, auth_middleware_js_1.authorize)([client_1.Role.INSTITUTION_ADMIN]));
// -----------------------------------------------------------------------------
// --- Dashboard & Analytics Route ---
// -----------------------------------------------------------------------------
// GET /api/institution/dashboard/stats -> Get key analytics for the admin's own institution
router.get('/dashboard/stats', dashboard_institution_controller_js_1.getInstitutionStats);
// -----------------------------------------------------------------------------
// --- Teacher & Invitation Management Routes ---
// -----------------------------------------------------------------------------
// POST /api/institution/teachers/invite -> Invite a new teacher to this institution
router.post('/teachers/invite', teacher_institution_controller_js_1.inviteTeacher);
// GET /api/institution/teachers -> Get a paginated list of all teachers in this institution
router.get('/teachers', teacher_institution_controller_js_1.getTeachersInInstitution);
// GET /api/institution/teachers/invitations -> Get a list of pending invitations
router.get('/teachers/invitations', teacher_institution_controller_js_1.getPendingInvitations);
// DELETE /api/institution/teachers/invitations/:invitationId -> Revoke a pending invitation
router.delete('/teachers/invitations/:invitationId', teacher_institution_controller_js_1.deleteTeacherInvitation);
// DELETE /api/institution/teachers/:teacherId -> Remove a teacher from the institution
router.delete('/teachers/:teacherId', teacher_institution_controller_js_1.deleteTeacher);
// -----------------------------------------------------------------------------
// --- General Institution Management Routes ---
// -----------------------------------------------------------------------------
// GET /api/institution/users -> Get a list of all users (students and teachers) in the institution
router.get('/users', management_institution_controller_js_1.getUsersInInstitution);
// GET /api/institution/classrooms -> Get a list of all classrooms in the institution
router.get('/classrooms', management_institution_controller_js_1.getClassroomsInInstitution);
exports.default = router;
