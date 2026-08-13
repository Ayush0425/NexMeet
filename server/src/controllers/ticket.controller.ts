import { Response } from "express";

import { AuthRequest } from "../types/request.types";

import {
  getMyTicketsService,
  checkInTicketService,
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

// ==========================
// Check In Ticket
// Organizer
// ==========================
export const checkInTicket = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { ticketCode } = req.body;

    if (!ticketCode) {
      return res.status(400).json({
        success: false,
        message: "Ticket code is required",
      });
    }

    const ticket =
      await checkInTicketService(
        ticketCode,
        req.user!._id.toString()
      );

    return res.status(200).json({
      success: true,
      message:
        "Ticket checked in successfully",
      data: ticket,
    });
  } catch (error: any) {
    return res.status(
      error.statusCode || 500
    ).json({
      success: false,
      message:
        error.message ||
        "Failed to check in ticket",
    });
  }
};