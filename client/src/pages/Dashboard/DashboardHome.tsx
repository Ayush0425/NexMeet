import {
  useQueries,
  useQuery,
} from "@tanstack/react-query";

import { getMyEvents } from "../../services/event/event.service";
import { getBookingsByEvent } from "../../services/booking/booking.service";

function DashboardHome() {
  // ==========================
  // Get Organizer Events
  // ==========================
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-events"],
    queryFn: getMyEvents,
  });

  const events = data?.data ?? [];

  // ==========================
  // Get Bookings For Each Event
  // ==========================
  const bookingQueries = useQueries({
    queries: events.map((event: any) => ({
      queryKey: ["event-bookings", event._id],
      queryFn: () =>
        getBookingsByEvent(event._id),
      enabled: !!event._id,
    })),
  });

  const bookingsLoading =
    bookingQueries.some(
      (query) => query.isLoading
    );

  // ==========================
  // Loading
  // ==========================
  if (isLoading || bookingsLoading) {
    return (
      <div className="py-10 text-center text-slate-400">
        Loading dashboard...
      </div>
    );
  }

  // ==========================
  // Error
  // ==========================
  if (isError) {
    return (
      <div className="py-10 text-center text-red-400">
        Failed to load dashboard data.
      </div>
    );
  }

  // ==========================
  // Calculate Statistics
  // ==========================
const allBookings = bookingQueries.flatMap(
  (query) => (query.data as any)?.data ?? []
);

  // Confirmed tickets only
  const ticketsSold = allBookings.reduce(
    (total: number, booking: any) => {
      if (
        booking.bookingStatus ===
        "confirmed"
      ) {
        return total + booking.quantity;
      }

      return total;
    },
    0
  );

  // Paid revenue only
  const revenue = allBookings.reduce(
    (total: number, booking: any) => {
      if (
        booking.paymentStatus === "paid" &&
        booking.bookingStatus !== "cancelled"
      ) {
        return total + booking.totalPrice;
      }

      return total;
    },
    0
  );

  // Upcoming events
  const upcomingEvents = events.filter(
    (event: any) => {
      return (
        event.status === "upcoming" &&
        new Date(event.startDateTime) >
          new Date()
      );
    }
  );

  // Total available seats
  const availableSeats = events.reduce(
    (total: number, event: any) =>
      total + event.availableSeats,
    0
  );

  // ==========================
  // Recent Events
  // ==========================
  const recentEvents = [...events]
    .sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  return (
    <div className="space-y-10">
      {/* ==========================
          Header
      ========================== */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Dashboard Overview
        </h1>

        <p className="mt-2 text-slate-400">
          Here's what's happening with your
          events.
        </p>
      </div>

      {/* ==========================
          Statistics
      ========================== */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {/* Total Events */}
        <div className="rounded-2xl border border-slate-800 bg-[#162032] p-6">
          <p className="text-sm text-slate-400">
            Total Events
          </p>

          <p className="mt-3 text-3xl font-bold text-white">
            {events.length}
          </p>
        </div>

        {/* Upcoming Events */}
        <div className="rounded-2xl border border-slate-800 bg-[#162032] p-6">
          <p className="text-sm text-slate-400">
            Upcoming Events
          </p>

          <p className="mt-3 text-3xl font-bold text-white">
            {upcomingEvents.length}
          </p>
        </div>

        {/* Tickets Sold */}
        <div className="rounded-2xl border border-slate-800 bg-[#162032] p-6">
          <p className="text-sm text-slate-400">
            Tickets Sold
          </p>

          <p className="mt-3 text-3xl font-bold text-white">
            {ticketsSold}
          </p>
        </div>

        {/* Revenue */}
        <div className="rounded-2xl border border-slate-800 bg-[#162032] p-6">
          <p className="text-sm text-slate-400">
            Revenue
          </p>

          <p className="mt-3 text-3xl font-bold text-emerald-400">
            ₹{revenue}
          </p>
        </div>
      </div>

      {/* ==========================
          Capacity
      ========================== */}
      <div className="rounded-2xl border border-slate-800 bg-[#162032] p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">
              Event Capacity
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Total seats currently available
              across your events.
            </p>
          </div>

          <p className="text-2xl font-bold text-emerald-400">
            {availableSeats}
          </p>
        </div>
      </div>

      {/* ==========================
          Recent Events
      ========================== */}
      <div>
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-white">
            Recent Events
          </h2>

          <p className="mt-1 text-slate-400">
            Your latest created events.
          </p>
        </div>

        {recentEvents.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-[#162032] p-8 text-center">
            <p className="text-slate-400">
              You haven't created any events yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {recentEvents.map(
              (event: any) => (
                <div
                  key={event._id}
                  className="overflow-hidden rounded-2xl border border-slate-800 bg-[#162032]"
                >
                  {/* Banner */}
                  {event.banner ? (
                    <img
                      src={event.banner}
                      alt={event.title}
                      className="h-44 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-44 items-center justify-center bg-[#0B1120]">
                      <span className="text-slate-500">
                        No banner available
                      </span>
                    </div>
                  )}

                  {/* Details */}
                  <div className="space-y-3 p-5">
                    <h3 className="text-xl font-bold text-white">
                      {event.title}
                    </h3>

                    <p className="text-sm text-slate-400">
                      📅{" "}
                      {new Date(
                        event.startDateTime
                      ).toLocaleString()}
                    </p>

                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">
                        Available Seats
                      </span>

                      <span className="font-semibold text-white">
                        {
                          event.availableSeats
                        }
                        /
                        {
                          event.totalSeats
                        }
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">
                        Status
                      </span>

                      <span className="font-medium text-emerald-400">
                        {event.status}
                      </span>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardHome;