import { Router } from "express";

import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "../controllers/auth.controller";

import { protect } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import { authRateLimiter } from "../middleware/rate-limit.middleware";

const router = Router();

// ==========================
// Public Routes
// ==========================

router.post(
  "/register",
  authRateLimiter,
  registerUser
);

router.post(
  "/login",
  authRateLimiter,
  loginUser
);

// ==========================
// Protected Routes
// ==========================

router.get(
  "/me",
  protect,
  getCurrentUser
);

// ==========================
// Organizer Only Route
// ==========================

router.get(
  "/organizer",
  protect,
  authorize("organizer"),
  (req, res) => {
    return res.status(200).json({
      success: true,
      message: "Welcome Organizer!",
    });
  }
);

export default router;