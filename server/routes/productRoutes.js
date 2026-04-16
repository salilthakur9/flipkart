import express from 'express';
import { getAllProducts, getProductsByCategory, getProductById, searchProducts} from '../controllers/productController.js';

const router = express.Router();

// 🔥 IMPORTANT ORDER
router.get('/search', searchProducts);     // ✅ FIRST
router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProductById);
router.get('/', getAllProducts);
export default router;