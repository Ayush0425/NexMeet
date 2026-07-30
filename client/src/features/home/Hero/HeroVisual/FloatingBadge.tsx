import { motion } from "framer-motion";

interface FloatingBadgeProps {
  text: string;
  delay?: number;
}

function FloatingBadge({
  text,
  delay = 0,
}: FloatingBadgeProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        y: [0, -6, 0],
        scale: 1,
      }}
      transition={{
        opacity: {
          duration: 0.6,
          delay,
        },
        scale: {
          duration: 0.6,
          delay,
        },
        y: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      whileHover={{
        scale: 1.08,
        rotate: -2,
      }}
      className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-amber-300 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-colors duration-300 hover:border-emerald-400/40 hover:bg-white/15"
    >
      {text}
    </motion.div>
  );
}

export default FloatingBadge;