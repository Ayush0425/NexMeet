import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";

import {
  getMyEvents,
  deleteEvent,
} from "../../../services/event/event.service";

function MyEvents() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // ==========================
  // Delete Event
  // ==========================
  const deleteMutation = useMutation({
    mutationFn: deleteEvent,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-events"],
      });

      alert("Event deleted successfully!");
    },

    onError: () => {
      alert("Failed to delete event");
    },
  });

  // ==========================
  // Get My Events
  // ==========================
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-events"],
    queryFn: getMyEvents,
  });

  // ==========================
  // Loading
  // ==========================
  if (isLoading) {
    return (
      <div className="py-10 text-center text-slate-400">
        Loading your events...
      </div>
    );
  }

  // ==========================
  // Error
  // ==========================
  if (isError) {
    return (
      <div className="py-10 text-center text-red-400">
        Failed to load your events.
      </div>
    );
  }

  const events = data?.data ?? [];

  // ==========================
  // Empty State
  // ==========================
  if (events.length === 0) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-2xl font-bold text-white">
          No Events Found
        </h2>

        <p className="mt-3 text-slate-400">
          Create your first event to see it here.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* ==========================
          Page Header
      ========================== */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          My Events
        </h1>

        <p className="mt-2 text-slate-400">
          Manage your events and view bookings.
        </p>
      </div>

      {/* ==========================
          Events Grid
      ========================== */}
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {events.map((event: any) => (
          <div
            key={event._id}
            className="overflow-hidden rounded-3xl border border-slate-800 bg-[#162032]"
          >
            {/* Event Banner */}
            {event.banner ? (
              <img
                src={event.banner}
                alt={event.title}
                className="h-56 w-full object-cover"
              />
            ) : (
              <div className="flex h-56 items-center justify-center bg-[#0B1120]">
                <span className="text-slate-500">
                  No banner available
                </span>
              </div>
            )}

            {/* Event Details */}
            <div className="space-y-3 p-6">
              <h2 className="text-2xl font-bold text-white">
                {event.title}
              </h2>

              <p className="text-slate-400">
                📍 {event.location}
              </p>

              <p className="text-slate-400">
                📅{" "}
                {new Date(
                  event.startDateTime
                ).toLocaleString()}
              </p>

              {/* Capacity */}
              <p className="text-slate-400">
                💺 {event.availableSeats}/
                {event.totalSeats} seats available
              </p>

              {/* Price */}
              <p className="text-2xl font-bold text-emerald-400">
                ₹{event.price}
              </p>

              {/* ==========================
                  Action Buttons
              ========================== */}
              <div className="grid grid-cols-3 gap-3 pt-4">
                {/* View Bookings */}
                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      `/dashboard/event-bookings/${event._id}`
                    )
                  }
                  className="rounded-xl bg-emerald-600 py-2 font-semibold text-white transition hover:bg-emerald-700"
                >
                  Bookings
                </button>

                {/* Edit */}
                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      `/dashboard/edit-event/${event._id}`
                    )
                  }
                  className="rounded-xl bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700"
                >
                  Edit
                </button>

                {/* Delete */}
                <button
                  type="button"
                  onClick={() => {
                    const confirmDelete =
                      window.confirm(
                        "Are you sure you want to delete this event?"
                      );

                    if (!confirmDelete) {
                      return;
                    }

                    deleteMutation.mutate(
                      event._id
                    );
                  }}
                  disabled={
                    deleteMutation.isPending
                  }
                  className="rounded-xl bg-red-600 py-2 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {deleteMutation.isPending
                    ? "Deleting..."
                    : "Delete"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyEvents;