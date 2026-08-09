import api from "../../lib/axios";

// ==========================
// Create Razorpay Order
// ==========================
export const createPaymentOrder = async (
  bookingId: string
) => {
  const response = await api.post(
    "/payments/create-order",
    {
      bookingId,
    }
  );

  return response.data;
};

// ==========================
// Verify Razorpay Payment
// ==========================
export const verifyPayment = async (
 paymentData: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }
) => {
  const response = await api.post(
    "/payments/verify",
    paymentData
  );

  return response.data;
};