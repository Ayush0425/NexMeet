import { useQuery } from "@tanstack/react-query";
import { getMyBookings } from "../../../services/booking/booking.service";

function MyBookings() {
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-bookings"],
    queryFn: getMyBookings,
  });

  if (isLoading) {
    return (
      <div className="py-10 text-center text-slate-400">
        Loading your bookings...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-10 text-center text-red-400">
        Failed to load your bookings.
      </div>
    );
  }

  const bookings = data?.data ?? [];

  if (bookings.length === 0) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-2xl font-bold text-white">
          No Bookings Found
        </h2>

        <p className="mt-3 text-slate-400">
          Book an event to see your tickets here.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {bookings.map((booking: any) => (
          <div
            key={booking._id}
            className="overflow-hidden rounded-3xl border border-slate-800 bg-[#162032]"
          >
            {/* Event Banner */}
            {booking.event?.banner ? (
              <img
                src={booking.event.banner}
                alt={booking.event.title}
                className="h-52 w-full object-cover"
              />
            ) : (
              <div className="flex h-52 items-center justify-center bg-[#0B1120]">
                <span className="text-slate-500">
                  No banner available
                </span>
              </div>
            )}

            {/* Booking Details */}
            <div className="space-y-4 p-6">
              <h2 className="text-2xl font-bold text-white">
                {booking.event?.title}
              </h2>

              <p className="text-slate-400">
                📍 {booking.event?.location}
              </p>

              <p className="text-slate-400">
                📅{" "}
                {booking.event?.startDateTime
                  ? new Date(
                      booking.event.startDateTime
                    ).toLocaleString()
                  : "Date unavailable"}
              </p>

              <div className="flex justify-between text-slate-400">
                <span>🎟️ Tickets</span>

                <span className="font-semibold text-white">
                  {booking.quantity}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">
                  💰 Total
                </span>

                <span className="font-bold text-emerald-400">
                  ₹{booking.totalPrice}
                </span>
              </div>

              {/* Status */}
              <div className="flex gap-3 pt-2">
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    booking.bookingStatus ===
                    "confirmed"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : booking.bookingStatus ===
                        "cancelled"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {booking.bookingStatus}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    booking.paymentStatus ===
                    "paid"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : booking.paymentStatus ===
                        "failed"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  Payment:{" "}
                  {booking.paymentStatus}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBookings;