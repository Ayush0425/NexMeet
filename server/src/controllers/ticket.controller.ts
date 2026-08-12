import { Response } from "express";

import { AuthRequest } from "../types/request.types";

import {
  getMyTicketsService,
} from "../services/ticket.service";

// ==========================
// Get My Tickets
// ==========================
export const getMyTickets = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const tickets =
      await getMyTicketsService(
        req.user!._id.toString()
      );

    return res.status(200).json({
      success: true,
      count: tickets.length,
      data: tickets,
    });
  } catch (error: any) {
    return res.status(
      error.statusCode || 500
    ).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch tickets",
    });
  }
};