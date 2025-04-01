import express from "express";
import { userRegister, userLogin } from "../controller/userController.js";

const userRoutes = express.Router();

userRoutes.post("/register", userRegister);
userRoutes.post("/login", userLogin);

export default userRoutes;
