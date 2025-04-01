import express from "express";
import cors from "cors";

import complaintRoutes from "./routes/complaintRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import wardenRoutes from "./routes/wardenRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import otpRoutes from "./routes/otpRoutes.js"; // Import OTP routes

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173', // Allow only your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true // Allow cookies and authorization headers
}));



app.use("/", complaintRoutes);
app.use("/", studentRoutes);
app.use("/", wardenRoutes);
app.use("/", userRoutes);
app.use("/", otpRoutes); // Use OTP routes

app.listen(3000, () => {
  console.log("Application is running on port 3000");
});
