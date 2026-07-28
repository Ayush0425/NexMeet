import crypto from "crypto";

import razorpay from "../utils/razorpay";
import { createPayment } from "../repositories/payment.repository";
import { getBookingById } from "../repositories/booking.repository";
import { AppError } from "../utils/AppError";
import { VerifyPaymentInput } from "../validators/payment.validator";

export const createOrderService = async (
  bookingId: string,
  userId: string
) => {
  // Find booking
  const booking = await getBookingById(bookingId);

  if (!booking) {
    throw new AppError("Booking not found", 404);
  }

  // Check ownership
  if (booking.user.toString() !== userId) {
    throw new AppError(
      "You are not authorized to pay for this booking",
      403
    );
  }

  // Get amount from booking
  const amount = booking.totalPrice;

  // Create Razorpay Order
  const order = await razorpay.orders.create({
    amount: amount * 100, // Razorpay expects paise
    currency: "INR",
    receipt: `booking_${bookingId}`,
  });

  // Save payment
  const payment = await createPayment({
    booking: bookingId,
    user: userId,
    razorpayOrderId: order.id,
    amount,
  });

  return {
    order,
    payment,
  };
};

// =========================
// Verify Payment
// =========================

export const verifyPaymentService = async (
  data: VerifyPaymentInput
) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = data;

  const generatedSignature = crypto
    .createHmac(
      "sha256",
      process.env.RAZORPAY_KEY_SECRET!
    )
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generatedSignature !== razorpay_signature) {
    throw new AppError("Invalid payment signature", 400);
  }

  // We will update Payment, Booking and Event
  // in the next step.

  return {
    success: true,
    message: "Payment verified successfully",
  };
};