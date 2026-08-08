import {
  CalendarPlus,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Ticket,
  User,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import LogoutButton from "../../../components/common/LogoutButton/LogoutButton";
import { useAuth } from "../../../context/auth/AuthContext";

function DashboardSidebar() {
  const { user } = useAuth();

  const isOrganizer = user?.role?.toLowerCase() === "organizer";

  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-slate-800 bg-[#0B1120]">
      {/* Logo */}
      <div className="border-b border-slate-800 px-5 py-6">
        <h1 className="text-2xl font-bold text-emerald-400">
          NexMeet
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          {isOrganizer ? "Organizer Panel" : "User Panel"}
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-3 px-5 py-8">
        {/* Dashboard */}
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `flex items-center gap-4 rounded-xl px-4 py-3 font-medium transition ${
              isActive
                ? "bg-emerald-500 text-white"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`
          }
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        {/* Organizer Navigation */}
        {isOrganizer && (
          <>
            <NavLink
              to="/dashboard/create-event"
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-xl px-4 py-3 font-medium transition ${
                  isActive
                    ? "bg-emerald-500 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <CalendarPlus size={20} />
              Create Event
            </NavLink>

            <NavLink
              to="/dashboard/my-events"
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-xl px-4 py-3 font-medium transition ${
                  isActive
                    ? "bg-emerald-500 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <ListChecks size={20} />
              My Events
            </NavLink>
          </>
        )}

        {/* Normal User Navigation */}
        {!isOrganizer && (
          <NavLink
            to="/dashboard/my-bookings"
            className={({ isActive }) =>
              `flex items-center gap-4 rounded-xl px-4 py-3 font-medium transition ${
                isActive
                  ? "bg-emerald-500 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <Ticket size={20} />
            My Bookings
          </NavLink>
        )}

        {/* Profile */}
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            `flex items-center gap-4 rounded-xl px-4 py-3 font-medium transition ${
              isActive
                ? "bg-emerald-500 text-white"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`
          }
        >
          <User size={20} />
          Profile
        </NavLink>
      </nav>

      {/* Logout */}
      <div className="border-t border-slate-800 p-5">
        <div className="flex items-center gap-3 text-slate-300">
          <LogOut size={20} />
          <LogoutButton />
        </div>
      </div>
    </aside>
  );
}

export default DashboardSidebar;