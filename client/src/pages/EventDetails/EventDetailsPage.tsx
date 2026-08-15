import { useState } from "react";
import { useParams } from "react-router-dom";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

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
const bookingMutation = useMutation({
  mutationFn: ({
    eventId,
    quantity,
  }: {
    eventId: string;
    quantity: number;
  }) => createBooking(eventId, quantity),

  onSuccess: () => {
    alert("Event booked successfully!");

    queryClient.invalidateQueries({
      queryKey: ["event", id],
    });

    setQuantity(1);
  },

  onError: (error: any) => {
    console.error(error);

    alert(
      error?.response?.data?.message ||
        "Failed to book event"
    );
  },
});


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
    <main className="min-h-screen bg-[#0B1120] px-6 py-10">
      <div className="mx-auto max-w-7xl animate-pulse">
        {/* ==========================
            Banner Skeleton
        ========================== */}
        <div className="h-[420px] w-full rounded-3xl bg-slate-800" />

        {/* ==========================
            Main Content
        ========================== */}
        <div className="mt-8">
          {/* Category */}
          <div className="h-7 w-24 rounded-full bg-slate-800" />

          {/* Title + Share */}
          <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="h-12 w-3/4 rounded-lg bg-slate-800" />

            <div className="h-12 w-36 rounded-xl bg-slate-800" />
          </div>

          {/* Basic Info */}
          <div className="mt-6 space-y-4">
            <div className="h-6 w-64 rounded-lg bg-slate-800" />
            <div className="h-6 w-56 rounded-lg bg-slate-800" />
            <div className="h-6 w-48 rounded-lg bg-slate-800" />
            <div className="h-6 w-52 rounded-lg bg-slate-800" />
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

            <div className="mt-5 flex items-center gap-4 rounded-2xl bg-[#162032] p-5">
              <div className="h-16 w-16 rounded-full bg-slate-800" />

              <div className="space-y-3">
                <div className="h-5 w-40 rounded-lg bg-slate-800" />
                <div className="h-4 w-52 rounded-lg bg-slate-800" />
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="mt-10">
            <div className="h-8 w-48 rounded-lg bg-slate-800" />

            <div className="mt-5 space-y-4 rounded-2xl bg-[#162032] p-6">
              <div className="h-5 w-56 rounded-lg bg-slate-800" />
              <div className="h-5 w-48 rounded-lg bg-slate-800" />
              <div className="h-5 w-52 rounded-lg bg-slate-800" />
              <div className="h-5 w-48 rounded-lg bg-slate-800" />
            </div>
          </div>

          {/* Venue */}
          <div className="mt-10">
            <div className="h-8 w-24 rounded-lg bg-slate-800" />

            <div className="mt-5 rounded-2xl bg-[#162032] p-6">
              <div className="h-6 w-56 rounded-lg bg-slate-800" />
              <div className="mt-3 h-5 w-72 rounded-lg bg-slate-800" />
            </div>
          </div>

          {/* Event Location */}
          <div className="mt-10">
            <div className="h-8 w-48 rounded-lg bg-slate-800" />

            <div className="mt-5 h-80 rounded-2xl bg-slate-800" />
          </div>

          {/* Booking Section */}
          <div className="mt-10 rounded-2xl bg-[#162032] p-6">
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
                <div className="h-10 w-10 rounded-lg bg-slate-800" />
                <div className="h-6 w-8 rounded-lg bg-slate-800" />
                <div className="h-10 w-10 rounded-lg bg-slate-800" />
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
    <main className="min-h-screen bg-[#0B1120] px-6 py-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center text-center">
        {/* Icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10">
          <span className="text-3xl">⚠️</span>
        </div>

        {/* Message */}
        <h1 className="mt-6 text-3xl font-bold text-white">
          Event Not Found
        </h1>

        <p className="mt-3 max-w-md text-slate-400">
          The event you're looking for doesn't
          exist or could not be loaded.
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

  const formattedDate = eventDate.toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const formattedTime = eventDate.toLocaleTimeString(
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

      alert("Event link copied to clipboard!");
    }
  };

  return (
    <main className="min-h-screen bg-[#0B1120] px-6 py-10">
      <div className="mx-auto max-w-7xl">

        {/* ==========================
            Banner
        ========================== */}
        <div className="overflow-hidden rounded-3xl border border-slate-800">
          {event.banner ? (
            <img
              src={event.banner}
              alt={event.title}
              className="h-[420px] w-full object-cover"
            />
          ) : (
            <div className="flex h-[420px] items-center justify-center bg-[#162032]">
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
          <span className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white">
            {event.category}
          </span>

          {/* Title + Share */}
          <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <h1 className="text-4xl font-bold text-white md:text-5xl">
              {event.title}
            </h1>

            <button
              onClick={handleShare}
              className="flex w-fit items-center gap-2 rounded-xl border border-slate-700 px-5 py-3 text-slate-300 transition hover:border-emerald-500 hover:text-emerald-400"
            >
              <Share2 size={18} />
              Share Event
            </button>
          </div>

          {/* Event Basic Info */}
          <div className="mt-6 space-y-3 text-lg text-slate-400">

            <p>
              📍 {event.location}
            </p>

            <p>
              📅 {formattedDate}
            </p>

            <p>
              🕐 {formattedTime}
            </p>

            <p>
              💺 {event.availableSeats} seats available
            </p>

          </div>

          {/* Price */}
          <h2 className="mt-8 text-4xl font-bold text-emerald-400">
            ₹{event.price}
          </h2>

          {/* ==========================
              About Event
          ========================== */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-white">
              About this Event
            </h2>

            <p className="mt-4 leading-8 text-slate-400">
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

            <div className="mt-5 flex items-center gap-4 rounded-2xl bg-[#162032] p-5">

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-xl font-bold text-white">
                {event.organizer?.fullName
                  ?.charAt(0)
                  ?.toUpperCase()}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">
                  {event.organizer?.fullName ||
                    "Event Organizer"}
                </h3>

                <p className="text-slate-400">
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

            <div className="mt-5 rounded-2xl bg-[#162032] p-6">

              <div className="space-y-4 text-slate-300">

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

            <div className="mt-5 rounded-2xl bg-[#162032] p-6">

              <h3 className="text-lg font-semibold text-white">
                {event.location}
              </h3>

              <p className="mt-2 text-slate-400">
                Event venue and location details
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

              <div className="flex h-80 flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

                <MapPinned
                  size={64}
                  className="text-emerald-400"
                />

                <h3 className="mt-5 text-2xl font-semibold text-white">
                  {event.location}
                </h3>

                <button
                  className="mt-6 rounded-xl border border-emerald-500 px-6 py-3 text-emerald-400 transition hover:bg-emerald-500 hover:text-white"
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
<div className="mt-10 rounded-2xl bg-[#162032] p-6">

  {/* Ticket Price */}
  <div className="flex items-center justify-between">
    <span className="text-slate-400">
      Ticket Price
    </span>

    <span className="text-xl font-bold text-emerald-400">
      ₹{event.price}
    </span>
  </div>

  {/* Available Seats */}
  <div className="mt-4 flex items-center justify-between">
    <span className="text-slate-400">
      Available Seats
    </span>

    <span className="font-medium text-white">
      {event.availableSeats}
    </span>
  </div>

  {/* Quantity */}
  <div className="mt-6">
    <label className="mb-2 block text-sm font-medium text-slate-300">
      Number of Tickets
    </label>

    <div className="flex items-center gap-4">

      <button
        type="button"
        onClick={() =>
          setQuantity((prev) =>
            Math.max(1, prev - 1)
          )
        }
        disabled={quantity <= 1}
        className="h-10 w-10 rounded-lg border border-slate-700 text-xl text-white transition hover:border-emerald-500 disabled:cursor-not-allowed disabled:opacity-40"
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
          quantity >= event.availableSeats
        }
        className="h-10 w-10 rounded-lg border border-slate-700 text-xl text-white transition hover:border-emerald-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        +
      </button>

    </div>
  </div>

  {/* Total */}
  <div className="mt-6 flex items-center justify-between border-t border-slate-700 pt-5">

    <span className="text-lg text-slate-300">
      Total
    </span>

    <span className="text-2xl font-bold text-emerald-400">
      ₹{event.price * quantity}
    </span>

  </div>

  {/* Book Now */}
  <button
    type="button"
    disabled={
      event.availableSeats === 0 ||
      bookingMutation.isPending
    }
    onClick={() =>
  bookingMutation.mutate({
    eventId: event._id,
    quantity,
  })
}
    className="mt-6 w-full rounded-xl bg-emerald-500 py-3 text-lg font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
  >
    {bookingMutation.isPending
      ? "Booking..."
      : event.availableSeats === 0
      ? "Sold Out"
      : "Book Now"}
  </button>

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