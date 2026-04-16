import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// ✅ Fix __dirname for ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ✅ Load .env FIRST
dotenv.config({
  path: path.join(__dirname, '.env')
});

import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

// ✅ Routes
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js'; // 🔥 NEW

const app = express();

// =======================================================
// ✅ MIDDLEWARE
// =======================================================
app.use(express.json());

app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));

// =======================================================
// ✅ DEBUG ENV (OPTIONAL)
// =======================================================
console.log("ENV CHECK:");
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);

// =======================================================
// ✅ DATABASE CONNECTION
// =======================================================
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

app.set('db', db);

// =======================================================
// ✅ ROUTES
// =======================================================
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes); // 🔥 IMPORTANT

// =======================================================
// ✅ ROOT
// =======================================================
app.get('/', (req, res) => {
  res.send("Backend running 🚀");
});

// =======================================================
// ✅ SERVER
// =======================================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});