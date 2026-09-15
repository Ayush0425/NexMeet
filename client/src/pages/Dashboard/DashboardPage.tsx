import { Outlet } from "react-router-dom";
import DashboardSidebar from "../../features/dashboard/DashboardSidebar/DashboardSidebar";

function DashboardPage() {
  return (
    <main className="flex min-h-screen bg-[#f8fafc] text-slate-900">
      {/* Sidebar Navigation */}
      <DashboardSidebar />

      {/* Main Dashboard Canvas */}
      <section className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-8 sm:py-8">
          <Outlet />
        </div>
      </section>
    </main>
  );
}

export default DashboardPage;