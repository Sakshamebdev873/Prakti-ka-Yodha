import { Router } from 'express';
import authenticate from '../middleware/authenticate';
import authorize from '../middleware/authorize';
import { 
    // Challenge Management
    createChallengeWithAI,
    assignChallengeToClassroom,

    // Classroom & Student Management
    createClassroom,
    getMyClassrooms,
    getClassroomDetails,
    removeStudentFromClassroom,
    
    // Evaluation
    approveSubmission
} from '../controllers/teacher.controllers';

const router = Router();

// A user must be logged in (authenticate) AND have the correct role (authorize)
// to access any of these routes.

//==========================================================================
// CHALLENGE & ASSIGNMENT ROUTES
//==========================================================================

// POST /api/teacher/challenges/generate
// Creates a new challenge using the AI service.
// Accessible by Teachers and Admins.
router.post(
    '/challenges/generate', 
    authenticate, 
    authorize(['TEACHER', 'ADMIN']), 
    createChallengeWithAI
);

// POST /api/teacher/challenges/assign
// Assigns an existing challenge to a specific classroom.
// Accessible by Teachers and Admins.
router.post(
    '/challenges/assign',
    authenticate,
    authorize(['TEACHER', 'ADMIN']),
    assignChallengeToClassroom
);


//==========================================================================
// CLASSROOM & STUDENT MANAGEMENT ROUTES
//==========================================================================

// POST /api/teacher/classrooms
// Creates a new classroom.
// Accessible only by Teachers.
router.post(
    '/classrooms',
    authenticate,
    authorize(['TEACHER']),
    createClassroom
);

// GET /api/teacher/classrooms
// Gets a list of the teacher's own classrooms.
// Accessible only by Teachers.
router.get(
    '/classrooms',
    authenticate,
    authorize(['TEACHER']),
    getMyClassrooms
);

// GET /api/teacher/classrooms/:classroomId
// Gets the detailed roster and information for a specific classroom.
// Accessible only by Teachers.
router.get(
    '/classrooms/:classroomId',
    authenticate,
    authorize(['TEACHER']),
    getClassroomDetails
);

// DELETE /api/teacher/classrooms/remove-student
// Removes a student from a classroom. We use DELETE as it's a destructive action.
// The required IDs are sent in the body for clarity.
router.delete(
    '/classrooms/remove-student',
    authenticate,
    authorize(['TEACHER']),
    removeStudentFromClassroom
);


//==========================================================================
// EVALUATION ROUTES
//==========================================================================

// PATCH /api/teacher/submissions/:submissionId/approve
// Approves a student's project submission.
// We use PATCH because we are modifying the state of the submission.
// Accessible by Teachers and Admins.
router.patch(
    '/submissions/:submissionId/approve',
    authenticate,
    authorize(['TEACHER', 'ADMIN']),
    approveSubmission
);


export default router;