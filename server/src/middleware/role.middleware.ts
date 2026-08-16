import { Response, NextFunction } from "express";

import { AuthRequest } from "../types/request.types";

export const authorize = (...roles: string[]) => {
  return (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userRole =
      req.user.role?.toLowerCase();

    const hasPermission = roles.some(
      (role) =>
        role.toLowerCase() === userRole
    );

    if (!hasPermission) {
      return res.status(403).json({
        success: false,
        message:
          "Forbidden: You don't have permission.",
      });
    }

    next();
  };
};