import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getBookingsByEvent } from "../../../services/booking/booking.service";

function EventBookings() {
  const { eventId } = useParams();

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["event-bookings", eventId],
    queryFn: () =>
      getBookingsByEvent(eventId!),
    enabled: !!eventId,
  });

  // ==========================
  // Loading Skeleton
  // ==========================
  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse sm:space-y-8">
        {/* Header Skeleton */}
        <div>
          <div className="h-8 w-52 rounded-lg bg-slate-800 sm:h-9" />

          <div className="mt-3 h-5 w-full max-w-80 rounded-lg bg-slate-800" />
        </div>

        {/* Statistics Skeleton */}
        <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
          {Array.from({ length: 3 }).map(
            (_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-800 bg-[#162032] p-5 sm:p-6"
              >
                <div className="h-5 w-28 rounded-lg bg-slate-800" />

                <div className="mt-3 h-9 w-20 rounded-lg bg-slate-800" />
              </div>
            )
          )}
        </div>

        {/* Bookings Table Skeleton */}
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#162032]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="border-b border-slate-800">
                <tr>
                  {Array.from({ length: 5 }).map(
                    (_, index) => (
                      <th
                        key={index}
                        className="px-6 py-4"
                      >
                        <div className="h-4 w-20 rounded bg-slate-800" />
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                {Array.from({ length: 5 }).map(
                  (_, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className="border-b border-slate-800 last:border-b-0"
                    >
                      <td className="px-6 py-5">
                        <div className="space-y-2">
                          <div className="h-5 w-28 rounded bg-slate-800" />
                          <div className="h-4 w-36 rounded bg-slate-800" />
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <div className="h-5 w-8 rounded bg-slate-800" />
                      </td>

                      <td className="px-6 py-5">
                        <div className="h-5 w-20 rounded bg-slate-800" />
                      </td>

                      <td className="px-6 py-5">
                        <div className="h-6 w-16 rounded-full bg-slate-800" />
                      </td>

                      <td className="px-6 py-5">
                        <div className="h-6 w-20 rounded-full bg-slate-800" />
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

  // ==========================
  // Error
  // ==========================
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
        {/* Icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10">
          <span className="text-3xl">
            ⚠️
          </span>
        </div>

        {/* Message */}
        <h2 className="mt-6 text-2xl font-bold text-white">
          Unable to Load Bookings
        </h2>

        <p className="mt-3 max-w-md text-sm leading-6 text-slate-400 sm:text-base">
          We couldn't load the bookings for this
          event right now. Please check your
          connection and try again.
        </p>

        {/* Retry */}
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
        >
          Try Again
        </button>
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
      <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
        {/* Icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800">
          <span className="text-3xl">
            🎟️
          </span>
        </div>

        {/* Message */}
        <h2 className="mt-6 text-2xl font-bold text-white">
          No Bookings Yet
        </h2>

        <p className="mt-3 max-w-md text-sm leading-6 text-slate-400 sm:text-base">
          No one has booked this event yet.
          Bookings will appear here once
          attendees start registering.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ==========================
          Header
      ========================== */}
      <div>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          Event Bookings
        </h1>

        <p className="mt-2 text-sm text-slate-400 sm:text-base">
          Manage bookings and track your
          event performance.
        </p>
      </div>

      {/* ==========================
          Statistics
      ========================== */}
      <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
        {/* Tickets Sold */}
        <div className="rounded-2xl border border-slate-800 bg-[#162032] p-5 sm:p-6">
          <p className="text-sm text-slate-400">
            Tickets Sold
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {totalTickets}
          </p>
        </div>

        {/* Revenue */}
        <div className="rounded-2xl border border-slate-800 bg-[#162032] p-5 sm:p-6">
          <p className="text-sm text-slate-400">
            Revenue
          </p>

          <p className="mt-2 text-3xl font-bold text-emerald-400">
            ₹{totalRevenue}
          </p>
        </div>

        {/* Confirmed Bookings */}
        <div className="rounded-2xl border border-slate-800 bg-[#162032] p-5 sm:p-6">
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
        {/* Mobile helper */}
        <div className="border-b border-slate-800 px-4 py-3 text-xs text-slate-500 sm:hidden">
          Swipe horizontally to view all booking details →
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="border-b border-slate-800">
              <tr className="text-left text-sm text-slate-400">
                <th className="px-4 py-4 sm:px-6">
                  User
                </th>

                <th className="px-4 py-4 sm:px-6">
                  Tickets
                </th>

                <th className="px-4 py-4 sm:px-6">
                  Amount
                </th>

                <th className="px-4 py-4 sm:px-6">
                  Payment
                </th>

                <th className="px-4 py-4 sm:px-6">
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
                    <td className="px-4 py-5 sm:px-6">
                      <div className="max-w-xs">
                        <p className="break-words font-semibold text-white">
                          {booking.user
                            ?.fullName ||
                            "Unknown User"}
                        </p>

                        <p className="mt-1 break-all text-sm text-slate-400">
                          {booking.user
                            ?.email ||
                            "No email"}
                        </p>
                      </div>
                    </td>

                    {/* Tickets */}
                    <td className="px-4 py-5 text-white sm:px-6">
                      {booking.quantity}
                    </td>

                    {/* Amount */}
                    <td className="px-4 py-5 font-semibold text-emerald-400 sm:px-6">
                      ₹{booking.totalPrice}
                    </td>

                    {/* Payment */}
                    <td className="px-4 py-5 sm:px-6">
                      <span
                        className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${
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
                    <td className="px-4 py-5 sm:px-6">
                      <span
                        className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${
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