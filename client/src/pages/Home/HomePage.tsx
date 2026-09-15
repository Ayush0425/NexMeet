import Hero from "../../features/home/Hero/Hero";
import FeaturedEvents from "../../features/home/FeaturedEvents/FeaturedEvents";
import Categories from "../../features/home/Categories/Categories";
import HowItWorks from "../../features/home/HowItWorks/HowItWorks";
import Testimonials from "../../features/home/Testimonials/Testimonials";
import CTA from "../../features/home/CTA/CTA";

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <FeaturedEvents />
      <Categories />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </div>
  );
}

export default HomePage;