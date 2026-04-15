import express from 'express';
import { register, verifyOTP, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/verify-otp', verifyOTP); // New route
router.post('/login', login);          // New route

export default router;