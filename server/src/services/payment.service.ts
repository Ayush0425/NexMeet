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
      const existingOrder =
        await razorpay.orders.fetch(
          existingPayment.razorpayOrderId
        );

      // Make sure the existing order
      // belongs to the expected amount.
      if (
        existingOrder.amount !==
        booking.totalPrice * 100
      ) {
        throw new AppError(
          "Payment order amount mismatch",
          400
        );
      }

      return {
        order: existingOrder,
        payment: existingPayment,
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      console.error(
        "Existing Razorpay order could not be fetched:",
        error
      );
    }
  }

  // IMPORTANT:
  // Amount comes from our database,
  // never from the client.
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

  // Save payment record
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

  // =========================
  // Find Payment Record
  // =========================
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
  // Find Booking
  // =========================
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
  // Check Ownership FIRST
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
  // Prevent Duplicate Verification
  // =========================
  if (payment.status === "paid") {
    return {
      success: true,
      message: "Payment already verified",
      payment,
    };
  }

  // =========================
  // Prevent Cancelled Booking
  // =========================
  if (
    booking.bookingStatus === "cancelled"
  ) {
    throw new AppError(
      "Cannot verify payment for a cancelled booking",
      400
    );
  }

  // =========================
  // Verify Razorpay Signature
  // =========================
  const generatedSignature =
    crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET as string
      )
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest("hex");

  const generatedBuffer =
    Buffer.from(generatedSignature, "utf8");

  const receivedBuffer =
    Buffer.from(
      razorpay_signature,
      "utf8"
    );

  const signatureValid =
    generatedBuffer.length ===
      receivedBuffer.length &&
    crypto.timingSafeEqual(
      generatedBuffer,
      receivedBuffer
    );

  if (!signatureValid) {
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
  // Fetch Payment From Razorpay
  // =========================
  const razorpayPayment =
    await razorpay.payments.fetch(
      razorpay_payment_id
    );

  // =========================
  // Verify Order Relationship
  // =========================
  if (
    razorpayPayment.order_id !==
    razorpay_order_id
  ) {
    throw new AppError(
      "Payment does not belong to this order",
      400
    );
  }

  // =========================
  // Verify Amount
  // =========================
  if (
    razorpayPayment.amount !==
    payment.amount * 100
  ) {
    throw new AppError(
      "Payment amount mismatch",
      400
    );
  }

  // =========================
  // Verify Currency
  // =========================
  if (
    razorpayPayment.currency !==
    "INR"
  ) {
    throw new AppError(
      "Invalid payment currency",
      400
    );
  }

  // =========================
  // Verify Payment Status
  // =========================
  if (
    razorpayPayment.status !==
    "captured"
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
      "Payment has not been captured",
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

  if (!updatedPayment) {
    throw new AppError(
      "Unable to update payment",
      500
    );
  }

  // =========================
  // Update Booking → CONFIRMED
  // =========================
  const updatedBooking =
    await updateBookingPaymentStatus(
      booking._id.toString(),
      "paid"
    );

  if (!updatedBooking) {
    throw new AppError(
      "Unable to confirm booking",
      500
    );
  }

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