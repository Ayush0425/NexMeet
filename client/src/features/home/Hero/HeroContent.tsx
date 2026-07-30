import { ArrowRight, CalendarPlus } from "lucide-react";
import { motion } from "framer-motion";

function HeroContent() {
  return (
    <div className="max-w-2xl space-y-8">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300">
        <CalendarPlus className="h-4 w-4" />
        Discover Amazing Events Near You
      </div>

      {/* Heading */}
      <div className="space-y-4">
        <h1 className="text-5xl font-extrabold leading-tight text-white lg:text-7xl">
          Experience Events
          <span className="block bg-gradient-to-r from-emerald-400 to-amber-300 bg-clip-text text-transparent">
            Like Never Before
          </span>
        </h1>

        <p className="max-w-xl text-lg leading-8 text-slate-400">
          Discover concerts, hackathons, workshops, conferences, and meetups
          all in one place. Book instantly and never miss an unforgettable
          experience.
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-4">
        <button className="flex items-center gap-2 rounded-xl bg-emerald-500 px-7 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-400">
          Explore Events
          <ArrowRight className="h-5 w-5" />
        </button>
        <motion.div
  initial={{ opacity: 0, x: -60 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{
    duration: 0.8,
    ease: "easeOut",
  }}
>
  {/* Your HeroContent JSX */}
</motion.div>

        <button className="rounded-xl border border-amber-400 px-7 py-4 font-semibold text-amber-300 transition-all duration-300 hover:bg-amber-400 hover:text-black">
          Become Organizer
        </button>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-10 pt-6">
        <div>
          <h3 className="text-3xl font-bold text-emerald-400">500+</h3>
          <p className="text-slate-400">Events Hosted</p>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-emerald-400">15K+</h3>
          <p className="text-slate-400">Active Users</p>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-emerald-400">25+</h3>
          <p className="text-slate-400">Cities Covered</p>
        </div>
      </div>
    </div>
  );
}

export default HeroContent;