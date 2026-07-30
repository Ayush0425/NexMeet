import { motion, type TargetAndTransition } from "framer-motion";
import type { ReactNode } from "react";

interface FloatingCardProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  duration?: number;
  animate?: TargetAndTransition;
}

function FloatingCard({
  icon,
  title,
  subtitle,
  duration = 4,
  animate,
}: FloatingCardProps) {
  return (
    <motion.div
      animate={
        animate ?? {
          y: [0, -12, 0],
        }
      }
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{
        scale: 1.05,
        rotate: -2,
        boxShadow: "0 25px 80px rgba(16,185,129,0.25)",
      }}
      className="relative w-64 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
    >
      {/* Glass Reflection */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-transparent" />

      {/* Icon */}
      <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
        {icon}
      </div>

      {/* Content */}
      <h3 className="relative text-lg font-semibold text-white">
        {title}
      </h3>

      <p className="relative mt-2 text-sm text-slate-400">
        {subtitle}
      </p>
    </motion.div>
  );
}

export default FloatingCard;