import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroVisual from "./HeroVisual/HeroVisual";

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/40">
      <HeroBackground />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl items-center justify-between gap-10 px-6 py-12 sm:py-16">
        <HeroContent />

        <HeroVisual />
      </div>
    </section>
  );
}

export default Hero;