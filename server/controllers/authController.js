import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

// 1. Initialize Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    const db = req.app.get('db');

    try {
        const [existing] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);
        if (existing.length > 0) return res.status(400).json({ error: "Email already exists" });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save User (is_verified = 0 because they need to check email)
        await db.promise().query(
            "INSERT INTO users (name, email, password, otp, is_verified) VALUES (?, ?, ?, ?, 0)",
            [name, email, hashedPassword, otp]
        );

        // 2. SEND THE REAL EMAIL
        const mailOptions = {
            from: `"Flipkart Clone" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Verify your Flipkart Account',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0;">
                    <h2 style="color: #2874f0;">Flipkart Clone Verification</h2>
                    <p>Thank you for registering. Use the OTP below to verify your account:</p>
                    <h1 style="background: #f1f2f4; padding: 10px; display: inline-block; letter-spacing: 5px;">${otp}</h1>
                    <p>This OTP is valid for 10 minutes.</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent to ${email}`);
        
        res.status(200).json({ message: "OTP sent to your email. Please verify." });

    } catch (err) {
        console.error("❌ Email Error:", err.message);
        // If email fails, we still let them know why
        res.status(500).json({ error: "Failed to send email. Check server credentials." });
    }
};

export const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    const db = req.app.get('db');

    try {
        const [rows] = await db.promise().query("SELECT * FROM users WHERE email = ? AND otp = ?", [email, String(otp)]);

        if (rows.length === 0) return res.status(400).json({ error: "Invalid OTP" });

        // 1. Mark as verified
        await db.promise().query("UPDATE users SET is_verified = 1, otp = NULL WHERE email = ?", [email]);

        // 2. Automatically generate token so they are logged in immediately
        const user = rows[0];
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({ 
            message: "Login successful", 
            token, 
            user: { id: user.id, name: user.name, email: user.email } 
        });
    } catch (err) {
        res.status(500).json({ error: "Verification failed" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    const db = req.app.get('db');
    try {
        const [rows] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);
        if (rows.length === 0) return res.status(404).json({ error: "User not found" });

        const user = rows[0];
        if (!user.is_verified) return res.status(401).json({ error: "Verify email first" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Wrong credentials" });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        const { password: _, otp: __, ...userData } = user;
        res.status(200).json({ token, user: userData });
    } catch (err) {
        res.status(500).json({ error: "Login failed" });
    }
};