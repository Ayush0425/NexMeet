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

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-events"],
    queryFn: getMyEvents,
  });

  if (isLoading) {
    return (
      <div className="py-20 text-center text-white">
        Loading your events...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-20 text-center text-red-500">
        Failed to load your events.
      </div>
    );
  }

  const events = data?.data ?? [];

  if (events.length === 0) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-3xl font-bold text-white">
          No Events Found
        </h2>

        <p className="mt-3 text-slate-400">
          Create your first event to see it here.
        </p>
      </div>
    );
  }

  return (
    <main>
      <h1 className="mb-8 text-3xl font-bold text-white">
        My Events
      </h1>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {events.map((event: any) => (
          <div
            key={event._id}
            className="overflow-hidden rounded-3xl border border-slate-800 bg-[#162032]"
          >
            <img
              src={event.banner}
              alt={event.title}
              className="h-56 w-full object-cover"
            />

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

              <p className="text-slate-400">
                💺 {event.availableSeats}/
                {event.totalSeats}
              </p>

              <p className="text-2xl font-bold text-emerald-400">
                ₹{event.price}
              </p>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() =>
                    navigate(
                      `/dashboard/edit-event/${event._id}`
                    )
                  }
                  className="flex-1 rounded-xl bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700"
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                    const confirmDelete =
                      window.confirm(
                        "Are you sure you want to delete this event?"
                      );

                    if (!confirmDelete) return;

                    deleteMutation.mutate(
                      event._id
                    );
                  }}
                  disabled={deleteMutation.isPending}
                  className="flex-1 rounded-xl bg-red-600 py-2 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
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
    </main>
  );
}

export default MyEvents;