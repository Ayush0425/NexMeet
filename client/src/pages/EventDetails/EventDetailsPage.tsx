import { useParams } from "react-router-dom";
import {
  MapPinned,
  Share2,
} from "lucide-react";
import BookingCard from "../../features/booking/BookingCard/BookingCard";
import RelatedEvents from "../../features/eventDetails/RelatedEvents/RelatedEvents";
import { events } from "../../data/events";

function EventDetailsPage() {
  const { id } = useParams();

  const event = events.find((event) => event.id === id);

  if (!event) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0B1120]">
        <h1 className="text-3xl font-bold text-white">
          Event Not Found
        </h1>
      </main>
    );
  }

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
    <main className="min-h-screen bg-[#0B1120] py-10">
      <div className="mx-auto max-w-6xl px-6">
        {/* Banner */}
        <img
          src={event.image}
          alt={event.title}
          className="h-[450px] w-full rounded-3xl object-cover"
        />

        {/* Content */}
        <div className="mt-8">
          <span className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white">
            {event.category}
          </span>

          {/* Title + Share */}
          <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h1 className="text-5xl font-bold text-white">
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

          <div className="mt-6 space-y-3 text-lg text-slate-400">
            <p>📍 {event.location}</p>
            <p>📅 {event.date}</p>
            <p>👥 {event.attendees} Attendees</p>
            <p>⭐ {event.rating} / 5</p>
          </div>

          <h2 className="mt-8 text-4xl font-bold text-emerald-400">
            ₹{event.price}
          </h2>

          {/* About Event */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-white">
              About this Event
            </h2>

            <p className="mt-4 leading-8 text-slate-400">
              {event.description}
            </p>
          </div>

          {/* Organizer */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-white">
              Organizer
            </h2>

            <div className="mt-5 flex items-center gap-4 rounded-2xl bg-[#162032] p-5">
              <img
                src={event.organizerImage}
                alt={event.organizer}
                className="h-16 w-16 rounded-full object-cover"
              />

              <div>
                <h3 className="text-lg font-semibold text-white">
                  {event.organizer}
                </h3>

                <p className="text-slate-400">
                  {event.organizerRole}
                </p>
              </div>
            </div>
          </div>

          {/* Event Schedule */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-white">
              Event Schedule
            </h2>

            <div className="mt-5 rounded-2xl bg-[#162032] p-6">
              <div className="space-y-3 text-slate-300">
                <p>
                  <span className="font-semibold text-white">
                    Date:
                  </span>{" "}
                  {event.date}
                </p>

                <p>
                  <span className="font-semibold text-white">
                    Time:
                  </span>{" "}
                  {event.startTime} - {event.endTime}
                </p>

                <p>
                  <span className="font-semibold text-white">
                    Duration:
                  </span>{" "}
                  {event.duration}
                </p>
              </div>
            </div>
          </div>

          {/* Venue */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-white">
              Venue
            </h2>

            <div className="mt-5 rounded-2xl bg-[#162032] p-6">
              <h3 className="text-lg font-semibold text-white">
                {event.venue}
              </h3>

              <p className="mt-2 text-slate-400">
                {event.address}
              </p>
            </div>
          </div>

          {/* Event Location */}
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
                  {event.venue}
                </h3>

                <p className="mt-2 max-w-md text-center text-slate-400">
                  {event.address}
                </p>

                <button
                  className="mt-6 rounded-xl border border-emerald-500 px-6 py-3 text-emerald-400 transition hover:bg-emerald-500 hover:text-white"
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${event.venue} ${event.address}`
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

        {/* Booking Card */}
<div className="mt-12 rounded-3xl border border-emerald-500/20 bg-[#162032] p-8 shadow-xl">
  <h2 className="text-2xl font-bold text-white">
    🎟️ Book Your Ticket
  </h2>

  <div className="mt-8 space-y-5">
    <div className="flex items-center justify-between">
      <span className="text-slate-400">Price</span>
      <span className="text-3xl font-bold text-emerald-400">
        ₹{event.price}
      </span>
    </div>

    <div className="flex items-center justify-between">
      <span className="text-slate-400">Date</span>
      <span className="font-medium text-white">
        {event.date}
      </span>
    </div>

    <div className="flex items-center justify-between">
      <span className="text-slate-400">Time</span>
      <span className="font-medium text-white">
        {event.startTime} - {event.endTime}
      </span>
    </div>

    <div className="flex items-center justify-between">
      <span className="text-slate-400">Duration</span>
      <span className="font-medium text-white">
        {event.duration}
      </span>
    </div>

    <div className="flex items-center justify-between">
      <span className="text-slate-400">Attendees</span>
      <span className="font-medium text-white">
        {event.attendees}
      </span>
    </div>

    <div className="flex items-center justify-between">
      <span className="text-slate-400">Rating</span>
      <span className="font-medium text-yellow-400">
        ⭐ {event.rating}
      </span>
    </div>
  </div>

  <div className="mt-8 rounded-2xl bg-[#0B1120] p-5">
    <h3 className="mb-3 text-lg font-semibold text-white">
      Included with your ticket
    </h3>

    <div className="space-y-2 text-sm text-slate-400">
      <p>✅ Instant Booking Confirmation</p>
      <p>✅ Secure Online Payment</p>
      <p>✅ Digital Entry Pass</p>
      <p>✅ Free Cancellation within 24 Hours</p>
    </div>
  </div>

<BookingCard
  eventId={event.id}
  price={event.price}
/>
</div>

{/* Related Events */}


          {/* Related Events */}
          <RelatedEvents currentEventId={event.id} />
        </div>
      </div>
    </main>
  );
}

export default EventDetailsPage;