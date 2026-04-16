import express from 'express';
import { createRazorpayOrder, verifyPayment, getUserOrders, placeOrder} from '../controllers/orderController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// 🔥 CREATE ORDER (RAZORPAY)
router.post('/create-order', auth, createRazorpayOrder);
router.get('/', auth, getUserOrders);
router.post('/place', auth, placeOrder);
// 🔥 VERIFY PAYMENT + SAVE ORDER
router.post('/verify-payment', auth, verifyPayment);

export default router;