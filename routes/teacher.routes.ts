import express from 'express';
import { Role } from '@prisma/client';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

// Import all the relevant controller functions
import {
    createClassroom,
    getMyClassrooms,
    getClassroomDetails,
    removeStudentFromClassroom,
    createChallengeWithAI,
    assignChallengeToClassroom,
    approveSubmission,
    rejectSubmission, // It's good practice to have a reject function too
    updateClassroom,
    deleteClassroom,
    addStudentClassroom
} from '../controllers/teacher.controllers.js';

const router = express.Router();

// -----------------------------------------------------------------------------
// --- Middleware Enforcement ---
// -----------------------------------------------------------------------------
// This line applies to ALL routes defined in this file.
// Every request must have a valid JWT (`authenticate`) and the user's role
// must be 'TEACHER' (`authorize`).
router.use(authenticate, authorize([Role.TEACHER]));


// -----------------------------------------------------------------------------
// --- Classroom Management Routes ---
// -----------------------------------------------------------------------------

// Create a new classroom
// POST /api/teacher/classrooms
router.post('/classrooms', createClassroom);

// Get a list of all classrooms owned by the currently logged-in teacher
// GET /api/teacher/classrooms
router.get('/classrooms', getMyClassrooms);

// Get the detailed view of a single classroom, including its student list
// GET /api/teacher/classrooms/:classroomId
router.route('/classrooms/:classroomId').get(getClassroomDetails).put(updateClassroom).delete(deleteClassroom);

// Remove a student from a classroom
// DELETE /api/teacher/classrooms/students
router.delete('/classrooms/students', removeStudentFromClassroom);

router.post('/classrooms/:classroomId/add-student', addStudentClassroom);
// -----------------------------------------------------------------------------
// --- Challenge & Assignment Routes ---
// -----------------------------------------------------------------------------

// Create a new challenge using the AI service
// POST /api/teacher/challenges/ai-create
router.post('/challenges/ai-create', createChallengeWithAI);

// Assign an existing challenge to one of the teacher's classrooms
// POST /api/teacher/challenges/assign
router.post('/challenges/assign', assignChallengeToClassroom);


// -----------------------------------------------------------------------------
// --- Submission Review Routes ---
// -----------------------------------------------------------------------------

// Approve a student's project submission
// PUT /api/teacher/submissions/:submissionId/approve
router.put('/submissions/:submissionId/approve', approveSubmission);

// Reject a student's project submission
// PUT /api/teacher/submissions/:submissionId/reject
// (You'll need to create the `rejectSubmission` controller function for this)
router.put('/submissions/:submissionId/reject', rejectSubmission);


export default router;