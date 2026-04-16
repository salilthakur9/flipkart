import express from 'express';
import { getAllProducts, getProductsByCategory, getProductById } from '../controllers/productController.js';

const router = express.Router();

// 🔥 IMPORTANT ORDER
router.get('/', getAllProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProductById); // ✅ clean route

export default router;