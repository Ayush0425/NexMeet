import { Router } from "express";

import authRoutes from "./auth.routes";
import eventRoutes from "./event.route";
import bookingRoutes from "./booking.routes";
import paymentRoutes from "./payment.routes";
import ticketRoutes from "./ticket.routes";

const router = Router();

router.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "NexMeet API is running 🚀",
    timestamp: new Date().toISOString(),
  });
});

router.use("/auth", authRoutes);
router.use("/events", eventRoutes);
router.use("/bookings", bookingRoutes);
router.use("/payments", paymentRoutes);
router.use("/tickets", ticketRoutes);

export default router;