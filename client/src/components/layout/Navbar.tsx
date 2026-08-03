import { CalendarDays } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { NAV_LINKS } from "../../constants/navigation";
import { useAuth } from "../../context/auth/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B1120]/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 transition-transform duration-300 hover:scale-105"
        >
          <CalendarDays className="h-8 w-8 text-emerald-400" />

          <span className="bg-gradient-to-r from-emerald-400 to-amber-300 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
            NexMeet
          </span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-sm font-medium text-slate-300 transition-all duration-300 hover:text-emerald-400"
            >
              {link.label}
            </Link>
          ))}

          {user && (
            <Link
              to="/dashboard"
              className="text-sm font-medium text-slate-300 transition-all duration-300 hover:text-emerald-400"
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* Auth Buttons */}
        <div className="hidden items-center gap-4 md:flex">
          {!user ? (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-slate-300 transition-all duration-300 hover:text-amber-300"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-emerald-500/40"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm font-medium text-white">
                Hi, {user.fullName}
              </span>

              <button
                onClick={handleLogout}
                className="rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;