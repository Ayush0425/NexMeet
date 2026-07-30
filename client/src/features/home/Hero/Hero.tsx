import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroVisual from "./HeroVisual";

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <HeroBackground />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] max-w-7xl items-center justify-between px-6">
        <HeroContent />

        <HeroVisual />
      </div>
    </section>
  );
}

export default Hero;