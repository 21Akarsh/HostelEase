import bcrypt from "bcrypt";
import redis from "redis";
import { pool } from "../db.js"; 
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import client from "../redisClient.js";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

/**
 * Send OTP (Uses PostgreSQL to Check User and Redis for OTP)
 */
export const sendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if user exists in PostgreSQL
    const { rowCount } = await pool.query("SELECT user_id FROM users WHERE email = $1", [email]);

    if (rowCount === 0) {
      return res.status(404).json({ message: "User not found!" });
    }

    
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    
    await client.setEx(email, 300, otp);

  
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}`,
    });

    res.json({ message: "OTP sent successfully!" });
  } catch (err) {
    console.error("Error sending OTP:", err);
    res.status(500).json({ message: "Failed to send OTP." });
  }
};


// *  Verify OTP (Checks from Redis)

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Retrieve OTP from Redis
    const storedOtp = await client.get(email);

    if (storedOtp === otp) {
      await client.del(email); // Delete OTP after verification
      res.json({ message: "OTP verified successfully!" });
    } else {
      res.status(400).json({ message: "Invalid or expired OTP!" });
    }
  } catch (err) {
    console.error("Error verifying OTP:", err);
    res.status(500).json({ message: "OTP verification failed." });
  }
};


// 3. Reset Password (Uses PostgreSQL to Update Password)

export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Check if user exists in PostgreSQL
    const { rowCount } = await pool.query("SELECT user_id FROM users WHERE email = $1", [email]);

    if (rowCount === 0) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password in PostgreSQL
    await pool.query("UPDATE users SET password = $1 WHERE email = $2", [hashedPassword, email]);

    res.json({ message: "Password reset successful!" });
  } catch (err) {
    console.error("Error resetting password:", err);
    res.status(500).json({ message: "Error updating password." });
  }
};
