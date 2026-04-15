import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    const db = req.app.get('db');

    // 1. Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    try {
        // 2. Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Save User (Using promise() for cleaner async/await)
        const q = "INSERT INTO users (name, email, password, otp) VALUES (?, ?, ?, ?)";
        await db.promise().query(q, [name, email, hashedPassword, otp]);

        // 4. Setup Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Verify your Flipkart Account',
            text: `Your OTP for registration is: ${otp}`
        };

        // 5. Send the email
        await transporter.sendMail(mailOptions);
        
        res.status(200).json({ message: "User registered! Please check your email for OTP." });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Registration failed. Email might already exist." });
    }
};

export const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    const db = req.app.get('db');

    try {
        const q = "SELECT * FROM users WHERE email = ? AND otp = ?";
const [rows] = await db.promise().query(q, [email, String(otp)]); // Force OTP to string

        if (rows.length === 0) {
            return res.status(400).json({ error: "Invalid OTP" });
        }

        // OTP matches! Update user to verified and clear the OTP
        const updateQ = "UPDATE users SET is_verified = 1, otp = NULL WHERE email = ?";
        await db.promise().query(updateQ, [email]);

        res.status(200).json({ message: "Email verified successfully! You can now login." });
    } catch (err) {
        res.status(500).json({ error: "Verification failed" });
    }
};

// 2. Login Logic
export const login = async (req, res) => {
    const { email, password } = req.body;
    const db = req.app.get('db');

    try {
        const q = "SELECT * FROM users WHERE email = ?";
        const [rows] = await db.promise().query(q, [email]);

        if (rows.length === 0) return res.status(404).json({ error: "User not found" });

        const user = rows[0];

        // Check if verified
        if (!user.is_verified) return res.status(401).json({ error: "Please verify your email first" });

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Wrong credentials" });

        // Generate JWT Token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Don't send the password back to the frontend
        const { password: _, otp: __, ...userData } = user;
        
        res.status(200).json({ message: "Login successful", token, user: userData });
    } catch (err) {
        res.status(500).json({ error: "Login failed" });
    }
};