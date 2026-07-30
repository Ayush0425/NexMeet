import { MapPin, Star, Users } from "lucide-react";

interface EventCardContentProps {
  title: string;
  location: string;
  rating: number;
  attendees: string;
  description: string;
}

function EventCardContent({
  title,
  location,
  rating,
  attendees,
  description,
}: EventCardContentProps) {
  return (
    <div className="space-y-4 p-5">
      {/* Title */}
      <h3 className="text-xl font-bold text-white">
        {title}
      </h3>

      {/* Location */}
      <div className="flex items-center gap-2 text-slate-400">
        <MapPin size={16} className="text-emerald-400" />
        <span className="text-sm">{location}</span>
      </div>

      {/* Rating + Attendees */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Star
            size={16}
            className="fill-yellow-400 text-yellow-400"
          />
          <span className="text-sm font-medium text-white">
            {rating}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Users size={16} className="text-emerald-400" />
          <span className="text-sm text-slate-300">
            {attendees}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm leading-6 text-slate-400">
        {description}
      </p>
    </div>
  );
}

export default EventCardContent;