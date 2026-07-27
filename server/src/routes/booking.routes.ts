import { Router } from "express";
import {
  bookEvent,
  getMyBookings,
  cancelBooking,
} from "../controllers/booking.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

// Book Event
router.post("/", protect, bookEvent);

// Get My Bookings
router.get("/my", protect, getMyBookings);

// Cancel Booking
router.patch(
  "/:bookingId/cancel",
  protect,
  cancelBooking
);

export default router;