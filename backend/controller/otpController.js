import bcrypt from "bcrypt";
import { pool } from "../db.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import client from "../redisClient.js"; 

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});


// send otp(redis)
export const sendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const { rowCount } = await pool.query("SELECT user_id FROM users WHERE email = $1", [email]);

    if (rowCount === 0) {
      return res.status(404).json({ message: "User not found!" });
    }

    
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 5 mins expiration
    await client.setEx(email, 300, otp);

    // Send OTP via email
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

// verify otp
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {

    const storedOtp = await client.get(email);

    if (storedOtp === otp) {
      await client.del(email);
      res.json({ message: "OTP verified successfully! You can now reset your password." });
    } else {
      res.status(400).json({ message: "Invalid or expired OTP!" });
    }
  } catch (err) {
    console.error("Error verifying OTP:", err);
    res.status(500).json({ message: "OTP verification failed." });
  }
};


// reset password
export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const { rowCount } = await pool.query("SELECT user_id FROM users WHERE email = $1", [email]);

    if (rowCount === 0) {
      return res.status(404).json({ message: "User not found!" });
    }

   
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    
    await pool.query("UPDATE users SET password = $1 WHERE email = $2", [hashedPassword, email]);

    res.json({ message: "Password reset successful!" });
  } catch (err) {
    console.error("Error resetting password:", err);
    res.status(500).json({ message: "Error updating password." });
  }
};
