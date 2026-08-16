import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

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

      toast.success(
        "Event deleted successfully!"
      );
    },

    onError: () => {
      toast.error(
        "Failed to delete event"
      );
    },
  });

  // ==========================
  // Get My Events
  // ==========================
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["my-events"],
    queryFn: getMyEvents,
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

          <div className="mt-3 h-5 w-72 max-w-full rounded-lg bg-slate-800" />
        </div>

        {/* Event Cards Skeleton */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map(
            (_, index) => (
              <div
                key={index}
                className="animate-pulse overflow-hidden rounded-3xl border border-slate-800 bg-[#162032]"
              >
                {/* Banner */}
                <div className="h-44 w-full bg-slate-800 sm:h-56" />

                {/* Event Details */}
                <div className="space-y-4 p-5 sm:p-6">
                  {/* Title */}
                  <div className="h-7 w-3/4 rounded-lg bg-slate-800" />

                  {/* Location */}
                  <div className="h-5 w-2/3 rounded-lg bg-slate-800" />

                  {/* Date */}
                  <div className="h-5 w-4/5 rounded-lg bg-slate-800" />

                  {/* Capacity */}
                  <div className="h-5 w-3/5 rounded-lg bg-slate-800" />

                  {/* Price */}
                  <div className="h-8 w-24 rounded-lg bg-slate-800" />

                  {/* Buttons */}
                  <div className="grid grid-cols-1 gap-3 pt-4 sm:grid-cols-3">
                    <div className="h-11 rounded-xl bg-slate-800" />
                    <div className="h-11 rounded-xl bg-slate-800" />
                    <div className="h-11 rounded-xl bg-slate-800" />
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
          Unable to Load Events
        </h2>

        <p className="mt-3 max-w-md text-sm leading-6 text-slate-400 sm:text-base">
          We couldn't load your events right
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

  const events = data?.data ?? [];

  // ==========================
  // Empty State
  // ==========================
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
        {/* Icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10">
          <span className="text-3xl">
            🎫
          </span>
        </div>

        {/* Message */}
        <h2 className="mt-6 text-2xl font-bold text-white">
          No Events Yet
        </h2>

        <p className="mt-3 max-w-md text-sm leading-6 text-slate-400 sm:text-base">
          You haven't created any events yet.
          Create your first event and start
          accepting bookings.
        </p>

        {/* Action */}
        <button
          type="button"
          onClick={() =>
            navigate(
              "/dashboard/create-event"
            )
          }
          className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
        >
          Create Your First Event
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
          My Events
        </h1>

        <p className="mt-2 text-sm text-slate-400 sm:text-base">
          Manage your events and view bookings.
        </p>
      </div>

      {/* ==========================
          Events Grid
      ========================== */}
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
        {events.map((event: any) => (
          <div
            key={event._id}
            className="overflow-hidden rounded-3xl border border-slate-800 bg-[#162032]"
          >
            {/* ==========================
                Event Banner
            ========================== */}
            {event.banner ? (
              <img
                src={event.banner}
                alt={event.title}
                className="h-44 w-full object-cover sm:h-56"
              />
            ) : (
              <div className="flex h-44 items-center justify-center bg-[#0B1120] sm:h-56">
                <span className="text-sm text-slate-500">
                  No banner available
                </span>
              </div>
            )}

            {/* ==========================
                Event Details
            ========================== */}
            <div className="space-y-3 p-5 sm:p-6">
              {/* Title */}
              <h2 className="line-clamp-2 break-words text-xl font-bold text-white sm:text-2xl">
                {event.title}
              </h2>

              {/* Location */}
              <p className="break-words text-sm leading-6 text-slate-400 sm:text-base">
                📍 {event.location}
              </p>

              {/* Date */}
              <p className="break-words text-sm leading-6 text-slate-400 sm:text-base">
                📅{" "}
                {new Date(
                  event.startDateTime
                ).toLocaleString()}
              </p>

              {/* Capacity */}
              <div className="flex items-start justify-between gap-4 text-sm sm:text-base">
                <span className="text-slate-400">
                  💺 Available Seats
                </span>

                <span className="shrink-0 font-semibold text-white">
                  {event.availableSeats}/
                  {event.totalSeats}
                </span>
              </div>

              {/* Price */}
              <p className="pt-1 text-2xl font-bold text-emerald-400">
                ₹{event.price}
              </p>

              {/* ==========================
                  Action Buttons
              ========================== */}
              <div className="grid grid-cols-1 gap-3 pt-4 sm:grid-cols-3">
                {/* View Bookings */}
                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      `/dashboard/event-bookings/${event._id}`
                    )
                  }
                  className="rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 sm:py-2"
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
                  className="rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 sm:py-2"
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
                  className="rounded-xl bg-red-600 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 sm:py-2"
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