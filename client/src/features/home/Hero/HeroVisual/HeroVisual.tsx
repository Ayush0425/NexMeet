import { CalendarDays, MapPin, Music4 } from "lucide-react";
import { motion } from "framer-motion";

import FloatingBadge from "./FloatingBadge";
import FloatingCard from "./FloatingCard";

function HeroVisual() {
  return (
    <div className="relative hidden h-[620px] flex-1 items-center justify-center overflow-hidden lg:flex">
      {/* Hero Entrance */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="relative h-full w-full"
      >
        {/* Background Glow */}
        <div className="absolute left-1/3 top-1/3 h-72 w-72 rounded-full bg-emerald-500/5 blur-[120px]" />
        <div className="absolute right-1/4 bottom-20 h-72 w-72 rounded-full bg-amber-400/5 blur-[120px]" />

        {/* Decorative Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[58%] top-20 h-4 w-4 rounded-full bg-emerald-400"
        />

        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-24 bottom-32 h-3 w-3 rounded-full bg-amber-300"
        />

        {/* ---------------- Music ---------------- */}
        <div className="absolute top-16 right-24 z-20">
          <FloatingCard
            icon={<Music4 size={24} />}
            title="Music Festival"
            subtitle="12 Aug • Jaipur"
            duration={5}
          />
        </div>

        {/* ---------------- Hackathon ---------------- */}
        <div className="absolute top-52 right-56 z-10">
          <FloatingCard
            icon={<CalendarDays size={22} />}
            title="Hackathon"
            subtitle="Registration Open"
            duration={3.8}
          />
        </div>

        {/* ---------------- Startup ---------------- */}
        <div className="absolute bottom-6 right-10 z-10">
          <FloatingCard
            icon={<MapPin size={22} />}
            title="Startup Meetup"
            subtitle="Jaipur, Rajasthan"
            duration={4.5}
          />
        </div>

        {/* ---------------- Badges ---------------- */}

        <div className="absolute top-10 right-6">
          <FloatingBadge text="🎟️ 2500+ Attendees" delay={0.2} />
        </div>

     <div className="absolute bottom-20 right-[380px] z-30">
  <FloatingBadge text="⭐ 4.9 Rating" delay={0.4} />
</div>
      </motion.div>
    </div>
  );
}

export default HeroVisual;