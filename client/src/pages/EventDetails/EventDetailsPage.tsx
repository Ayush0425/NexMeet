import { useParams } from "react-router-dom";

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

          <h1 className="mt-6 text-5xl font-bold text-white">
            {event.title}
          </h1>

          <div className="mt-6 space-y-3 text-lg text-slate-400">
            <p>📍 {event.location}</p>
            <p>📅 {event.date}</p>
            <p>👥 {event.attendees} Attendees</p>
            <p>⭐ {event.rating} / 5</p>
          </div>

          <h2 className="mt-8 text-4xl font-bold text-emerald-400">
            ₹{event.price}
          </h2>

          <button className="mt-8 rounded-xl bg-emerald-500 px-8 py-4 text-lg font-semibold text-white transition hover:bg-emerald-600">
            Book Ticket
          </button>
        </div>
      </div>
    </main>
  );
}

export default EventDetailsPage;