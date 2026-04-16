import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// ✅ __dirname fix
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ✅ Load env
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
import orderRoutes from './routes/orderRoutes.js';

const app = express();

// =======================================================
// ✅ MIDDLEWARE
// =======================================================
app.use(express.json());

app.use(cors({
  origin: "*",
  credentials: true
}));

// =======================================================
// ✅ DATABASE CONNECTION (FINAL FIX)
// =======================================================
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  ssl: {
    rejectUnauthorized: false
  }
});

// 🔥 TEST DB CONNECTION ON START
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ DB CONNECTION FAILED:", err);
  } else {
    console.log("✅ DB CONNECTED SUCCESSFULLY");
    connection.release();
  }
});

app.set('db', db);

// =======================================================
// ✅ ROUTES
// =======================================================
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// =======================================================
// ✅ ROOT
// =======================================================
app.get('/', (req, res) => {
  res.send("Backend running 🚀");
});

// =======================================================
// ✅ HEALTH CHECK
// =======================================================
app.get('/api/health', (req, res) => {
  res.json({ status: "OK" });
});

// =======================================================
// ✅ SERVER
// =======================================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});