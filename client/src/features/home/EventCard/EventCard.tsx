import { ArrowRight, Calendar, MapPin, Sparkles, Users } from "lucide-react";
import { Link } from "react-router-dom";

export interface EventCardProps {
  id?: string;
  image: string;
  title: string;
  category: string;
  location: string;
  date: string;
  rating?: number;
  attendees?: string;
  availableSeats?: number;
  totalSeats?: number;
  price: string | number;
}

function EventCard({
  id,
  image,
  title,
  category,
  location,
  date,
  availableSeats,
  totalSeats,
  price,
}: EventCardProps) {
  const targetUrl = id ? `/events/${id}` : "/events";
  const displayPrice = typeof price === "number" ? (price === 0 ? "Free" : `₹${price}`) : price;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/80">
      {/* Event Image Banner */}
      <Link to={targetUrl} className="relative block h-52 w-full overflow-hidden bg-slate-100">
        <img
          src={image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-3 right-3 rounded-full border border-slate-200/80 bg-white/95 px-3 py-1 text-xs font-semibold text-emerald-700 backdrop-blur-md shadow-sm">
          {category}
        </div>

        {/* Date Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg border border-slate-200/80 bg-white/95 px-2.5 py-1 text-xs font-medium text-slate-800 backdrop-blur-md shadow-sm">
          <Calendar className="h-3.5 w-3.5 text-emerald-600" />
          <span>{date}</span>
        </div>
      </Link>

      {/* Card Body */}
      <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
        <div className="space-y-2.5">
          <Link to={targetUrl} className="block">
            <h3 className="line-clamp-1 text-lg font-bold text-slate-900 transition group-hover:text-emerald-600">
              {title}
            </h3>
          </Link>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <MapPin className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">{location}</span>
          </div>

          {totalSeats ? (
            <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
              <span className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-slate-400" />
                Capacity
              </span>
              <span className="font-semibold text-emerald-700">
                {availableSeats} / {totalSeats} spots left
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-amber-600 font-medium pt-1">
              <Sparkles className="h-3 w-3" />
              <span>Confirmed RSVP • Instant Ticket</span>
            </div>
          )}
        </div>

        {/* Footer with Price & Link */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Pass Price</p>
            <p className="text-xl font-bold text-slate-900">{displayPrice}</p>
          </div>

          <Link
            to={targetUrl}
            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-emerald-600/20 transition hover:bg-emerald-500 active:scale-95"
          >
            <span>View Details</span>
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventCard;