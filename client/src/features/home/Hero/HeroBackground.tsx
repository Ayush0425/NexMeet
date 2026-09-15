function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
      {/* Soft Pastel Radial Glows for Light Theme */}
      <div className="absolute -top-32 left-1/4 h-[550px] w-[550px] rounded-full bg-emerald-500/8 blur-[140px]" />
      <div className="absolute top-1/3 -right-24 h-[450px] w-[450px] rounded-full bg-cyan-500/6 blur-[160px]" />
      <div className="absolute -bottom-40 left-1/3 h-[400px] w-[400px] rounded-full bg-indigo-500/5 blur-[150px]" />

      {/* Clean Grid Pattern with radial mask */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #0f172a 1px, transparent 1px),
            linear-gradient(to bottom, #0f172a 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 85%)",
        }}
      />
    </div>
  );
}

export default HeroBackground;