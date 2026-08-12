import { useQuery } from "@tanstack/react-query";

import { getMyTickets } from "../../../services/ticket/ticket.service";

function MyTickets() {
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-tickets"],
    queryFn: getMyTickets,
  });

  if (isLoading) {
    return (
      <div className="py-10 text-center text-slate-400">
        Loading your tickets...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-10 text-center text-red-400">
        Failed to load your tickets.
      </div>
    );
  }

  const tickets = data?.data ?? [];

  if (tickets.length === 0) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-3xl font-bold text-white">
          No Tickets Found
        </h1>

        <p className="mt-3 text-slate-400">
          Your paid event tickets will appear here.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold text-white">
        My Tickets
      </h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {tickets.map((ticket: any) => (
          <div
            key={ticket._id}
            className="overflow-hidden rounded-3xl border border-slate-800 bg-[#162032] p-6"
          >
            {/* Event */}
            <div>
              <h2 className="text-2xl font-bold text-white">
                {ticket.event?.title ||
                  "Event"}
              </h2>

              <p className="mt-2 text-slate-400">
                📍{" "}
                {ticket.event?.location ||
                  "Location unavailable"}
              </p>

              <p className="mt-2 text-slate-400">
                📅{" "}
                {ticket.event?.startDateTime
                  ? new Date(
                      ticket.event.startDateTime
                    ).toLocaleString()
                  : "Date unavailable"}
              </p>
            </div>

            {/* QR Code */}
            <div className="mt-6 flex justify-center rounded-2xl bg-white p-4">
              <img
                src={ticket.qrCode}
                alt={`QR code for ${ticket.ticketCode}`}
                className="h-48 w-48"
              />
            </div>

            {/* Ticket Info */}
            <div className="mt-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400">
                  Ticket
                </span>

                <span className="font-mono text-sm text-white">
                  {ticket.ticketCode}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">
                  Status
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
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