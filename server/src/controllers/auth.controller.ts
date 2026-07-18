import { Request, Response } from "express";
import { ZodError } from "zod";

import {
  registerSchema,
  loginSchema,
} from "../validators/auth.validator";

import {
  registerUserService,
  loginUserService,
} from "../services/auth.service";

// ==========================
// Register User
// ==========================
export const registerUser = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const validatedData = registerSchema.parse(req.body);

    const user = await registerUserService(validatedData);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.flatten().fieldErrors,
      });
    }

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Login User
// ==========================
export const loginUser = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const validatedData = loginSchema.parse(req.body);

    const user = await loginUserService(validatedData);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: user,
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.flatten().fieldErrors,
      });
    }

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};