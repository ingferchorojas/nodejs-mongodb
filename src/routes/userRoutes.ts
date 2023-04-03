import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getUser } from "../controllers/usersController";

const router = express.Router();

router.get("/", authMiddleware, getUser);

export default router;