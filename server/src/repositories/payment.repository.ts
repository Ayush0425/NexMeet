import PaymentModel from "../models/payment.model";

interface CreatePaymentData {
  booking: string;
  user: string;
  razorpayOrderId: string;
  amount: number;
}

export const createPayment = async (
  paymentData: CreatePaymentData
) => {
  return await PaymentModel.create(paymentData);
};