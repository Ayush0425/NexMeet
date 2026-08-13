import { Router } from "express";

import {
  getMyTickets,
  checkInTicket,
} from "../controllers/ticket.controller";

import { protect } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

// ==========================
// User Routes
// ==========================

// Get My Tickets
router.get(
  "/my",
  protect,
  getMyTickets
);

// ==========================
// Organizer Routes
// ==========================

// Check In Ticket
router.post(
  "/check-in",
  protect,
  authorize("organizer"),
  checkInTicket
);

export default router;