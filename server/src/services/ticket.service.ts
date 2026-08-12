import crypto from "crypto";
import QRCode from "qrcode";

import {
  createTicket,
  getTicketsByBooking,
  getTicketsByUser,
} from "../repositories/ticket.repository";

import { getBookingById } from "../repositories/booking.repository";

import { AppError } from "../utils/AppError";

// ==========================
// Generate Ticket Code
// ==========================
const generateTicketCode = () => {
  return `NXM-${crypto
    .randomUUID()
    .replace(/-/g, "")
    .slice(0, 12)
    .toUpperCase()}`;
};

// ==========================
// Generate Tickets
// ==========================
export const generateTicketsService =
  async (bookingId: string) => {
    // Find booking
    const booking =
      await getBookingById(bookingId);

    if (!booking) {
      throw new AppError(
        "Booking not found",
        404
      );
    }

    // Only paid bookings can generate tickets
    if (
      booking.paymentStatus !== "paid" ||
      booking.bookingStatus !== "confirmed"
    ) {
      throw new AppError(
        "Tickets can only be generated for confirmed bookings",
        400
      );
    }

    // Prevent duplicate ticket generation
    const existingTickets =
      await getTicketsByBooking(
        bookingId
      );

    if (existingTickets.length > 0) {
      return existingTickets;
    }

    const tickets = [];

    // Generate one ticket per quantity
    for (
      let i = 0;
      i < booking.quantity;
      i++
    ) {
      const ticketCode =
        generateTicketCode();

      // Generate real QR code
      const qrCode =
        await QRCode.toDataURL(
          ticketCode
        );

      const ticket = await createTicket({
        booking:
          booking._id.toString(),

        user:
          booking.user.toString(),

        event:
          booking.event.toString(),

        ticketCode,

        qrCode,
      });

      tickets.push(ticket);
    }

    return tickets;
  };

// ==========================
// Get My Tickets
// ==========================
export const getMyTicketsService =
  async (userId: string) => {
    return await getTicketsByUser(
      userId
    );
  };