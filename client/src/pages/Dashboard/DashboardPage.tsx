import LogoutButton from "../../components/common/LogoutButton/LogoutButton";

function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#0B1120] p-10">
      <h1 className="mb-8 text-4xl font-bold text-white">
        Dashboard
      </h1>

      <LogoutButton />
    </main>
  );
}

export default DashboardPage;