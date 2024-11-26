import express from "express";
import { login, forgotPassword, resetPassword } from "../controllers/auth.js";

const authRoutes = express.Router();

authRoutes.post("/login", login);
authRoutes.post("/forgot-password", forgotPassword);
authRoutes.post("/reset-password", resetPassword);

export default authRoutes;
