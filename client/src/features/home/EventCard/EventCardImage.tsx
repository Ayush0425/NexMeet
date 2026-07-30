import { motion } from "framer-motion";

interface EventCardImageProps {
  image: string;
  category: string;
  date: string;
}

function EventCardImage({
  image,
  category,
  date,
}: EventCardImageProps) {
  return (
    <div className="relative h-56 overflow-hidden rounded-2xl">
      {/* Image */}
      <motion.img
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.4 }}
        src={image}
        alt={category}
        className="h-full w-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Date Badge */}
      <div className="absolute left-4 top-4 rounded-xl border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-xl">
        <p className="text-sm font-semibold text-white">
          {date}
        </p>
      </div>

      {/* Category Badge */}
      <div className="absolute right-4 top-4 rounded-full bg-emerald-500 px-4 py-2">
        <p className="text-sm font-semibold text-white">
          {category}
        </p>
      </div>
    </div>
  );
}

export default EventCardImage;