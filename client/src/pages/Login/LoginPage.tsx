import LoginForm from "../../features/auth/LoginForm/LoginForm";

function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0B1120] px-6">
      <div className="w-full max-w-md rounded-3xl bg-[#162032] p-8">
        <h1 className="mb-2 text-3xl font-bold text-white">
          Welcome Back
        </h1>

        <p className="mb-8 text-slate-400">
          Sign in to continue to NexMeet.
        </p>

        <LoginForm />
      </div>
    </main>
  );
}

export default LoginPage;