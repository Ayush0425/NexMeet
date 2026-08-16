import { useAuth } from "../../context/auth/AuthContext";

function ProfilePage() {
  const { user } = useAuth();

  // ==========================
  // Loading
  // ==========================
  if (!user) {
    return (
      <div className="flex min-h-[300px] items-center justify-center px-4 text-center text-slate-400">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl space-y-6 sm:space-y-8">
      {/* ==========================
          Header
      ========================== */}
      <div>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          My Profile
        </h1>

        <p className="mt-2 text-sm text-slate-400 sm:text-base">
          View your account information.
        </p>
      </div>

      {/* ==========================
          Profile Card
      ========================== */}
      <div className="rounded-3xl border border-slate-800 bg-[#162032] p-5 sm:p-8">
        {/* ==========================
            Avatar + Basic Info
        ========================== */}
        <div className="mb-8 flex flex-col items-center gap-4 text-center sm:flex-row sm:gap-5 sm:text-left">
          {/* Avatar */}
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-3xl font-bold text-white">
            {user.fullName
              ?.charAt(0)
              .toUpperCase()}
          </div>

          {/* Name */}
          <div className="min-w-0">
            <h2 className="break-words text-2xl font-bold text-white">
              {user.fullName}
            </h2>

            <p className="mt-1 break-all text-sm text-slate-400 sm:text-base">
              @{user.username}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-8 border-t border-slate-800" />

        {/* ==========================
            User Information
        ========================== */}
        <div className="space-y-6">
          {/* Full Name */}
          <div>
            <p className="text-sm text-slate-400">
              Full Name
            </p>

            <p className="mt-1 break-words text-base font-medium text-white sm:text-lg">
              {user.fullName}
            </p>
          </div>

          {/* Username */}
          <div>
            <p className="text-sm text-slate-400">
              Username
            </p>

            <p className="mt-1 break-all text-base font-medium text-white sm:text-lg">
              @{user.username}
            </p>
          </div>

          {/* Email */}
          <div>
            <p className="text-sm text-slate-400">
              Email
            </p>

            <p className="mt-1 break-all text-base font-medium text-white sm:text-lg">
              {user.email}
            </p>
          </div>

          {/* Role */}
          <div>
            <p className="text-sm text-slate-400">
              Account Type
            </p>

            <span className="mt-2 inline-block rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-medium capitalize text-emerald-400">
              {user.role}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;