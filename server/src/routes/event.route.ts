import { Router } from "express";

import {
  createEvent,
  fetchAllEvents,
} from "../controllers/event.controller";

import { protect } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

// Public
router.get("/", fetchAllEvents);

// Organizer Only
router.post(
  "/",
  protect,
  authorize("organizer"),
  createEvent
);

export default router;