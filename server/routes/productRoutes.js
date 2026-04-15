import express from 'express';
import { getAllProducts, getProductsByCategory, getProductById } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/item/:id', getProductById);

export default router;