import {
  CalendarPlus,
  LayoutDashboard,
  ListChecks,
  LogOut,
  User,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import LogoutButton from "../../../components/common/LogoutButton/LogoutButton";

const menuItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Create Event",
    path: "/dashboard/create-event",
    icon: CalendarPlus,
  },
  {
    title: "My Events",
    path: "/dashboard/my-events",
    icon: ListChecks,
  },
  {
    title: "Profile",
    path: "/dashboard/profile",
    icon: User,
  },
];

function DashboardSidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-800 bg-[#111827]">
      {/* Logo */}
      <div className="border-b border-slate-800 px-8 py-6">
        <h1 className="text-3xl font-bold text-emerald-400">
          NexMeet
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Organizer Panel
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-3 px-5 py-8">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-xl px-4 py-3 font-medium transition ${
                  isActive
                    ? "bg-emerald-500 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={20} />
              {item.title}
            </NavLink>
          );
        })}
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