import ResetPasswordForm from "../../features/auth/ResetPasswordForm/ResetPasswordForm";

function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0B1120] px-6">
      <div className="w-full max-w-md rounded-3xl bg-[#162032] p-8">
        <h1 className="mb-2 text-3xl font-bold text-white">
          Reset Password
        </h1>

        <p className="mb-8 text-slate-400">
          Enter your new password below.
        </p>

        <ResetPasswordForm />
      </div>
    </main>
  );
}

export default ResetPasswordPage;