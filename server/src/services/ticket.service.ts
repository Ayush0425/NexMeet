import crypto from "crypto";
import QRCode from "qrcode";

import {
  createTicket,
  getTicketsByBooking,
  getTicketsByUser,
  getTicketByCode,
  checkInTicket,
} from "../repositories/ticket.repository";

import { getBookingById } from "../repositories/booking.repository";

import { getEventById } from "../repositories/event.repository";

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

// ==========================
// Check In Ticket
// ==========================
export const checkInTicketService =
  async (
    ticketCode: string,
    organizerId: string
  ) => {
    // Find ticket
    const ticket =
      await getTicketByCode(
        ticketCode
      );

    if (!ticket) {
      throw new AppError(
        "Ticket not found",
        404
      );
    }

    // Prevent already used ticket
    if (ticket.status === "used") {
      throw new AppError(
        "Ticket has already been used",
        400
      );
    }

    // Prevent cancelled ticket
    if (
      ticket.status === "cancelled"
    ) {
      throw new AppError(
        "Ticket has been cancelled",
        400
      );
    }

    // Find event
    const event =
      await getEventById(
        ticket.event.toString()
      );

    if (!event) {
      throw new AppError(
        "Event not found",
        404
      );
    }

    // Get organizer ID safely
    const eventOrganizerId =
      (event.organizer as any)._id
        ?.toString() ??
      event.organizer.toString();

    // Only event organizer can check in tickets
    if (
      eventOrganizerId !== organizerId
    ) {
      throw new AppError(
        "You are not authorized to check in this ticket",
        403
      );
    }

    // Atomically check in ticket
    const checkedInTicket =
      await checkInTicket(
        ticket._id.toString()
      );

    // Another request may have checked it in
    if (!checkedInTicket) {
      throw new AppError(
        "Ticket has already been used",
        400
      );
    }

    return checkedInTicket;
  };