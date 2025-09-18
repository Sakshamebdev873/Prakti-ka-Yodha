import express from 'express';
import { Role } from '@prisma/client';

// Import the security middleware
import { authenticate, authorize } from '../middleware/auth.middleware.js';

// Import all the relevant controller functions for the Institution Admin
import {
    getInstitutionStats
} from '../controllers/institution/dashboard.institution.controller.js';

import {
    inviteTeacher,
    getTeachersInInstitution,
    getPendingInvitations,
    deleteTeacherInvitation,
    deleteTeacher
} from '../controllers/institution/teacher.institution.controller.js';

import {
    getUsersInInstitution,
    getClassroomsInInstitution
} from '../controllers/institution/management.institution.controller.js';

const router = express.Router();

// -----------------------------------------------------------------------------
// --- Middleware Enforcement ---
// -----------------------------------------------------------------------------
// This line applies to ALL routes defined in this file.
// Every request must have a valid JWT (`authenticate`) and the user's role
// must be 'INSTITUTION_ADMIN' (`authorize`).
router.use(authenticate, authorize([Role.INSTITUTION_ADMIN]));


// -----------------------------------------------------------------------------
// --- Dashboard & Analytics Route ---
// -----------------------------------------------------------------------------

// GET /api/institution/dashboard/stats -> Get key analytics for the admin's own institution
router.get('/dashboard/stats', getInstitutionStats);


// -----------------------------------------------------------------------------
// --- Teacher & Invitation Management Routes ---
// -----------------------------------------------------------------------------

// POST /api/institution/teachers/invite -> Invite a new teacher to this institution
router.post('/teachers/invite', inviteTeacher);

// GET /api/institution/teachers -> Get a paginated list of all teachers in this institution
router.get('/teachers', getTeachersInInstitution);

// GET /api/institution/teachers/invitations -> Get a list of pending invitations
router.get('/teachers/invitations', getPendingInvitations);

// DELETE /api/institution/teachers/invitations/:invitationId -> Revoke a pending invitation
router.delete('/teachers/invitations/:invitationId', deleteTeacherInvitation);

// DELETE /api/institution/teachers/:teacherId -> Remove a teacher from the institution
router.delete('/teachers/:teacherId', deleteTeacher);


// -----------------------------------------------------------------------------
// --- General Institution Management Routes ---
// -----------------------------------------------------------------------------

// GET /api/institution/users -> Get a list of all users (students and teachers) in the institution
router.get('/users', getUsersInInstitution);

// GET /api/institution/classrooms -> Get a list of all classrooms in the institution
router.get('/classrooms', getClassroomsInInstitution);


export default router;