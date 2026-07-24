import { Router } from "express";

import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "../controllers/auth.controller";

import { protect } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Routes
router.get("/me", protect, getCurrentUser);

// Organizer Only Route (Temporary for Testing)
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