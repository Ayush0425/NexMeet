import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getBookingsByEvent } from "../../../services/booking/booking.service";

function EventBookings() {
  const { eventId } = useParams();

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["event-bookings", eventId],
    queryFn: () =>
      getBookingsByEvent(eventId!),
    enabled: !!eventId,
  });

  if (isLoading) {
    return (
      <div className="py-10 text-center text-slate-400">
        Loading bookings...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-10 text-center text-red-400">
        Failed to load event bookings.
      </div>
    );
  }

  const bookings = data?.data ?? [];

  // ==========================
  // Calculate Statistics
  // ==========================
  const totalTickets = bookings.reduce(
    (total: number, booking: any) =>
      total + booking.quantity,
    0
  );

  const totalRevenue = bookings.reduce(
    (total: number, booking: any) => {
      if (booking.paymentStatus === "paid") {
        return total + booking.totalPrice;
      }

      return total;
    },
    0
  );

  const confirmedBookings =
    bookings.filter(
      (booking: any) =>
        booking.bookingStatus ===
        "confirmed"
    ).length;

  // ==========================
  // Empty State
  // ==========================
  if (bookings.length === 0) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-2xl font-bold text-white">
          No Bookings Yet
        </h2>

        <p className="mt-3 text-slate-400">
          No one has booked this event yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ==========================
          Header
      ========================== */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Event Bookings
        </h1>

        <p className="mt-2 text-slate-400">
          Manage bookings and track your
          event performance.
        </p>
      </div>

      {/* ==========================
          Statistics
      ========================== */}
      <div className="grid gap-5 md:grid-cols-3">
        {/* Tickets Sold */}
        <div className="rounded-2xl border border-slate-800 bg-[#162032] p-6">
          <p className="text-sm text-slate-400">
            Tickets Sold
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {totalTickets}
          </p>
        </div>

        {/* Revenue */}
        <div className="rounded-2xl border border-slate-800 bg-[#162032] p-6">
          <p className="text-sm text-slate-400">
            Revenue
          </p>

          <p className="mt-2 text-3xl font-bold text-emerald-400">
            ₹{totalRevenue}
          </p>
        </div>

        {/* Confirmed Bookings */}
        <div className="rounded-2xl border border-slate-800 bg-[#162032] p-6">
          <p className="text-sm text-slate-400">
            Confirmed Bookings
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {confirmedBookings}
          </p>
        </div>
      </div>

      {/* ==========================
          Bookings
      ========================== */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#162032]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="border-b border-slate-800">
              <tr className="text-left text-sm text-slate-400">
                <th className="px-6 py-4">
                  User
                </th>

                <th className="px-6 py-4">
                  Tickets
                </th>

                <th className="px-6 py-4">
                  Amount
                </th>

                <th className="px-6 py-4">
                  Payment
                </th>

                <th className="px-6 py-4">
                  Booking
                </th>
              </tr>
            </thead>

            <tbody>
              {bookings.map(
                (booking: any) => (
                  <tr
                    key={booking._id}
                    className="border-b border-slate-800 last:border-b-0"
                  >
                    {/* User */}
                    <td className="px-6 py-5">
                      <div>
                        <p className="font-semibold text-white">
                          {booking.user
                            ?.fullName ||
                            "Unknown User"}
                        </p>

                        <p className="text-sm text-slate-400">
                          {booking.user
                            ?.email ||
                            "No email"}
                        </p>
                      </div>
                    </td>

                    {/* Tickets */}
                    <td className="px-6 py-5 text-white">
                      {booking.quantity}
                    </td>

                    {/* Amount */}
                    <td className="px-6 py-5 font-semibold text-emerald-400">
                      ₹
                      {
                        booking.totalPrice
                      }
                    </td>

                    {/* Payment */}
                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          booking.paymentStatus ===
                          "paid"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : booking.paymentStatus ===
                              "failed"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {
                          booking.paymentStatus
                        }
                      </span>
                    </td>

                    {/* Booking */}
                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          booking.bookingStatus ===
                          "confirmed"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : booking.bookingStatus ===
                              "cancelled"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {
                          booking.bookingStatus
                        }
                      </span>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EventBookings;