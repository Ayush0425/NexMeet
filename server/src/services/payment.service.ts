import crypto from "crypto";

import razorpay from "../utils/razorpay";

import {
  createPayment,
  getPaymentByOrderId,
  getActivePaymentByBooking,
  updatePayment,
} from "../repositories/payment.repository";

import {
  getBookingById,
  updateBookingPaymentStatus,
} from "../repositories/booking.repository";

import { generateTicketsService } from "./ticket.service";

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
  const booking =
    await getBookingById(bookingId);

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

  // =========================
  // Check Existing Payment
  // =========================
  const existingPayment =
    await getActivePaymentByBooking(
      bookingId
    );

  if (existingPayment) {
    try {
      // Fetch existing Razorpay order
      const existingOrder =
        await razorpay.orders.fetch(
          existingPayment.razorpayOrderId
        );

      return {
        order: existingOrder,
        payment: existingPayment,
      };
    } catch (error) {
      // If Razorpay order no longer exists,
      // create a new one below.
      console.error(
        "Existing Razorpay order could not be fetched:",
        error
      );
    }
  }

  // Get amount from booking
  const amount = booking.totalPrice;

  // =========================
  // Create Razorpay Order
  // =========================
  const order =
    await razorpay.orders.create({
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
  data: VerifyPaymentInput,
  userId: string
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

  // =========================
  // Prevent Duplicate Verification
  // =========================
  if (payment.status === "paid") {
    return {
      success: true,
      message: "Payment already verified",
      payment,
    };
  }

  // Find booking
  const booking =
    await getBookingById(
      payment.booking.toString()
    );

  if (!booking) {
    throw new AppError(
      "Booking not found",
      404
    );
  }

  // =========================
  // Check Payment Ownership
  // =========================
  if (
    payment.user.toString() !== userId ||
    booking.user.toString() !== userId
  ) {
    throw new AppError(
      "You are not authorized to verify this payment",
      403
    );
  }

  // =========================
  // Generate Razorpay Signature
  // =========================
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

  // =========================
  // Verify Signature
  // =========================
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

  // =========================
  // Update Payment → PAID
  // =========================
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

  // =========================
  // Update Booking → CONFIRMED
  // =========================
  const updatedBooking =
    await updateBookingPaymentStatus(
      booking._id.toString(),
      "paid"
    );

  // =========================
  // Generate Tickets
  // =========================
  const tickets =
    await generateTicketsService(
      booking._id.toString()
    );

  return {
    success: true,
    message:
      "Payment verified successfully",
    payment: updatedPayment,
    booking: updatedBooking,
    tickets,
  };
};