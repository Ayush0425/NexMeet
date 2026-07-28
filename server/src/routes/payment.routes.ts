import { Router } from "express";
import {
  createOrder,
  verifyPayment,
} from "../controllers/payment.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

// Create Razorpay Order
router.post(
  "/create-order",
  protect,
  createOrder
);

// Verify Razorpay Payment
router.post(
  "/verify",
  protect,
  verifyPayment
);

export default router;