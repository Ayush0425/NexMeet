import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllEvents } from "../../../services/event/event.service";
import EventCard, { type EventCardProps } from "../EventCard/EventCard";

const FALLBACK_EVENTS: EventCardProps[] = [
  {
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    title: "India AI Builders & Founders Summit",
    category: "Tech",
    location: "Bengaluru, Karnataka",
    date: "Sat, Oct 24, 2026",
    availableSeats: 12,
    totalSeats: 100,
    price: 499,
  },
  {
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    title: "Indie Acoustic & Jazz Sunset Sessions",
    category: "Music",
    location: "Jaipur, Rajasthan",
    date: "Sun, Nov 08, 2026",
    availableSeats: 35,
    totalSeats: 150,
    price: 299,
  },
  {
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
    title: "Early-Stage Pitch & Angel Syndicate",
    category: "Business",
    location: "New Delhi, Delhi",
    date: "Fri, Nov 20, 2026",
    availableSeats: 18,
    totalSeats: 60,
    price: 0,
  },
];

function FeaturedEvents() {
  const { data, isLoading } = useQuery({
    queryKey: ["featured-events"],
    queryFn: getAllEvents,
    staleTime: 1000 * 60 * 5,
  });

  const rawEvents = data?.data ?? [];

  const displayEvents: EventCardProps[] =
    rawEvents.length > 0
      ? rawEvents.slice(0, 6).map((item: any) => ({
          id: item._id,
          image: item.banner || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
          title: item.title,
          category: item.category || "General",
          location: item.location || "Online",
          date: item.startDateTime
            ? new Date(item.startDateTime).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "Upcoming",
          availableSeats: item.availableSeats,
          totalSeats: item.totalSeats,
          price: item.ticketPrice === 0 ? "Free" : item.ticketPrice,
        }))
      : FALLBACK_EVENTS;

  return (
    <section className="relative border-b border-slate-200/80 bg-slate-50/70 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 mb-3">
              <Sparkles className="h-3 w-3 text-emerald-600" />
              <span>HANDPICKED FOR YOU</span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Featured Events & Experiences
            </h2>

            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
              Explore trending developer conferences, live acoustic sessions, founder roundtables, and creative showcases.
            </p>
          </div>

          <Link
            to="/events"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 shrink-0"
          >
            <span>View all upcoming events</span>
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Event Cards Grid */}
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-96 rounded-2xl border border-slate-200 bg-slate-200/60 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayEvents.map((event) => (
              <EventCard key={event.id || event.title} {...event} />
            ))}
          </div>
        )}

        {/* Bottom Discover More Action */}
        <div className="mt-14 flex flex-col items-center justify-center gap-3 text-center">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-8 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
          >
            <span>Explore All 20+ Categories & Cities</span>
            <ArrowRight className="h-4 w-4 text-emerald-600" />
          </Link>
          <p className="text-xs text-slate-500">
            Hosting your own gathering? <Link to="/dashboard/create-event" className="text-emerald-600 font-medium hover:underline">Publish in under 2 minutes →</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default FeaturedEvents;