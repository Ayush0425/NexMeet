import { Request, Response } from "express";

import { asyncHandler } from "../middleware/asyncHandler";
import { AuthRequest } from "../types/request.types";

import {
  createBookingService,
  getMyBookingsService,
  getBookingsByEventService,
  cancelBookingService,
} from "../services/booking.service";

import { createBookingSchema } from "../validators/booking.validator";

// ==========================
// Create Booking
// ==========================
export const createBooking = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const validatedData =
      createBookingSchema.parse(req.body);

    const booking = await createBookingService(
      validatedData,
      req.user!._id.toString()
    );

    return res.status(201).json({
      success: true,
      message: "Event booked successfully",
      data: booking,
    });
  }
);

// ==========================
// Get My Bookings
// ==========================
export const getMyBookings = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const bookings =
      await getMyBookingsService(
        req.user!._id.toString()
      );

    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  }
);

// ==========================
// Get Event Bookings
// Organizer
// ==========================
export const getEventBookings = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const bookings =
      await getBookingsByEventService(
        String(req.params.eventId),
        req.user!._id.toString()
      );

    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  }
);

// ==========================
// Cancel Booking
// ==========================
export const cancelBooking = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const booking =
      await cancelBookingService(
        String(req.params.id),
        req.user!._id.toString()
      );

    return res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: booking,
    });
  }
);