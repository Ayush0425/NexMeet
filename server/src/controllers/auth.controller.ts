import { Request, Response } from "express";
import { registerUserService } from "../services/auth.service";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await registerUserService(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
};