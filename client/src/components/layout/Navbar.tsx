import { useState } from "react";

import {
  CalendarDays,
  Menu,
  X,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { NAV_LINKS } from "../../constants/navigation";
import { useAuth } from "../../context/auth/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  // ==========================
  // Logout
  // ==========================
  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B1120]/80 backdrop-blur-xl">
      <nav className="relative mx-auto flex h-24 max-w-7xl items-center justify-between px-6">
        {/* ==========================
            Logo
        ========================== */}
        <Link
          to="/"
          onClick={() =>
            setMobileMenuOpen(false)
          }
          className="flex items-center gap-3 transition-transform duration-300 hover:scale-105"
        >
          <CalendarDays className="h-8 w-8 text-emerald-400" />

          <span className="bg-gradient-to-r from-emerald-400 to-amber-300 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
            NexMeet
          </span>
        </Link>

        {/* ==========================
            Desktop Navigation
        ========================== */}
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

        {/* ==========================
            Desktop Auth Buttons
        ========================== */}
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
                type="button"
                onClick={handleLogout}
                className="rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* ==========================
            Mobile Menu Button
        ========================== */}
        <button
          type="button"
          onClick={() =>
            setMobileMenuOpen(
              (prev) => !prev
            )
          }
          className="rounded-xl p-2 text-slate-300 transition hover:bg-white/10 hover:text-emerald-400 md:hidden"
          aria-label={
            mobileMenuOpen
              ? "Close menu"
              : "Open menu"
          }
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X className="h-7 w-7" />
          ) : (
            <Menu className="h-7 w-7" />
          )}
        </button>

        {/* ==========================
            Mobile Menu
        ========================== */}
        {mobileMenuOpen && (
          <div className="absolute left-0 right-0 top-24 border-b border-white/10 bg-[#0B1120] px-6 py-6 shadow-xl md:hidden">
            <div className="flex flex-col gap-5">
              {/* Navigation Links */}
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className="text-base font-medium text-slate-300 transition hover:text-emerald-400"
                >
                  {link.label}
                </Link>
              ))}

              {/* Dashboard */}
              {user && (
                <Link
                  to="/dashboard"
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className="text-base font-medium text-slate-300 transition hover:text-emerald-400"
                >
                  Dashboard
                </Link>
              )}

              {/* Auth */}
              <div className="border-t border-white/10 pt-5">
                {!user ? (
                  <div className="flex flex-col gap-3">
                    <Link
                      to="/login"
                      onClick={() =>
                        setMobileMenuOpen(false)
                      }
                      className="rounded-xl border border-slate-700 px-5 py-3 text-center text-sm font-medium text-slate-300 transition hover:border-emerald-500 hover:text-emerald-400"
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      onClick={() =>
                        setMobileMenuOpen(false)
                      }
                      className="rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-5 py-3 text-center text-sm font-semibold text-white"
                    >
                      Sign Up
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <span className="text-sm font-medium text-white">
                      Hi, {user.fullName}
                    </span>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;