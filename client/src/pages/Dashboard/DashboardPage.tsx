import { Outlet } from "react-router-dom";

import DashboardSidebar from "../../features/dashboard/DashboardSidebar/DashboardSidebar";

function DashboardPage() {
  return (
    <main className="flex min-h-screen bg-[#0B1120]">
      {/* ==========================
          Sidebar
      ========================== */}
      <DashboardSidebar />

      {/* ==========================
          Main Content
      ========================== */}
      <section className="flex-1 overflow-y-auto p-10">
        <Outlet />
      </section>
    </main>
  );
}

export default DashboardPage;