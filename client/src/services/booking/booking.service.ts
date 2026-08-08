import api from "../../lib/axios";

// ==========================
// Create Booking
// ==========================
export const createBooking = async (
  eventId: string,
  quantity: number
) => {
  const response = await api.post(
    "/bookings",
    {
      eventId,
      quantity,
    }
  );

  return response.data;
};

// ==========================
// Get My Bookings
// ==========================
export const getMyBookings = async () => {
  const response = await api.get(
    "/bookings/my"
  );

  return response.data;
};

// ==========================
// Cancel Booking
// ==========================
export const cancelBooking = async (
  bookingId: string
) => {
  const response = await api.patch(
    `/bookings/${bookingId}/cancel`
  );

  return response.data;
};