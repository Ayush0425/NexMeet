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

// Create event
router.post(
  "/",
  protect,
  authorize("organizer"),
  createEvent
);

// Update event
router.put(
  "/:id",
  protect,
  authorize("organizer"),
  editEvent
);
router.delete(
  "/:id",
  protect,
  authorize("organizer"),
  removeEvent
);

export default router;