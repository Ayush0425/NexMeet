import ForgotPasswordForm from "../../features/auth/ForgotPasswordForm/ForgotPasswordForm";

function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0B1120] px-6">
      <div className="w-full max-w-md rounded-3xl bg-[#162032] p-8">
        <h1 className="mb-2 text-3xl font-bold text-white">
          Forgot Password
        </h1>

        <p className="mb-8 text-slate-400">
          Enter your registered email to receive a password reset link.
        </p>

        <ForgotPasswordForm />
      </div>
    </main>
  );
}

export default ForgotPasswordPage;