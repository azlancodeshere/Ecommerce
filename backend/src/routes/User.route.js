import { Router } from "express";

import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    updateAccount,
    getCurrentUser
} from "../controllers/user.controller.js";

import { authMiddleware } from "../middleware/Auth.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", authMiddleware, logoutUser);

router.get("/current-user", authMiddleware, getCurrentUser);

router.post("/refresh-token", refreshAccessToken);

router.patch("/update-account", authMiddleware, updateAccount);

export default router;