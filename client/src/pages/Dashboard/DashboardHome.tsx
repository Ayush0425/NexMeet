import { useState } from "react";
import {
  useQueries,
  useQuery,
} from "@tanstack/react-query";
import {
  Calendar,
  CalendarCheck,
  CalendarPlus,
  CheckCircle2,
  Clock,
  Compass,
  Copy,
  DollarSign,
  ExternalLink,
  MapPin,
  QrCode,
  Ticket,
  TrendingUp,
  Users,
  Edit3,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { getMyEvents } from "../../services/event/event.service";
import { getBookingsByEvent, getMyBookings } from "../../services/booking/booking.service";
import { useAuth } from "../../context/auth/AuthContext";

function DashboardHome() {
  const { user } = useAuth();
  const isOrganizer = user?.role?.toLowerCase() === "organizer";

  // Greeting helper based on current hour
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  // State to track copied link state
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyLink = (eventId: string) => {
    const url = `${window.location.origin}/events/${eventId}`;
    navigator.clipboard.writeText(url);
    setCopiedId(eventId);
    toast.success("Event link copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  // ==========================
  // Organizer Data Queries
  // ==========================
  const {
    data: organizerEventsData,
    isLoading: isEventsLoading,
    isError: isEventsError,
  } = useQuery({
    queryKey: ["my-events"],
    queryFn: getMyEvents,
    enabled: isOrganizer,
  });

  const events = organizerEventsData?.data ?? [];

  const bookingQueries = useQueries({
    queries: isOrganizer
      ? events.map((event: any) => ({
          queryKey: ["event-bookings", event._id],
          queryFn: () => getBookingsByEvent(event._id),
          enabled: !!event._id,
        }))
      : [],
  });

  const bookingsLoading = isOrganizer && bookingQueries.some((query) => query.isLoading);

  // ==========================
  // Attendee (Normal User) Data Query
  // ==========================
  const {
    data: attendeeBookingsData,
    isLoading: isAttendeeLoading,
    isError: isAttendeeError,
  } = useQuery({
    queryKey: ["my-bookings"],
    queryFn: getMyBookings,
    enabled: !isOrganizer,
  });

  const attendeeBookings = attendeeBookingsData?.data ?? [];

  // ==========================
  // Loading State
  // ==========================
  if ((isOrganizer && (isEventsLoading || bookingsLoading)) || (!isOrganizer && isAttendeeLoading)) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-14 w-1/3 rounded-2xl bg-slate-200" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 rounded-2xl bg-slate-200" />
          ))}
        </div>
        <div className="h-64 rounded-2xl bg-slate-200" />
      </div>
    );
  }

  // ==========================
  // Error State
  // ==========================
  if ((isOrganizer && isEventsError) || (!isOrganizer && isAttendeeError)) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center">
        <p className="text-base font-semibold text-rose-700">Failed to load dashboard data.</p>
        <p className="mt-1 text-xs text-slate-500">Please check your network connection or try refreshing the page.</p>
      </div>
    );
  }

  // ============================================================================
  // ORGANIZER DASHBOARD VIEW (Light Mode)
  // ============================================================================
  if (isOrganizer) {
    const allBookings = bookingQueries.flatMap((query) => (query.data as any)?.data ?? []);

    const ticketsSold = allBookings.reduce((total: number, booking: any) => {
      if (booking.bookingStatus === "confirmed") {
        return total + (booking.quantity || 1);
      }
      return total;
    }, 0);

    const revenue = allBookings.reduce((total: number, booking: any) => {
      if (booking.paymentStatus === "paid" && booking.bookingStatus !== "cancelled") {
        return total + (booking.totalPrice || 0);
      }
      return total;
    }, 0);

    const upcomingEvents = events.filter((event: any) => {
      return event.status === "upcoming" && new Date(event.startDateTime) > new Date();
    });

    const totalCapacity = events.reduce((total: number, event: any) => total + (event.totalSeats || 0), 0);
    const availableSeats = events.reduce((total: number, event: any) => total + (event.availableSeats || 0), 0);
    const capacityFillRate = totalCapacity > 0 ? Math.round(((totalCapacity - availableSeats) / totalCapacity) * 100) : 0;

    const recentEvents = [...events]
      .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 6);

    const recentBookings = [...allBookings]
      .sort((a: any, b: any) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
      .slice(0, 5);

    return (
      <div className="space-y-8">
        {/* Header with Greeting & Quick Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {getGreeting()}, {user?.fullName || "Organizer"} 👋
              </h1>
              <span className="hidden sm:inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200">
                Organizer Pro
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              Here is your real-time event analytics, ticket sales, and gate check-in status.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/dashboard/check-in"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-2xs transition hover:bg-slate-50 hover:border-slate-300"
            >
              <QrCode size={16} className="text-emerald-600" />
              <span>Gate Scanner</span>
            </Link>

            <Link
              to="/dashboard/create-event"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-emerald-600/20 transition hover:bg-emerald-500 active:scale-95"
            >
              <CalendarPlus size={16} />
              <span>Create Event</span>
            </Link>
          </div>
        </div>

        {/* 4 Rich KPI Metric Cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* Revenue */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Revenue</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100">
                <DollarSign size={18} />
              </div>
            </div>
            <p className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              ₹{revenue.toLocaleString("en-IN")}
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-emerald-700">
              <TrendingUp size={14} />
              <span>Verified Razorpay Payments</span>
            </div>
          </div>

          {/* Tickets Sold */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Tickets Sold</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 border border-cyan-100">
                <Ticket size={18} />
              </div>
            </div>
            <p className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {ticketsSold} <span className="text-xs font-normal text-slate-500">passes</span>
            </p>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
              <span>Overall fill rate</span>
              <span className="font-semibold text-cyan-700">{capacityFillRate}%</span>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Upcoming Events</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-700 border border-amber-100">
                <CalendarCheck size={18} />
              </div>
            </div>
            <p className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {upcomingEvents.length} <span className="text-xs font-normal text-slate-500">/ {events.length} total</span>
            </p>
            <div className="mt-2 text-xs text-slate-500">
              <span>{events.length - upcomingEvents.length} past / concluded</span>
            </div>
          </div>

          {/* Gate Capacity */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Gate Capacity</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100">
                <Users size={18} />
              </div>
            </div>
            <p className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {availableSeats} <span className="text-xs font-normal text-slate-500">seats open</span>
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-emerald-700">
              <CheckCircle2 size={14} />
              <span>QR Scanner Ready</span>
            </div>
          </div>
        </div>

        {/* Organizer Quick Actions Bar */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-1">
            Quick Organizer Shortcuts
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link
              to="/dashboard/create-event"
              className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-xs font-semibold text-slate-800 transition hover:border-emerald-300 hover:bg-white hover:shadow-xs"
            >
              <CalendarPlus size={16} className="text-emerald-600 shrink-0" />
              <span>New Event</span>
            </Link>

            <Link
              to="/dashboard/check-in"
              className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-xs font-semibold text-slate-800 transition hover:border-emerald-300 hover:bg-white hover:shadow-xs"
            >
              <QrCode size={16} className="text-emerald-600 shrink-0" />
              <span>Gate Check-In</span>
            </Link>

            <Link
              to="/dashboard/my-events"
              className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-xs font-semibold text-slate-800 transition hover:border-emerald-300 hover:bg-white hover:shadow-xs"
            >
              <Ticket size={16} className="text-emerald-600 shrink-0" />
              <span>Manage Events</span>
            </Link>

            <Link
              to="/events"
              className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-xs font-semibold text-slate-800 transition hover:border-emerald-300 hover:bg-white hover:shadow-xs"
            >
              <Compass size={16} className="text-emerald-600 shrink-0" />
              <span>Explore Platform</span>
            </Link>
          </div>
        </div>

        {/* Active Events Management Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl">Your Events</h2>
              <p className="text-xs sm:text-sm text-slate-500">Manage tickets, live seat capacity, and attendee rosters.</p>
            </div>

            <Link
              to="/dashboard/my-events"
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition"
            >
              View All ({events.length}) →
            </Link>
          </div>

          {recentEvents.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-2xs">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mb-4 border border-emerald-100">
                <CalendarPlus size={28} />
              </div>
              <h3 className="text-base font-bold text-slate-900">You haven't hosted any events yet</h3>
              <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
                Create your first event page in under two minutes with automated tickets and instant payments.
              </p>
              <Link
                to="/dashboard/create-event"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-emerald-500 transition"
              >
                <CalendarPlus size={15} />
                Create Your First Event
              </Link>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {recentEvents.map((event: any) => {
                const bookedSeats = (event.totalSeats || 0) - (event.availableSeats || 0);
                const percent = event.totalSeats > 0 ? Math.round((bookedSeats / event.totalSeats) * 100) : 0;
                const isUpcoming = new Date(event.startDateTime) > new Date();

                return (
                  <div
                    key={event._id}
                    className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:border-slate-300 hover:shadow-lg"
                  >
                    <div>
                      {/* Banner Image with Status Badges */}
                      <div className="relative h-36 w-full overflow-hidden bg-slate-100">
                        {event.banner ? (
                          <img
                            src={event.banner}
                            alt={event.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">
                            <Calendar size={32} />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Status badge */}
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold backdrop-blur-md shadow-2xs">
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              isUpcoming ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                            }`}
                          />
                          <span className={isUpcoming ? "text-emerald-800" : "text-slate-600"}>
                            {isUpcoming ? "Upcoming" : "Past"}
                          </span>
                        </div>

                        {/* Price Badge */}
                        <div className="absolute top-3 right-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold text-slate-900 backdrop-blur-md shadow-2xs">
                          {event.ticketPrice === 0 ? "Free" : `₹${event.ticketPrice}`}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-3">
                        <h3 className="line-clamp-1 font-bold text-slate-900 text-base group-hover:text-emerald-600 transition">
                          {event.title}
                        </h3>

                        <div className="space-y-1.5 text-xs text-slate-500">
                          <div className="flex items-center gap-2">
                            <Clock size={13} className="text-emerald-600 shrink-0" />
                            <span>
                              {new Date(event.startDateTime).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <MapPin size={13} className="text-emerald-600 shrink-0" />
                            <span className="truncate">{event.location || "Online"}</span>
                          </div>
                        </div>

                        {/* Capacity Progress Bar */}
                        <div className="space-y-1 rounded-xl border border-slate-100 bg-slate-50 p-2.5 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-500 text-[11px] font-medium">Seat Capacity</span>
                            <span className="font-bold text-slate-800">
                              {bookedSeats} / {event.totalSeats} ({percent}%)
                            </span>
                          </div>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                            <div
                              className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                              style={{ width: `${Math.min(percent, 100)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="border-t border-slate-100 p-3 bg-slate-50/70 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <Link
                          to={`/dashboard/event-bookings/${event._id}`}
                          className="rounded-lg bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-600 hover:text-white"
                          title="View Attendee Roster"
                        >
                          Bookings
                        </Link>

                        <Link
                          to={`/dashboard/edit-event/${event._id}`}
                          className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
                          title="Edit Event"
                        >
                          <Edit3 size={15} />
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleCopyLink(event._id)}
                          className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
                          title="Copy Share Link"
                        >
                          {copiedId === event._id ? <CheckCircle2 size={15} className="text-emerald-600" /> : <Copy size={15} />}
                        </button>
                      </div>

                      <Link
                        to={`/events/${event._id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-slate-900 transition"
                      >
                        <span>Preview</span>
                        <ExternalLink size={12} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Attendee Bookings Feed */}
        {recentBookings.length > 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Recent Attendee Bookings</h3>
              <span className="text-xs text-slate-500">Live order activity</span>
            </div>

            <div className="divide-y divide-slate-100">
              {recentBookings.map((booking: any) => (
                <div key={booking._id} className="py-3 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold">
                      {booking.user?.fullName ? booking.user.fullName[0] : "A"}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{booking.user?.fullName || "Guest Attendee"}</p>
                      <p className="text-slate-500 text-[11px]">{booking.event?.title || "Event Pass"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-right shrink-0">
                    <div>
                      <p className="font-semibold text-slate-900">₹{booking.totalPrice || 0}</p>
                      <p className="text-slate-500 text-[11px]">{booking.quantity} ticket(s)</p>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                        booking.paymentStatus === "paid"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {booking.paymentStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ============================================================================
  // ATTENDEE (NORMAL USER) DASHBOARD VIEW (Light Mode)
  // ============================================================================
  const totalTickets = attendeeBookings.reduce((sum: number, b: any) => sum + (b.quantity || 1), 0);
  const activePasses = attendeeBookings.filter((b: any) => b.bookingStatus === "confirmed").length;
  const totalSpent = attendeeBookings.reduce(
    (sum: number, b: any) => (b.paymentStatus === "paid" ? sum + (b.totalPrice || 0) : sum),
    0
  );

  return (
    <div className="space-y-8">
      {/* Attendee Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {getGreeting()}, {user?.fullName || "Explorer"} 👋
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Welcome to your attendee wallet. Access your event passes and discover upcoming gatherings.
          </p>
        </div>

        <Link
          to="/events"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-emerald-600/20 transition hover:bg-emerald-500 shrink-0"
        >
          <Compass size={16} />
          <span>Explore Upcoming Events</span>
        </Link>
      </div>

      {/* Attendee Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
            <span>Active Passes</span>
            <Ticket size={18} className="text-emerald-600" />
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-900">{activePasses}</p>
          <p className="mt-1 text-xs text-emerald-700 font-medium">Ready for gate check-in</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
            <span>Total Bookings</span>
            <CalendarCheck size={18} className="text-cyan-600" />
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-900">{attendeeBookings.length}</p>
          <p className="mt-1 text-xs text-slate-500">{totalTickets} total tickets purchased</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
            <span>Total Invested</span>
            <DollarSign size={18} className="text-amber-600" />
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-900">₹{totalSpent.toLocaleString("en-IN")}</p>
          <p className="mt-1 text-xs text-slate-500">In experiences & conferences</p>
        </div>
      </div>

      {/* Booked Events Hub */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 sm:text-xl">Your Booked Passes</h2>
          <Link to="/dashboard/my-tickets" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700">
            Open QR Ticket Wallet →
          </Link>
        </div>

        {attendeeBookings.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-2xs">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mb-4 border border-emerald-100">
              <Ticket size={28} />
            </div>
            <h3 className="text-base font-bold text-slate-900">No active passes yet</h3>
            <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
              You haven't reserved tickets for any events yet. Check out what's happening this week!
            </p>
            <Link
              to="/events"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-emerald-500 transition"
            >
              <Compass size={15} />
              Browse Events
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {attendeeBookings.slice(0, 6).map((booking: any) => (
              <div
                key={booking._id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 space-y-4 flex flex-col justify-between shadow-sm hover:shadow-md transition"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                      {booking.bookingStatus}
                    </span>
                    <span className="text-xs font-bold text-slate-900">₹{booking.totalPrice}</span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base line-clamp-1">
                    {booking.event?.title || "Event Pass"}
                  </h3>

                  <div className="space-y-1 text-xs text-slate-500">
                    <p className="flex items-center gap-1.5">
                      <Clock size={13} className="text-emerald-600" />
                      {booking.event?.startDateTime
                        ? new Date(booking.event.startDateTime).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "Date TBA"}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-emerald-600" />
                      <span className="truncate">{booking.event?.location || "Online"}</span>
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                  <span className="text-xs text-slate-500">{booking.quantity} Pass(es)</span>
                  <Link
                    to="/dashboard/my-tickets"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500 transition shadow-2xs"
                  >
                    <QrCode size={14} />
                    <span>View QR Pass</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upgrade to Organizer Promotion */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div>
          <h3 className="text-base font-bold text-slate-900 sm:text-lg">Want to host your own events?</h3>
          <p className="mt-1 text-xs text-slate-500 max-w-xl">
            Whether it's a tech demo day, live concert, or private meetup, launch your event page on NexMeet with built-in ticketing and instant QR check-in.
          </p>
        </div>
        <Link
          to="/dashboard/create-event"
          className="rounded-xl border border-slate-300 bg-slate-50 px-5 py-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-100 transition shrink-0"
        >
          Become an Organizer
        </Link>
      </div>
    </div>
  );
}

export default DashboardHome;