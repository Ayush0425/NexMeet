import BookingModel from "../models/booking.model";

export const createBooking = async (bookingData: {
  user: string;
  event: string;
  quantity: number;
  totalPrice: number;
}) => {
  return await BookingModel.create(bookingData);
};

export const getBookingsByUser = async (userId: string) => {
  return await BookingModel.find({ user: userId })
    .populate({
      path: "event",
      select:
        "title location startDateTime banner price category status",
    })
    .sort({ createdAt: -1 });
};

// ==========================
// Get Booking By ID
// ==========================
export const getBookingById = async (
  bookingId: string
) => {
  return await BookingModel.findById(bookingId);
};

// ==========================
// Cancel Booking
// ==========================
export const cancelBooking = async (
  bookingId: string
) => {
  return await BookingModel.findByIdAndUpdate(
    bookingId,
    {
      bookingStatus: "cancelled",
    },
    {
      new: true,
    }
  );
};

// ==========================
// Find Active Booking
// ==========================
export const findActiveBooking = async (
  userId: string,
  eventId: string
) => {
  return await BookingModel.findOne({
    user: userId,
    event: eventId,
    bookingStatus: "confirmed",
  });
};

// ==========================
// Get Bookings By Event
// ==========================
export const getBookingsByEvent = async (
  eventId: string
) => {
  return await BookingModel.find({
    event: eventId,
  })
    .populate("user", "fullName email")
    .sort({ createdAt: -1 });
};