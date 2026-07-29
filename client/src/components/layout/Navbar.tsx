import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import Container from "./Container";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold"
          >
            <CalendarDays className="h-7 w-7 text-violet-500" />
            <span className="font-['Space_Grotesk']">
              NexMeet
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden gap-8 md:flex">
            <Link to="/" className="hover:text-violet-400 transition">
              Home
            </Link>

            <Link to="/events" className="hover:text-violet-400 transition">
              Events
            </Link>

            <Link to="/login" className="hover:text-violet-400 transition">
              Login
            </Link>
          </nav>

          {/* CTA */}
          <Link
            to="/register"
            className="rounded-xl bg-violet-600 px-5 py-2 font-medium transition hover:bg-violet-500"
          >
            Get Started
          </Link>
        </div>
      </Container>
    </header>
  );
}

export default Navbar;