import express from 'express';
import {
    registerStudent,
    registerTeacher,
    registerInstitutionAdmin,
    signIn,
    signOut,
    refreshToken
} from '../controllers/authControllers.js';

const router = express.Router();

// --- Registration Routes ---

// Public registration for students using a join code
router.post('/register/student', registerStudent);

// Registration for invited teachers using a unique token
router.post('/register/teacher', registerTeacher);

// Registration for invited institution admins using a unique token
router.post('/register/institution-admin', registerInstitutionAdmin);


// --- Session Management Routes ---

// Universal sign-in for all roles
router.post('/signin', signIn);

// Universal sign-out
router.post('/signout', signOut);

// Universal refresh token
router.post('/refresh-token', refreshToken);


export default router;