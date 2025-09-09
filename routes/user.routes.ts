import { Router } from 'express';
import authenticate from '../middleware/authenticate'; // Your authentication middleware
import { 
    getUserProfile, 
    updateUserProfile, 
    changePassword 
} from '../controllers/userControllers';

const router = Router();


router.get('/me', authenticate, getUserProfile);
router.patch('/me', authenticate, updateUserProfile);
router.post('/me/change-password', authenticate, changePassword);

export default router;