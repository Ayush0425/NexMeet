import { Router } from "express";

import { getMyTickets } from "../controllers/ticket.controller";

import { protect } from "../middleware/auth.middleware";

const router = Router();

// ==========================
// Get My Tickets
// ==========================
router.get(
  "/my",
  protect,
  getMyTickets
);

export default router;