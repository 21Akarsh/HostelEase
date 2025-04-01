import express from "express";
import { sendOtp, verifyOtp, resetPassword } from "../controller/otpController.js"; // Import controller functions

const router = express.Router();

// Routes mapping to controller functions
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

export default router;
