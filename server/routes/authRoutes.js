import express from 'express';
import { register, verifyOTP, login, loginDirect, guestLogin} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/verify-otp', verifyOTP); // New route
router.post('/login', login);          // New route
router.post('/login-direct', loginDirect);
router.get('/guest', guestLogin);

export default router;