import express from "express";
import cors from "cors";

import complaintRoutes from "./routes/complaintRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import wardenRoutes from "./routes/wardenRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import otpRoutes from "./routes/otpRoutes.js"; 

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true 
}));



app.use("/", complaintRoutes);
app.use("/", studentRoutes);
app.use("/", wardenRoutes);
app.use("/", userRoutes);
app.use("/", otpRoutes); 

app.listen(3000, () => {
  console.log("Application is running on port 3000");
});
