import { ArrowRight, MapPin, Star, Users } from "lucide-react";
import { motion } from "framer-motion";

interface EventCardProps {
  image: string;
  title: string;
  category: string;
  location: string;
  date: string;
  rating: number;
  attendees: string;
  price: string;
}

function EventCard({
  image,
  title,
  category,
  location,
  date,
  rating,
  attendees,
  price,
}: EventCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group overflow-hidden rounded-3xl border border-slate-800 bg-[#162032]"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4 }}
          src={image}
          alt={title}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute left-4 top-4 rounded-xl border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-xl">
          <span className="text-sm font-semibold text-white">
            {date}
          </span>
        </div>

        <div className="absolute right-4 top-4 rounded-full bg-emerald-500 px-4 py-2">
          <span className="text-sm font-semibold text-white">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-5 p-6">
        <h3 className="text-2xl font-bold text-white">
          {title}
        </h3>

        <div className="flex items-center gap-2 text-slate-400">
          <MapPin size={16} className="text-emerald-400" />
          <span>{location}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star
              size={16}
              className="fill-yellow-400 text-yellow-400"
            />
            <span className="text-white">
              {rating}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Users size={16} className="text-emerald-400" />
            <span className="text-slate-300">
              {attendees}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-700 pt-5">
          <div>
            <p className="text-sm text-slate-400">
              Starting From
            </p>

            <p className="text-2xl font-bold text-white">
              {price}
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-white transition hover:bg-emerald-600">
            Book Now

            <ArrowRight
              size={18}
              className="transition group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default EventCard;