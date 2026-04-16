import express from 'express';
import { getCart, addToCart, removeFromCart, updateCartQuantity } from '../controllers/cartController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getCart);
router.post('/add', auth, addToCart);
router.delete('/remove/:cart_id', auth, removeFromCart);
router.put('/update', auth, updateCartQuantity);

export default router;