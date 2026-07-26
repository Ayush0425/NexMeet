import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/AppError";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  // Custom App Errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Zod Validation Errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.flatten().fieldErrors,
    });
  }

  // Unknown Errors
  console.error(err);

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};