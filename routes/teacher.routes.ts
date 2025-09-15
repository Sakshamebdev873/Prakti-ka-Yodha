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

router.post(
    '/challenges/generate', 
    authenticate, 
    authorize(['TEACHER', 'ADMIN']), 
    createChallengeWithAI
);


router.post(
    '/challenges/assign',
    authenticate,
    authorize(['TEACHER', 'ADMIN']),
    assignChallengeToClassroom
);



router.post(
    '/classrooms',
    authenticate,
    authorize(['TEACHER']),
    createClassroom
);


router.get(
    '/classrooms',
    authenticate,
    authorize(['TEACHER']),
    getMyClassrooms
);


router.get(
    '/classrooms/:classroomId',
    authenticate,
    authorize(['TEACHER']),
    getClassroomDetails
);


router.delete(
    '/classrooms/remove-student',
    authenticate,
    authorize(['TEACHER']),
    removeStudentFromClassroom
);



router.patch(
    '/submissions/:submissionId/approve',
    authenticate,
    authorize(['TEACHER', 'ADMIN']),
    approveSubmission
);


export default router;