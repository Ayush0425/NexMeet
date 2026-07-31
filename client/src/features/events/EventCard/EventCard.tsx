import {
  CalendarDays,
  Heart,
  MapPin,
  Star,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

import type { Event } from "../../../types/event";

type EventCardProps = Event;

function EventCard({
  id,
  image,
  title,
  category,
  location,
  date,
  price,
  rating,
  attendees,
}: EventCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#162032] transition hover:scale-[1.02] hover:border-emerald-500">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="h-52 w-full object-cover"
        />

        <span className="absolute left-4 top-4 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
          {category}
        </span>

        <button className="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-white">
          <Heart size={18} />
        </button>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-white">
          {title}
        </h3>

        <div className="mt-4 space-y-3 text-slate-400">
          <div className="flex items-center gap-2">
            <CalendarDays size={18} />
            <span>{date}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={18} />
            <span>{location}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users size={18} />
            <span>{attendees} Attendees</span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-emerald-400">
              ₹{price}
            </p>

            <div className="mt-1 flex items-center gap-1">
              <Star
                size={16}
                className="fill-yellow-400 text-yellow-400"
              />
              <span className="text-sm text-slate-300">
                {rating}
              </span>
            </div>
          </div>

          <Link
            to={`/events/${id}`}
            className="rounded-xl bg-emerald-500 px-5 py-2 font-medium text-white transition hover:bg-emerald-600"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventCard;