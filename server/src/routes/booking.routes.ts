import { Router } from "express";

import {
  createBooking,
  getMyBookings,
  getEventBookings,
  cancelBooking,
} from "../controllers/booking.controller";

import { protect } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

// ==========================
// User Routes
// ==========================

// Book Event
router.post(
  "/",
  protect,
  createBooking
);

// Get My Bookings
router.get(
  "/my",
  protect,
  getMyBookings
);

// Cancel Booking
router.patch(
  "/:id/cancel",
  protect,
  cancelBooking
);

// ==========================
// Organizer Routes
// ==========================

// Get bookings for an event
router.get(
  "/event/:eventId",
  protect,
  authorize("organizer"),
  getEventBookings
);

export default router;