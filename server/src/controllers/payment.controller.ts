import { Response } from "express";
import { ZodError } from "zod";

import { AuthRequest } from "../types/request.types";
import {
  createOrderService,
  verifyPaymentService,
} from "../services/payment.service";

import { verifyPaymentSchema } from "../validators/payment.validator";

export const createOrder = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { bookingId } = req.body;

    const result = await createOrderService(
      bookingId,
      req.user!._id.toString()
    );

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: result,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyPayment = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const validatedData = verifyPaymentSchema.parse(req.body);

    const result = await verifyPaymentService(validatedData);

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      data: result,
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.flatten().fieldErrors,
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};