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
      {/* ==========================
          Banner
      ========================== */}
      <div className="relative h-52 overflow-hidden sm:h-56">
        <img
          src={eventImage}
          alt={title}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />

        {/* Category */}
        <span className="absolute left-3 top-3 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white sm:left-4 sm:top-4">
          {category}
        </span>

        {/* Like Button */}
        <button
          type="button"
          onClick={() => setLiked(!liked)}
          className="absolute right-3 top-3 rounded-full bg-black/50 p-2 transition duration-300 hover:scale-110 sm:right-4 sm:top-4"
          aria-label={
            liked
              ? "Remove from favorites"
              : "Add to favorites"
          }
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

      {/* ==========================
          Content
      ========================== */}
      <div className="p-5 sm:p-6">
        {/* Title */}
        <h3 className="line-clamp-2 text-xl font-semibold text-white">
          {title}
        </h3>

        {/* Event Information */}
        <div className="mt-4 space-y-3 text-slate-400">
          {/* Date */}
          <div className="flex items-start gap-2">
            <CalendarDays
              size={18}
              className="mt-0.5 shrink-0"
            />

            <span className="min-w-0 break-words">
              {date}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-start gap-2">
            <MapPin
              size={18}
              className="mt-0.5 shrink-0"
            />

            <span className="min-w-0 break-words">
              {location}
            </span>
          </div>

          {/* Attendees */}
          <div className="flex items-center gap-2">
            <Users
              size={18}
              className="shrink-0"
            />

            <span>
              {attendees} Attendees
            </span>
          </div>
        </div>

        {/* ==========================
            Price + Rating + Button
        ========================== */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Price + Rating */}
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
            className="w-full rounded-xl bg-emerald-500 px-5 py-2.5 text-center font-medium text-white transition hover:bg-emerald-600 sm:w-auto"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventCard;