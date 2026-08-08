import { useState } from "react";

import {
  CalendarDays,
  Heart,
  MapPin,
  Star,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";

import type { Event } from "../../../types/event";

type EventCardProps = Event & {
  _id?: string;
  banner?: string;
};

function EventCard({
  id,
  _id,
  image,
  banner,
  title,
  category,
  location,
  date,
  price,
  rating,
  attendees,
}: EventCardProps) {
  const [liked, setLiked] = useState(false);

  const eventId = _id ?? id;
  const eventImage = banner ?? image;

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-800 bg-[#162032]">
      {/* Banner */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={eventImage}
          alt={title}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />

        {/* Category */}
        <span className="absolute left-4 top-4 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
          {category}
        </span>

        {/* Like Button */}
        <button
          type="button"
          onClick={() => setLiked(!liked)}
          className="absolute right-4 top-4 rounded-full bg-black/50 p-2 transition duration-300 hover:scale-110"
        >
          <Heart
            size={18}
            className={`transition duration-300 ${
              liked
                ? "fill-red-500 text-red-500"
                : "text-white"
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white">
          {title}
        </h3>

        <div className="mt-4 space-y-3 text-slate-400">
          {/* Date */}
          <div className="flex items-center gap-2">
            <CalendarDays size={18} />
            <span>{date}</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2">
            <MapPin size={18} />
            <span>{location}</span>
          </div>

          {/* Attendees */}
          <div className="flex items-center gap-2">
            <Users size={18} />
            <span>{attendees} Attendees</span>
          </div>
        </div>

        {/* Price + Rating */}
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

          {/* View Details */}
          <Link
            to={`/events/${eventId}`}
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