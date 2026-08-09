import BookingModel from "../models/booking.model";

// ==========================
// Create Booking
// ==========================
export const createBooking = async (bookingData: {
  user: string;
  event: string;
  quantity: number;
  totalPrice: number;
}) => {
  return await BookingModel.create(
    bookingData
  );
};

// ==========================
// Get Bookings By User
// ==========================
export const getBookingsByUser = async (
  userId: string
) => {
  return await BookingModel.find({
    user: userId,
  })
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
  return await BookingModel.findById(
    bookingId
  );
};

// ==========================
// Update Booking Payment Status
// ==========================
export const updateBookingPaymentStatus = async (
  bookingId: string,
  paymentStatus: "pending" | "paid" | "failed"
) => {
  const updateData: {
    paymentStatus: "pending" | "paid" | "failed";
    bookingStatus?: "pending" | "confirmed" | "cancelled";
  } = {
    paymentStatus,
  };

  if (paymentStatus === "paid") {
    updateData.bookingStatus = "confirmed";
  }

  return await BookingModel.findByIdAndUpdate(
    bookingId,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );
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