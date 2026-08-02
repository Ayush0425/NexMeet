import RegisterForm from "../../features/auth/RegisterForm/RegisterForm";

function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0B1120] px-6">
      <div className="w-full max-w-md rounded-3xl bg-[#162032] p-8">
        <h1 className="mb-2 text-3xl font-bold text-white">
          Create Account
        </h1>

        <p className="mb-8 text-slate-400">
          Join NexMeet and start discovering amazing events.
        </p>

        <RegisterForm />
      </div>
    </main>
  );
}

export default RegisterPage;