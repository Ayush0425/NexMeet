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
  updateAvailableSeats,
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
  const event = await getEventById(bookingData.eventId);

  if (!event) {
    throw new AppError("Event not found", 404);
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

  // Check Seat Availability
  if (event.availableSeats < bookingData.quantity) {
    throw new AppError(
      "Not enough seats available",
      400
    );
  }

  // Calculate Total Price
  const totalPrice =
    event.price * bookingData.quantity;

  // Update Available Seats
  const remainingSeats =
    event.availableSeats - bookingData.quantity;

  await updateAvailableSeats(
    event._id.toString(),
    remainingSeats
  );

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
// Get Bookings By Event (Organizer)
// ==========================
export const getBookingsByEventService = async (
  eventId: string,
  userId: string
) => {
  const event = await getEventById(eventId);

  if (!event) {
    throw new AppError("Event not found", 404);
  }

  // Only organizer can view bookings
  if (event.organizer._id.toString() !== userId) {
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
  const booking = await getBookingById(bookingId);

  if (!booking) {
    throw new AppError("Booking not found", 404);
  }

  // Check Ownership
  if (booking.user.toString() !== userId) {
    throw new AppError(
      "You are not authorized to cancel this booking",
      403
    );
  }

  // Already Cancelled
  if (booking.bookingStatus === "cancelled") {
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
  const updatedBooking = await cancelBooking(
    bookingId
  );

  return updatedBooking;
};