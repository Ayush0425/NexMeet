import { useState } from "react";

import {
  CalendarPlus,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Menu,
  QrCode,
  Ticket,
  User,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import LogoutButton from "../../../components/common/LogoutButton/LogoutButton";
import { useAuth } from "../../../context/auth/AuthContext";

function DashboardSidebar() {
  const { user } = useAuth();

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const isOrganizer =
    user?.role?.toLowerCase() === "organizer";

  // ==========================
  // Close Mobile Sidebar
  // ==========================
  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  // ==========================
  // Navigation Class
  // ==========================
  const navLinkClass = ({
    isActive,
  }: {
    isActive: boolean;
  }) =>
    `flex items-center gap-4 rounded-xl px-4 py-3 font-medium transition ${
      isActive
        ? "bg-emerald-500 text-white"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <>
      {/* ==========================
          Mobile Header
      ========================== */}
      <div className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-800 bg-[#0B1120] px-4 md:hidden">
        <div>
          <h1 className="text-xl font-bold text-emerald-400">
            NexMeet
          </h1>

          <p className="text-xs text-slate-400">
            {isOrganizer
              ? "Organizer Panel"
              : "User Panel"}
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setMobileOpen(true)
          }
          className="rounded-xl p-2 text-slate-300 transition hover:bg-slate-800 hover:text-white"
          aria-label="Open dashboard menu"
          aria-expanded={mobileOpen}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* ==========================
          Mobile Backdrop
      ========================== */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close dashboard menu"
          onClick={closeMobileMenu}
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
        />
      )}

      {/* ==========================
          Sidebar
      ========================== */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex min-h-screen w-64 flex-col
          border-r border-slate-800
          bg-[#0B1120]
          transition-transform duration-300
          md:static md:z-auto md:translate-x-0
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* ==========================
            Logo
        ========================== */}
        <div className="border-b border-slate-800 px-5 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-emerald-400">
                NexMeet
              </h1>

              <p className="mt-1 text-sm text-slate-400">
                {isOrganizer
                  ? "Organizer Panel"
                  : "User Panel"}
              </p>
            </div>

            {/* Mobile Close Button */}
            <button
              type="button"
              onClick={closeMobileMenu}
              className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white md:hidden"
              aria-label="Close dashboard menu"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* ==========================
            Navigation
        ========================== */}
        <nav className="flex-1 space-y-3 overflow-y-auto px-5 py-8">
          {/* Dashboard */}
          <NavLink
            to="/dashboard"
            end
            onClick={closeMobileMenu}
            className={navLinkClass}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          {/* ==========================
              Organizer Navigation
          ========================== */}
          {isOrganizer && (
            <>
              {/* Create Event */}
              <NavLink
                to="/dashboard/create-event"
                onClick={closeMobileMenu}
                className={navLinkClass}
              >
                <CalendarPlus size={20} />
                Create Event
              </NavLink>

              {/* My Events */}
              <NavLink
                to="/dashboard/my-events"
                onClick={closeMobileMenu}
                className={navLinkClass}
              >
                <ListChecks size={20} />
                My Events
              </NavLink>

              {/* Check-in */}
              <NavLink
                to="/dashboard/check-in"
                onClick={closeMobileMenu}
                className={navLinkClass}
              >
                <QrCode size={20} />
                Check-in
              </NavLink>
            </>
          )}

          {/* ==========================
              Normal User Navigation
          ========================== */}
          {!isOrganizer && (
            <>
              {/* My Bookings */}
              <NavLink
                to="/dashboard/my-bookings"
                onClick={closeMobileMenu}
                className={navLinkClass}
              >
                <Ticket size={20} />
                My Bookings
              </NavLink>

              {/* My Tickets */}
              <NavLink
                to="/dashboard/my-tickets"
                onClick={closeMobileMenu}
                className={navLinkClass}
              >
                <Ticket size={20} />
                My Tickets
              </NavLink>
            </>
          )}

          {/* Profile */}
          <NavLink
            to="/dashboard/profile"
            onClick={closeMobileMenu}
            className={navLinkClass}
          >
            <User size={20} />
            Profile
          </NavLink>
        </nav>

        {/* ==========================
            Logout
        ========================== */}
        <div className="border-t border-slate-800 p-5">
          <div className="flex items-center gap-3 text-slate-300">
            <LogOut size={20} />

            <LogoutButton />
          </div>
        </div>
      </aside>
    </>
  );
}

export default DashboardSidebar;