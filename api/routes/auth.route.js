import express from "express";
import { register, login, logout } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/register", verifyToken, register);
router.post("/login", verifyToken, login);
router.post("/logout", verifyToken, logout);

export default router;
