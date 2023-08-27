import express from "express";
import { successController } from "../controllers/success.controller.js";

const router = express.Router();

router.get("/", successController);

export default router;
