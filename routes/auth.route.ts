import { Router, type Request, type Response } from 'express';
import { signUp, signIn, refreshToken, signOut } from '../controllers/authControllers.js';
import authenticate from '../middleware/authenticate.js';


const router = Router();

router.post('/register', signUp);
router.post('/login', signIn);
router.post('/refresh', refreshToken);
router.post('/logout', authenticate,signOut);

// Example of a protected route using the middleware
router.get('/profile', authenticate, (req : Request, res:Response) => {
  // Thanks to our type declaration, req.user is now fully typed and safe to access
  if (req.user) {
    res.json({ message: `Welcome user ${req.user.userId} with role ${req.user.role}`});
  }
});


export default router;