import express from "express";
import {
    createOrUpdateUser,
    getCurrentUser,
} from "../controllers/user.controller";
import { authCheck } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/user", authCheck, createOrUpdateUser);
router.get("/current-user", authCheck, getCurrentUser);

export default router;
