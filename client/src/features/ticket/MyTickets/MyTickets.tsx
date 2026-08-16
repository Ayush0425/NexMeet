import { useQuery } from "@tanstack/react-query";

import { getMyTickets } from "../../../services/ticket/ticket.service";

function MyTickets() {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["my-tickets"],
    queryFn: getMyTickets,
  });

  // ==========================
  // Loading Skeleton
  // ==========================
  if (isLoading) {
    return (
      <div>
        {/* Page Header Skeleton */}
        <div className="mb-6 animate-pulse sm:mb-8">
          <div className="h-9 w-40 rounded-lg bg-slate-800" />
        </div>

        {/* Ticket Cards Skeleton */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map(
            (_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-3xl border border-slate-800 bg-[#162032] p-5 animate-pulse sm:p-6"
              >
                {/* Event Info */}
                <div className="space-y-3">
                  {/* Title */}
                  <div className="h-7 w-3/4 rounded-lg bg-slate-800" />

                  {/* Location */}
                  <div className="h-5 w-2/3 rounded-lg bg-slate-800" />

                  {/* Date */}
                  <div className="h-5 w-4/5 rounded-lg bg-slate-800" />
                </div>

                {/* QR Code */}
                <div className="mt-6 flex justify-center rounded-2xl bg-slate-800 p-4">
                  <div className="h-40 w-40 rounded-lg bg-slate-700 sm:h-48 sm:w-48" />
                </div>

                {/* Ticket Info */}
                <div className="mt-6 space-y-4">
                  {/* Ticket Code */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="h-5 w-16 rounded-lg bg-slate-800" />
                    <div className="h-5 w-28 rounded-lg bg-slate-800" />
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="h-5 w-16 rounded-lg bg-slate-800" />
                    <div className="h-7 w-20 rounded-full bg-slate-800" />
                  </div>
                </div>
              </div>
            )
          )}
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
          Unable to Load Tickets
        </h2>

        <p className="mt-3 max-w-md text-sm leading-6 text-slate-400 sm:text-base">
          We couldn't load your tickets right
          now. Please check your connection
          and try again.
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

  const tickets = data?.data ?? [];

  // ==========================
  // No Tickets
  // ==========================
  if (tickets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
        {/* Icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10">
          <span className="text-3xl">
            🎟️
          </span>
        </div>

        {/* Message */}
        <h1 className="mt-6 text-2xl font-bold text-white">
          No Tickets Yet
        </h1>

        <p className="mt-3 max-w-md text-sm leading-6 text-slate-400 sm:text-base">
          Your paid event tickets will appear
          here. Explore events and book your
          next experience.
        </p>

        {/* Action */}
        <button
          type="button"
          onClick={() =>
            window.location.href = "/events"
          }
          className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
        >
          Explore Events
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* ==========================
          Page Header
      ========================== */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          My Tickets
        </h1>

        <p className="mt-2 text-sm text-slate-400 sm:text-base">
          Your event tickets and QR codes.
        </p>
      </div>

      {/* ==========================
          Tickets Grid
      ========================== */}
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
        {tickets.map((ticket: any) => (
          <div
            key={ticket._id}
            className="overflow-hidden rounded-3xl border border-slate-800 bg-[#162032] p-5 sm:p-6"
          >
            {/* ==========================
                Event
            ========================== */}
            <div className="min-w-0">
              <h2 className="line-clamp-2 break-words text-xl font-bold text-white sm:text-2xl">
                {ticket.event?.title ||
                  "Event"}
              </h2>

              <p className="mt-2 break-words text-sm leading-6 text-slate-400 sm:text-base">
                📍{" "}
                {ticket.event?.location ||
                  "Location unavailable"}
              </p>

              <p className="mt-2 break-words text-sm leading-6 text-slate-400 sm:text-base">
                📅{" "}
                {ticket.event?.startDateTime
                  ? new Date(
                      ticket.event.startDateTime
                    ).toLocaleString()
                  : "Date unavailable"}
              </p>
            </div>

            {/* ==========================
                QR Code
            ========================== */}
            <div className="mt-6 flex justify-center rounded-2xl bg-white p-3 sm:p-4">
              <img
                src={ticket.qrCode}
                alt={`QR code for ${ticket.ticketCode}`}
                className="h-40 w-40 object-contain sm:h-48 sm:w-48"
              />
            </div>

            {/* ==========================
                Ticket Info
            ========================== */}
            <div className="mt-6 space-y-4">
              {/* Ticket Code */}
              <div className="flex items-start justify-between gap-4">
                <span className="shrink-0 text-sm text-slate-400 sm:text-base">
                  Ticket
                </span>

                <span className="max-w-[65%] break-all text-right font-mono text-xs text-white sm:text-sm">
                  {ticket.ticketCode}
                </span>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-slate-400 sm:text-base">
                  Status
                </span>

                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium sm:text-sm ${
                    ticket.status === "active"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : ticket.status ===
                        "used"
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {ticket.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyTickets;