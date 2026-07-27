import { Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { createBookingSchema } from "../validators/booking.validator";
import {
  createBookingService,
  getMyBookingsService,
  cancelBookingService,
} from "../services/booking.service";
import { AuthRequest } from "../types/request.types";

// ==========================
// Book Event
// ==========================
export const bookEvent = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const bookingData = createBookingSchema.parse(req.body);

    const booking = await createBookingService(
      bookingData,
      req.user!._id.toString()
    );

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  }
);

// ==========================
// Get My Bookings
// ==========================
export const getMyBookings = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const bookings = await getMyBookingsService(
      req.user!._id.toString()
    );

    res.status(200).json({
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
const booking = await cancelBookingService(
  String(req.params.bookingId),
  req.user!._id.toString()
);

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: booking,
    });
  }
);