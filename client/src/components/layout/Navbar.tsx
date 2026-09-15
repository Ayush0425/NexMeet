import { useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  PlusCircle,
  Ticket,
  User,
  X,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { NAV_LINKS } from "../../constants/navigation";
import { useAuth } from "../../context/auth/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    navigate("/login");
  };

  const isOrganizer = user?.role?.toLowerCase() === "organizer";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl transition-colors">
      <nav className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-2.5 transition-transform hover:scale-[1.02]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20 font-bold">
            <CalendarDays className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            Nex<span className="text-emerald-600">Meet</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.label}
              to={link.href}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive ? "text-emerald-600 font-semibold" : "text-slate-600 hover:text-slate-900"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {user && (
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-100/80 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-200 hover:text-slate-900"
            >
              <LayoutDashboard size={14} className="text-emerald-600" />
              Dashboard
            </Link>
          )}
        </div>

        {/* Desktop Auth Section */}
        <div className="hidden items-center gap-3 md:flex">
          {!user ? (
            <>
              <Link
                to="/login"
                className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
              >
                Sign In
              </Link>

              <Link
                to="/register"
                className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition hover:bg-emerald-500 active:scale-95"
              >
                Get Started
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-xs font-bold text-emerald-700 uppercase">
                  {user.fullName ? user.fullName[0] : "U"}
                </div>
                <div className="text-left">
                  <span className="block text-xs font-semibold text-slate-900 leading-none">
                    {user.fullName}
                  </span>
                  <span className="block text-[10px] text-emerald-600 font-medium capitalize">
                    {user.role}
                  </span>
                </div>
                <ChevronDown size={14} className="text-slate-400 ml-1" />
              </button>

              {/* User Dropdown */}
              {userDropdownOpen && (
                <div
                  onMouseLeave={() => setUserDropdownOpen(false)}
                  className="absolute right-0 mt-2 w-52 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl animate-in fade-in zoom-in-95 duration-150 z-50"
                >
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="text-xs font-semibold text-slate-900 truncate">{user.fullName}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                  </div>

                  <Link
                    to="/dashboard"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
                  >
                    <LayoutDashboard size={15} className="text-emerald-600" />
                    Dashboard
                  </Link>

                  {isOrganizer ? (
                    <Link
                      to="/dashboard/create-event"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
                    >
                      <PlusCircle size={15} className="text-emerald-600" />
                      Create Event
                    </Link>
                  ) : (
                    <Link
                      to="/dashboard/my-tickets"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
                    >
                      <Ticket size={15} className="text-emerald-600" />
                      My Tickets
                    </Link>
                  )}

                  <Link
                    to="/dashboard/profile"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  >
                    <User size={15} className="text-slate-500" />
                    Profile Settings
                  </Link>

                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition"
                    >
                      <LogOut size={15} />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 md:hidden"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Mobile Menu Panel */}
        {mobileMenuOpen && (
          <div className="absolute left-0 right-0 top-20 border-b border-slate-200 bg-white/95 px-6 py-6 shadow-2xl backdrop-blur-2xl md:hidden z-50">
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-slate-700 hover:text-emerald-600"
                >
                  {link.label}
                </Link>
              ))}

              {user && (
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-emerald-600"
                >
                  Dashboard Overview
                </Link>
              )}

              <div className="border-t border-slate-200 pt-4">
                {!user ? (
                  <div className="flex flex-col gap-3">
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="rounded-xl border border-slate-300 py-3 text-center text-sm font-medium text-slate-800"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="rounded-xl bg-emerald-600 py-3 text-center text-sm font-semibold text-white shadow-sm"
                    >
                      Create Free Account
                    </Link>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{user.fullName}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-100"
                    >
                      Sign Out
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