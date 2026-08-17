import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import mongoose from "mongoose";

import { AppError } from "../utils/AppError";

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // ==========================
  // Development Logging
  // ==========================
  if (process.env.NODE_ENV === "development") {
    console.error("ERROR:", err);
  }

  // ==========================
  // Custom App Errors
  // ==========================
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // ==========================
  // Zod Validation Errors
  // ==========================
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.flatten().fieldErrors,
    });
  }

  // ==========================
  // MongoDB Duplicate Key
  // ==========================
  if (err?.code === 11000) {
    const field = Object.keys(
      err.keyPattern || {}
    )[0];

    return res.status(409).json({
      success: false,
      message: field
        ? `${field} already exists`
        : "Duplicate value already exists",
    });
  }

  // ==========================
  // Invalid MongoDB ObjectId
  // ==========================
  if (
    err instanceof mongoose.Error.CastError
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid resource ID",
    });
  }

  // ==========================
  // Mongoose Validation Error
  // ==========================
  if (
    err instanceof mongoose.Error.ValidationError
  ) {
    const errors: Record<string, string> = {};

    Object.values(err.errors).forEach(
      (error) => {
        errors[error.path] = error.message;
      }
    );

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  // ==========================
  // Unknown Error
  // ==========================
  return res.status(500).json({
    success: false,
    message:
      process.env.NODE_ENV === "development" &&
      err instanceof Error
        ? err.message
        : "Internal Server Error",

    ...(process.env.NODE_ENV === "development" &&
    err instanceof Error
      ? { stack: err.stack }
      : {}),
  });
};