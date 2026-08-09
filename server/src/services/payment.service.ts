import crypto from "crypto";

import razorpay from "../utils/razorpay";

import {
  createPayment,
  getPaymentByOrderId,
  updatePayment,
} from "../repositories/payment.repository";

import {
  getBookingById,
  updateBookingPaymentStatus,
} from "../repositories/booking.repository";

import { AppError } from "../utils/AppError";

import { VerifyPaymentInput } from "../validators/payment.validator";

// =========================
// Create Razorpay Order
// =========================
export const createOrderService = async (
  bookingId: string,
  userId: string
) => {
  // Find booking
  const booking = await getBookingById(
    bookingId
  );

  if (!booking) {
    throw new AppError(
      "Booking not found",
      404
    );
  }

  // Check ownership
  if (
    booking.user.toString() !== userId
  ) {
    throw new AppError(
      "You are not authorized to pay for this booking",
      403
    );
  }

  // Prevent payment for cancelled booking
  if (
    booking.bookingStatus === "cancelled"
  ) {
    throw new AppError(
      "Cannot pay for a cancelled booking",
      400
    );
  }

  // Prevent duplicate payment
  if (
    booking.paymentStatus === "paid"
  ) {
    throw new AppError(
      "Booking is already paid",
      400
    );
  }

  // Get amount from booking
  const amount = booking.totalPrice;

  // Create Razorpay Order
  const order = await razorpay.orders.create({
    amount: amount * 100,
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

  // Find payment record
  const payment =
    await getPaymentByOrderId(
      razorpay_order_id
    );

  if (!payment) {
    throw new AppError(
      "Payment record not found",
      404
    );
  }

  // Find booking
  const booking = await getBookingById(
    payment.booking.toString()
  );

  if (!booking) {
    throw new AppError(
      "Booking not found",
      404
    );
  }

  // Make sure payment belongs to booking user
  if (
    payment.user.toString() !==
    booking.user.toString()
  ) {
    throw new AppError(
      "Invalid payment ownership",
      403
    );
  }

  // Generate Razorpay signature
  const generatedSignature =
    crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET!
      )
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest("hex");

  // Verify signature
  if (
    generatedSignature !==
    razorpay_signature
  ) {
    await updatePayment(
      payment._id.toString(),
      {
        razorpayPaymentId:
          razorpay_payment_id,
        razorpaySignature:
          razorpay_signature,
        status: "failed",
      }
    );

    await updateBookingPaymentStatus(
      booking._id.toString(),
      "failed"
    );

    throw new AppError(
      "Invalid payment signature",
      400
    );
  }

  // Update Payment → PAID
  const updatedPayment =
    await updatePayment(
      payment._id.toString(),
      {
        razorpayPaymentId:
          razorpay_payment_id,
        razorpaySignature:
          razorpay_signature,
        status: "paid",
      }
    );

  // Update Booking → CONFIRMED
  const updatedBooking =
    await updateBookingPaymentStatus(
      booking._id.toString(),
      "paid"
    );

  return {
    success: true,
    message:
      "Payment verified successfully",
    payment: updatedPayment,
    booking: updatedBooking,
  };
};