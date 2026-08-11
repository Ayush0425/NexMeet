import PaymentModel from "../models/payment.model";

interface CreatePaymentData {
  booking: string;
  user: string;
  razorpayOrderId: string;
  amount: number;
}

// ==========================
// Create Payment
// ==========================
export const createPayment = async (
  paymentData: CreatePaymentData
) => {
  return await PaymentModel.create(
    paymentData
  );
};

// ==========================
// Get Payment By Order ID
// ==========================
export const getPaymentByOrderId = async (
  razorpayOrderId: string
) => {
  return await PaymentModel.findOne({
    razorpayOrderId,
  });
};

// ==========================
// Get Active Payment By Booking
// ==========================
export const getActivePaymentByBooking =
  async (bookingId: string) => {
    return await PaymentModel.findOne({
      booking: bookingId,
      status: "created",
    });
  };

// ==========================
// Update Payment
// ==========================
export const updatePayment = async (
  paymentId: string,
  updateData: {
    razorpayPaymentId?: string;
    razorpaySignature?: string;
    status?:
      | "created"
      | "paid"
      | "failed"
      | "refunded";
  }
) => {
  return await PaymentModel.findByIdAndUpdate(
    paymentId,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );
};