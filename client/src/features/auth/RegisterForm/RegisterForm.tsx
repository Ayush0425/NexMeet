import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  registerSchema,
  type RegisterFormData,
} from "../../../validators/auth/auth.schema";

import { registerUser } from "../../../services/auth/auth.service";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // Remove confirmPassword before sending to backend
      const { confirmPassword, ...payload } = data;

      const response = await registerUser(payload);

      console.log(response);

      alert("Registration Successful!");
    } catch (error: any) {
      console.error(error);

      console.log(error.response?.data);

      alert(error.response?.data?.message || "Registration Failed!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* Full Name */}
      <div>
        <label className="mb-2 block text-slate-300">
          Full Name
        </label>

        <input
          {...register("fullName")}
          className="w-full rounded-xl border border-slate-700 bg-[#162032] px-4 py-3 text-white outline-none transition focus:border-emerald-500"
          placeholder="Enter your full name"
        />

        {errors.fullName && (
          <p className="mt-1 text-sm text-red-500">
            {errors.fullName.message}
          </p>
        )}
      </div>

      {/* Username */}
      <div>
        <label className="mb-2 block text-slate-300">
          Username
        </label>

        <input
          {...register("username")}
          className="w-full rounded-xl border border-slate-700 bg-[#162032] px-4 py-3 text-white outline-none transition focus:border-emerald-500"
          placeholder="Choose a username"
        />

        {errors.username && (
          <p className="mt-1 text-sm text-red-500">
            {errors.username.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="mb-2 block text-slate-300">
          Email
        </label>

        <input
          {...register("email")}
          type="email"
          className="w-full rounded-xl border border-slate-700 bg-[#162032] px-4 py-3 text-white outline-none transition focus:border-emerald-500"
          placeholder="Enter your email"
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="mb-2 block text-slate-300">
          Password
        </label>

        <input
          {...register("password")}
          type="password"
          className="w-full rounded-xl border border-slate-700 bg-[#162032] px-4 py-3 text-white outline-none transition focus:border-emerald-500"
          placeholder="Enter your password"
        />

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label className="mb-2 block text-slate-300">
          Confirm Password
        </label>

        <input
          {...register("confirmPassword")}
          type="password"
          className="w-full rounded-xl border border-slate-700 bg-[#162032] px-4 py-3 text-white outline-none transition focus:border-emerald-500"
          placeholder="Confirm your password"
        />

        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-emerald-500 py-3 font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting
          ? "Creating Account..."
          : "Create Account"}
      </button>
    </form>
  );
}

export default RegisterForm;