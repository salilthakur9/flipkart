import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

// ✅ Debug ENV inside controller
console.log("AUTH CONTROLLER ENV:");
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

// ✅ Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// 🔥 Helper to send OTP
const sendOTP = async (email, otp, subject) => {
  try {
    await transporter.sendMail({
      from: `"Flipkart Clone" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2>${subject}</h2>
          <p>Your OTP is:</p>
          <h1 style="letter-spacing:5px;">${otp}</h1>
        </div>
      `
    });
    console.log("✅ Email sent to:", email);
  } catch (err) {
    console.error("❌ EMAIL ERROR:", err);
    throw err;
  }
};

// ================= REGISTER =================
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const db = req.app.get('db');

  try {
    const [existing] = await db.promise().query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: "User already exists. Please login." });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.promise().query(
      "INSERT INTO users (name, email, password, otp, is_verified) VALUES (?, ?, ?, ?, 0)",
      [name, email, hashedPassword, otp]
    );

    await sendOTP(email, otp, "Register OTP");

    res.json({ message: "OTP sent for registration" });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ error: "Registration failed" });
  }
};

// ================= LOGIN =================
export const login = async (req, res) => {
  const { email, password } = req.body;
  const db = req.app.get('db');

  try {
    const [rows] = await db.promise().query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Wrong password" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await db.promise().query(
      "UPDATE users SET otp = ? WHERE email = ?",
      [otp, email]
    );

    await sendOTP(email, otp, "Login OTP");

    res.json({ message: "OTP sent for login" });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ error: "Login failed" });
  }
};

// ================= VERIFY =================
export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  const db = req.app.get('db');

  try {
    const [rows] = await db.promise().query(
      "SELECT * FROM users WHERE email = ? AND otp = ?",
      [email, otp]
    );

    if (rows.length === 0) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    const user = rows[0];

    await db.promise().query(
      "UPDATE users SET is_verified = 1, otp = NULL WHERE email = ?",
      [email]
    );

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.error("VERIFY ERROR:", err);
    res.status(500).json({ error: "Verification failed" });
  }
};