import { useAuth } from "../../context/auth/AuthContext";

function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="py-10 text-center text-slate-400">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-8">
      {/* ==========================
          Header
      ========================== */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          My Profile
        </h1>

        <p className="mt-2 text-slate-400">
          View your account information.
        </p>
      </div>

      {/* ==========================
          Profile Card
      ========================== */}
      <div className="rounded-3xl border border-slate-800 bg-[#162032] p-8">
        {/* Avatar */}
        <div className="mb-8 flex items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-3xl font-bold text-white">
            {user.fullName
              ?.charAt(0)
              .toUpperCase()}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">
              {user.fullName}
            </h2>

            <p className="text-slate-400">
              @{user.username}
            </p>
          </div>
        </div>

        {/* User Information */}
        <div className="space-y-5">
          {/* Full Name */}
          <div>
            <p className="text-sm text-slate-400">
              Full Name
            </p>

            <p className="mt-1 text-lg font-medium text-white">
              {user.fullName}
            </p>
          </div>

          {/* Username */}
          <div>
            <p className="text-sm text-slate-400">
              Username
            </p>

            <p className="mt-1 text-lg font-medium text-white">
              @{user.username}
            </p>
          </div>

          {/* Email */}
          <div>
            <p className="text-sm text-slate-400">
              Email
            </p>

            <p className="mt-1 text-lg font-medium text-white">
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