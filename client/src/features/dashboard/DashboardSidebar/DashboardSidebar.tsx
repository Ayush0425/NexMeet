import { useState } from "react";
import {
  CalendarDays,
  CalendarPlus,
  Compass,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Menu,
  QrCode,
  Ticket,
  User,
  X,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import LogoutButton from "../../../components/common/LogoutButton/LogoutButton";
import { useAuth } from "../../../context/auth/AuthContext";

function DashboardSidebar() {
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isOrganizer = user?.role?.toLowerCase() === "organizer";

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3.5 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
      isActive
        ? "bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent"
    }`;

  return (
    <>
      {/* Mobile Top App Bar */}
      <div className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 md:hidden">
        <Link to="/" className="flex items-center gap-2">
          <CalendarDays className="h-6 w-6 text-emerald-600" />
          <span className="text-lg font-bold text-slate-900">NexMeet</span>
          <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
            {isOrganizer ? "Organizer" : "Attendee"}
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          aria-label="Open navigation menu"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu backdrop"
          onClick={closeMobileMenu}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex min-h-screen w-64 flex-col
          border-r border-slate-200
          bg-white
          transition-transform duration-300
          md:static md:z-auto md:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Brand Header */}
        <div className="border-b border-slate-100 p-5">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20 font-bold">
                <CalendarDays size={18} />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-slate-900 block leading-none">
                  Nex<span className="text-emerald-600">Meet</span>
                </span>
                <span className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider block mt-1">
                  {isOrganizer ? "Organizer Console" : "Attendee Hub"}
                </span>
              </div>
            </Link>

            <button
              type="button"
              onClick={closeMobileMenu}
              className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-800 md:hidden"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Navigation Sections */}
        <nav className="flex-1 space-y-6 overflow-y-auto px-4 py-6">
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Workspace
            </p>

            <NavLink to="/dashboard" end onClick={closeMobileMenu} className={navLinkClass}>
              <LayoutDashboard size={17} />
              <span>Overview</span>
            </NavLink>
          </div>

          {/* Organizer Routes */}
          {isOrganizer && (
            <div className="space-y-1">
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Event Tools
              </p>

              <NavLink to="/dashboard/create-event" onClick={closeMobileMenu} className={navLinkClass}>
                <CalendarPlus size={17} />
                <span>Create New Event</span>
              </NavLink>

              <NavLink to="/dashboard/my-events" onClick={closeMobileMenu} className={navLinkClass}>
                <ListChecks size={17} />
                <span>My Hosted Events</span>
              </NavLink>

              <NavLink to="/dashboard/check-in" onClick={closeMobileMenu} className={navLinkClass}>
                <QrCode size={17} />
                <span>Gate QR Scanner</span>
              </NavLink>
            </div>
          )}

          {/* Attendee Routes */}
          {!isOrganizer && (
            <div className="space-y-1">
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                My Passes
              </p>

              <NavLink to="/dashboard/my-tickets" onClick={closeMobileMenu} className={navLinkClass}>
                <Ticket size={17} />
                <span>Ticket Wallet (QR)</span>
              </NavLink>

              <NavLink to="/dashboard/my-bookings" onClick={closeMobileMenu} className={navLinkClass}>
                <ListChecks size={17} />
                <span>Order History</span>
              </NavLink>
            </div>
          )}

          {/* General Navigation */}
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Explore & Account
            </p>

            <Link
              to="/events"
              onClick={closeMobileMenu}
              className="flex items-center gap-3.5 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              <Compass size={17} />
              <span>Public Events</span>
            </Link>

            <NavLink to="/dashboard/profile" onClick={closeMobileMenu} className={navLinkClass}>
              <User size={17} />
              <span>Profile Settings</span>
            </NavLink>
          </div>
        </nav>

        {/* User Card & Logout Footer */}
        <div className="border-t border-slate-100 p-4 space-y-3 bg-slate-50">
          <div className="flex items-center gap-3 px-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-xs font-bold text-emerald-700 uppercase shrink-0">
              {user?.fullName ? user.fullName[0] : "U"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-900 truncate">{user?.fullName || "User"}</p>
              <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs text-rose-600">
            <div className="flex items-center gap-2">
              <LogOut size={15} />
              <LogoutButton />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default DashboardSidebar;