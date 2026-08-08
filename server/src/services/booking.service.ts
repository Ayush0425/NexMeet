import { AppError } from "../utils/AppError";

import {
  createBooking,
  getBookingsByUser,
  getBookingById,
  cancelBooking,
  findActiveBooking,
  getBookingsByEvent,
} from "../repositories/booking.repository";

import {
  getEventById,
  decreaseAvailableSeats,
  increaseAvailableSeats,
} from "../repositories/event.repository";

import { CreateBookingInput } from "../validators/booking.validator";

// ==========================
// Create Booking
// ==========================
export const createBookingService = async (
  bookingData: CreateBookingInput,
  userId: string
) => {
  // Find Event
  const event = await getEventById(
    bookingData.eventId
  );

  if (!event) {
    throw new AppError("Event not found", 404);
  }

  // Prevent booking cancelled/completed events
  if (
    event.status === "cancelled" ||
    event.status === "completed"
  ) {
    throw new AppError(
      "This event is not available for booking",
      400
    );
  }

  // Prevent Duplicate Booking
  const existingBooking = await findActiveBooking(
    userId,
    bookingData.eventId
  );

  if (existingBooking) {
    throw new AppError(
      "You have already booked this event",
      400
    );
  }

  // Calculate Total Price
  const totalPrice =
    event.price * bookingData.quantity;

  // Atomically decrease available seats
  const updatedEvent =
    await decreaseAvailableSeats(
      bookingData.eventId,
      bookingData.quantity
    );

  // If null, there weren't enough seats
  if (!updatedEvent) {
    throw new AppError(
      "Not enough seats available",
      400
    );
  }

  // Create Booking
  const booking = await createBooking({
    user: userId,
    event: bookingData.eventId,
    quantity: bookingData.quantity,
    totalPrice,
  });

  return booking;
};

// ==========================
// Get My Bookings
// ==========================
export const getMyBookingsService = async (
  userId: string
) => {
  return await getBookingsByUser(userId);
};

// ==========================
// Get Bookings By Event
// Organizer
// ==========================
export const getBookingsByEventService = async (
  eventId: string,
  userId: string
) => {
  const event = await getEventById(eventId);

  if (!event) {
    throw new AppError(
      "Event not found",
      404
    );
  }

  // Get organizer ID safely
  const organizerId =
    (event.organizer as any)._id?.toString() ??
    event.organizer.toString();

  // Only organizer can view bookings
  if (organizerId !== userId) {
    throw new AppError(
      "You are not authorized to view these bookings",
      403
    );
  }

  return await getBookingsByEvent(eventId);
};

// ==========================
// Cancel Booking
// ==========================
export const cancelBookingService = async (
  bookingId: string,
  userId: string
) => {
  // Find Booking
  const booking = await getBookingById(
    bookingId
  );

  if (!booking) {
    throw new AppError(
      "Booking not found",
      404
    );
  }

  // Check Ownership
  if (
    booking.user.toString() !== userId
  ) {
    throw new AppError(
      "You are not authorized to cancel this booking",
      403
    );
  }

  // Already Cancelled
  if (
    booking.bookingStatus === "cancelled"
  ) {
    throw new AppError(
      "Booking is already cancelled",
      400
    );
  }

  // Restore Seats
  await increaseAvailableSeats(
    booking.event.toString(),
    booking.quantity
  );

  // Cancel Booking
  const updatedBooking =
    await cancelBooking(bookingId);

  return updatedBooking;
};