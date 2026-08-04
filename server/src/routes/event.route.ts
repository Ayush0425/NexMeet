import { Router } from "express";

import {
  createEvent,
  fetchAllEvents,
  fetchEventById,
  editEvent,
  removeEvent,
} from "../controllers/event.controller";

import { protect } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import upload from "../middleware/upload.middleware";

const router = Router();

// ==========================
// Public Routes
// ==========================

// Get all events
router.get("/", fetchAllEvents);

// Get single event by ID
router.get("/:id", fetchEventById);

// ==========================
// Organizer Routes
// ==========================

// Create Event
router.post(
  "/",
  protect,
  authorize("organizer"),
  upload.single("image"),
  createEvent
);

// Update Event
router.put(
  "/:id",
  protect,
  authorize("organizer"),
  upload.single("image"),
  editEvent
);

// Delete Event
router.delete(
  "/:id",
  protect,
  authorize("organizer"),
  removeEvent
);

export default router;