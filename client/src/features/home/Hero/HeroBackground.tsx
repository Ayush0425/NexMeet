function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Emerald Glow */}
      <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-emerald-500/20 blur-[120px]" />

      {/* Gold Glow */}
      <div className="absolute right-20 top-40 h-80 w-80 rounded-full bg-amber-400/15 blur-[140px]" />

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-400/10 blur-[160px]" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

export default HeroBackground;