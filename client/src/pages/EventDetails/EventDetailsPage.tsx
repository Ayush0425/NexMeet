import { useState } from "react";
import { useParams } from "react-router-dom";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import {
  MapPinned,
  Share2,
} from "lucide-react";

import { getEventById } from "../../services/event/event.service";
import { createBooking } from "../../services/booking/booking.service";

import RelatedEvents from "../../features/eventDetails/RelatedEvents/RelatedEvents";

function EventDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const [quantity, setQuantity] = useState(1);

  const queryClient = useQueryClient();

  // ==========================
  // Create Booking
  // ==========================
  const bookingMutation = useMutation({
    mutationFn: ({
      eventId,
      quantity,
    }: {
      eventId: string;
      quantity: number;
    }) => createBooking(eventId, quantity),

    onSuccess: () => {
      toast.success(
        "Event booked successfully!"
      );

      queryClient.invalidateQueries({
        queryKey: ["event", id],
      });

      setQuantity(1);
    },

    onError: (error: any) => {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to book event"
      );
    },
  });

  // ==========================
  // Get Event
  // ==========================
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["event", id],
    queryFn: () => getEventById(id!),
    enabled: !!id,
  });

  // ==========================
  // Loading Skeleton
  // ==========================
  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#0B1120] px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-7xl animate-pulse">
          {/* Banner */}
          <div className="h-64 w-full rounded-3xl bg-slate-800 sm:h-80 md:h-[420px]" />

          {/* Main Content */}
          <div className="mt-8">
            <div className="h-7 w-24 rounded-full bg-slate-800" />

            <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="h-12 w-full max-w-2xl rounded-lg bg-slate-800" />

              <div className="h-12 w-full rounded-xl bg-slate-800 md:w-36" />
            </div>

            {/* Basic Info */}
            <div className="mt-6 space-y-4">
              <div className="h-6 w-64 max-w-full rounded-lg bg-slate-800" />
              <div className="h-6 w-56 max-w-full rounded-lg bg-slate-800" />
              <div className="h-6 w-48 max-w-full rounded-lg bg-slate-800" />
              <div className="h-6 w-52 max-w-full rounded-lg bg-slate-800" />
            </div>

            {/* Price */}
            <div className="mt-8 h-12 w-32 rounded-lg bg-slate-800" />

            {/* About */}
            <div className="mt-10">
              <div className="h-8 w-48 rounded-lg bg-slate-800" />

              <div className="mt-4 space-y-3">
                <div className="h-5 w-full rounded-lg bg-slate-800" />
                <div className="h-5 w-11/12 rounded-lg bg-slate-800" />
                <div className="h-5 w-4/5 rounded-lg bg-slate-800" />
              </div>
            </div>

            {/* Organizer */}
            <div className="mt-10">
              <div className="h-8 w-32 rounded-lg bg-slate-800" />

              <div className="mt-5 flex flex-col items-center gap-4 rounded-2xl bg-[#162032] p-5 sm:flex-row sm:items-center">
                <div className="h-16 w-16 shrink-0 rounded-full bg-slate-800" />

                <div className="w-full space-y-3">
                  <div className="h-5 w-40 max-w-full rounded-lg bg-slate-800" />
                  <div className="h-4 w-52 max-w-full rounded-lg bg-slate-800" />
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="mt-10">
              <div className="h-8 w-48 rounded-lg bg-slate-800" />

              <div className="mt-5 space-y-4 rounded-2xl bg-[#162032] p-5 sm:p-6">
                <div className="h-5 w-56 max-w-full rounded-lg bg-slate-800" />
                <div className="h-5 w-48 max-w-full rounded-lg bg-slate-800" />
                <div className="h-5 w-52 max-w-full rounded-lg bg-slate-800" />
                <div className="h-5 w-48 max-w-full rounded-lg bg-slate-800" />
              </div>
            </div>

            {/* Venue */}
            <div className="mt-10">
              <div className="h-8 w-24 rounded-lg bg-slate-800" />

              <div className="mt-5 rounded-2xl bg-[#162032] p-5 sm:p-6">
                <div className="h-6 w-56 max-w-full rounded-lg bg-slate-800" />
                <div className="mt-3 h-5 w-72 max-w-full rounded-lg bg-slate-800" />
              </div>
            </div>

            {/* Location */}
            <div className="mt-10">
              <div className="h-8 w-48 rounded-lg bg-slate-800" />
              <div className="mt-5 h-64 rounded-2xl bg-slate-800 sm:h-80" />
            </div>

            {/* Booking */}
            <div className="mt-10 rounded-2xl bg-[#162032] p-5 sm:p-6">
              <div className="space-y-5">
                <div className="flex justify-between">
                  <div className="h-5 w-28 rounded-lg bg-slate-800" />
                  <div className="h-6 w-20 rounded-lg bg-slate-800" />
                </div>

                <div className="flex justify-between">
                  <div className="h-5 w-32 rounded-lg bg-slate-800" />
                  <div className="h-5 w-12 rounded-lg bg-slate-800" />
                </div>

                <div className="h-5 w-36 rounded-lg bg-slate-800" />

                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 rounded-lg bg-slate-800" />
                  <div className="h-6 w-8 rounded-lg bg-slate-800" />
                  <div className="h-11 w-11 rounded-lg bg-slate-800" />
                </div>

                <div className="flex justify-between border-t border-slate-700 pt-5">
                  <div className="h-6 w-16 rounded-lg bg-slate-800" />
                  <div className="h-8 w-24 rounded-lg bg-slate-800" />
                </div>

                <div className="h-12 w-full rounded-xl bg-slate-800" />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ==========================
  // Error
  // ==========================
  if (isError || !data?.data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0B1120] px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex max-w-md flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10">
            <span className="text-3xl">
              ⚠️
            </span>
          </div>

          <h1 className="mt-6 text-2xl font-bold text-white sm:text-3xl">
            Event Not Found
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
            The event you're looking for
            doesn't exist or could not be
            loaded.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  const event = data.data;

  // ==========================
  // Date & Time
  // ==========================
  const eventDate = new Date(
    event.startDateTime
  );

  const formattedDate =
    eventDate.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

  const formattedTime =
    eventDate.toLocaleTimeString(
      "en-IN",
      {
        hour: "numeric",
        minute: "2-digit",
      }
    );

  // ==========================
  // Share Event
  // ==========================
  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: `Check out this event: ${event.title}`,
          url,
        });
      } catch {
        // User cancelled sharing
      }
    } else {
      await navigator.clipboard.writeText(url);

      toast.success(
        "Event link copied to clipboard!"
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#0B1120] px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        {/* ==========================
            Banner
        ========================== */}
        <div className="overflow-hidden rounded-3xl border border-slate-800">
          {event.banner ? (
            <img
              src={event.banner}
              alt={event.title}
              className="h-64 w-full object-cover sm:h-80 md:h-[420px]"
            />
          ) : (
            <div className="flex h-64 items-center justify-center bg-[#162032] sm:h-80 md:h-[420px]">
              <p className="text-slate-500">
                No banner available
              </p>
            </div>
          )}
        </div>

        {/* ==========================
            Main Content
        ========================== */}
        <div className="mt-8">
          {/* Category */}
          <span className="inline-flex rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white">
            {event.category}
          </span>

          {/* Title + Share */}
          <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <h1 className="break-words text-3xl font-bold leading-tight text-white sm:text-4xl md:max-w-4xl md:text-5xl">
              {event.title}
            </h1>

            <button
              type="button"
              onClick={handleShare}
              className="flex w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-700 px-5 py-3 text-slate-300 transition hover:border-emerald-500 hover:text-emerald-400 sm:w-fit"
            >
              <Share2 size={18} />
              Share Event
            </button>
          </div>

          {/* Event Basic Info */}
          <div className="mt-6 space-y-3 text-base text-slate-400 sm:text-lg">
            <p className="break-words">
              📍 {event.location}
            </p>

            <p>
              📅 {formattedDate}
            </p>

            <p>
              🕐 {formattedTime}
            </p>

            <p>
              💺 {event.availableSeats} seats
              available
            </p>
          </div>

          {/* Price */}
          <h2 className="mt-8 text-3xl font-bold text-emerald-400 sm:text-4xl">
            ₹{event.price}
          </h2>

          {/* ==========================
              About Event
          ========================== */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-white">
              About this Event
            </h2>

            <p className="mt-4 break-words text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
              {event.description}
            </p>
          </div>

          {/* ==========================
              Organizer
          ========================== */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-white">
              Organizer
            </h2>

            <div className="mt-5 flex flex-col items-center gap-4 rounded-2xl bg-[#162032] p-5 text-center sm:flex-row sm:items-center sm:text-left">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xl font-bold text-white">
                {event.organizer?.fullName
                  ?.charAt(0)
                  ?.toUpperCase()}
              </div>

              <div className="min-w-0">
                <h3 className="break-words text-lg font-semibold text-white">
                  {event.organizer?.fullName ||
                    "Event Organizer"}
                </h3>

                <p className="mt-1 break-all text-sm text-slate-400 sm:text-base">
                  {event.organizer?.email}
                </p>
              </div>
            </div>
          </div>

          {/* ==========================
              Event Schedule
          ========================== */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-white">
              Event Schedule
            </h2>

            <div className="mt-5 rounded-2xl bg-[#162032] p-5 sm:p-6">
              <div className="space-y-4 text-sm text-slate-300 sm:text-base">
                <p>
                  <span className="font-semibold text-white">
                    Date:
                  </span>{" "}
                  {formattedDate}
                </p>

                <p>
                  <span className="font-semibold text-white">
                    Time:
                  </span>{" "}
                  {formattedTime}
                </p>

                <p>
                  <span className="font-semibold text-white">
                    Available Seats:
                  </span>{" "}
                  {event.availableSeats}
                </p>

                <p>
                  <span className="font-semibold text-white">
                    Total Seats:
                  </span>{" "}
                  {event.totalSeats}
                </p>
              </div>
            </div>
          </div>

          {/* ==========================
              Venue
          ========================== */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-white">
              Venue
            </h2>

            <div className="mt-5 rounded-2xl bg-[#162032] p-5 sm:p-6">
              <h3 className="break-words text-lg font-semibold text-white">
                {event.location}
              </h3>

              <p className="mt-2 text-sm text-slate-400 sm:text-base">
                Event venue and location
                details
              </p>
            </div>
          </div>

          {/* ==========================
              Event Location
          ========================== */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-white">
              Event Location
            </h2>

            <div className="mt-5 overflow-hidden rounded-2xl border border-slate-800 bg-[#162032]">
              <div className="flex min-h-64 flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-10 sm:min-h-80">
                <MapPinned
                  size={56}
                  className="text-emerald-400 sm:h-16 sm:w-16"
                />

                <h3 className="mt-5 break-words text-center text-xl font-semibold text-white sm:text-2xl">
                  {event.location}
                </h3>

                <button
                  type="button"
                  className="mt-6 w-full max-w-xs rounded-xl border border-emerald-500 px-5 py-3 text-emerald-400 transition hover:bg-emerald-500 hover:text-white sm:w-auto sm:max-w-none sm:px-6"
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        event.location
                      )}`,
                      "_blank"
                    )
                  }
                >
                  Open in Google Maps
                </button>
              </div>
            </div>
          </div>

          {/* ==========================
              Booking Section
          ========================== */}
          <div className="mt-10 overflow-hidden rounded-3xl border border-slate-800 bg-[#162032]">
            <div className="p-5 sm:p-6 md:p-8">
              <h2 className="text-xl font-bold text-white sm:text-2xl">
                Book Your Tickets
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Select the number of tickets
                you need.
              </p>

              {/* Ticket Price */}
              <div className="mt-6 flex items-center justify-between gap-4">
                <span className="text-sm text-slate-400 sm:text-base">
                  Ticket Price
                </span>

                <span className="text-lg font-bold text-emerald-400 sm:text-xl">
                  ₹{event.price}
                </span>
              </div>

              {/* Available Seats */}
              <div className="mt-4 flex items-center justify-between gap-4">
                <span className="text-sm text-slate-400 sm:text-base">
                  Available Seats
                </span>

                <span className="font-medium text-white">
                  {event.availableSeats}
                </span>
              </div>

              {/* Quantity */}
              <div className="mt-6">
                <label className="mb-3 block text-sm font-medium text-slate-300">
                  Number of Tickets
                </label>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((prev) =>
                        Math.max(
                          1,
                          prev - 1
                        )
                      )
                    }
                    disabled={quantity <= 1}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-700 text-xl text-white transition hover:border-emerald-500 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    -
                  </button>

                  <span className="min-w-8 text-center text-lg font-semibold text-white">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((prev) =>
                        Math.min(
                          event.availableSeats,
                          prev + 1
                        )
                      )
                    }
                    disabled={
                      quantity >=
                      event.availableSeats
                    }
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-700 text-xl text-white transition hover:border-emerald-500 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-700 pt-5">
                <span className="text-base text-slate-300 sm:text-lg">
                  Total
                </span>

                <span className="text-2xl font-bold text-emerald-400 sm:text-3xl">
                  ₹{event.price * quantity}
                </span>
              </div>

              {/* Book Now */}
              <button
                type="button"
                disabled={
                  event.availableSeats ===
                    0 ||
                  bookingMutation.isPending
                }
                onClick={() =>
                  bookingMutation.mutate({
                    eventId: event._id,
                    quantity,
                  })
                }
                className="mt-6 w-full rounded-xl bg-emerald-500 py-3.5 text-base font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50 sm:text-lg"
              >
                {bookingMutation.isPending
                  ? "Booking..."
                  : event.availableSeats ===
                    0
                  ? "Sold Out"
                  : "Book Now"}
              </button>
            </div>
          </div>

          {/* ==========================
              Related Events
          ========================== */}
          <RelatedEvents
            currentEventId={event._id}
          />
        </div>
      </div>
    </main>
  );
}

export default EventDetailsPage;