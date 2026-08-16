import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";

import { useAuth } from "../../../context/auth/AuthContext";
import { loginUser } from "../../../services/auth/auth.service";

import {
  loginSchema,
  type LoginFormData,
} from "../../../validators/auth/auth.schema";

function LoginForm() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (
    data: LoginFormData
  ) => {
    try {
      const response = await loginUser(data);

      // Extract token and user
      const { token, ...user } =
        response.data;

      // Save user & token
      login(user, token);

      toast.success(
        "Login successful!"
      );

      navigate("/");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Invalid email or password"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* Email */}
      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Email
        </label>

        <input
          {...register("email")}
          type="email"
          placeholder="Enter your email"
          className="w-full rounded-xl border border-slate-700 bg-[#162032] px-4 py-3 text-white outline-none transition focus:border-emerald-500"
        />

        {errors.email && (
          <p className="mt-2 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Password
        </label>

        <input
          {...register("password")}
          type="password"
          placeholder="Enter your password"
          className="w-full rounded-xl border border-slate-700 bg-[#162032] px-4 py-3 text-white outline-none transition focus:border-emerald-500"
        />

        {errors.password && (
          <p className="mt-2 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Forgot Password */}
      <div className="flex justify-end">
        <Link
          to="/forgot-password"
          className="text-sm text-emerald-400 transition hover:text-emerald-300"
        >
          Forgot Password?
        </Link>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-emerald-500 py-3 font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting
          ? "Signing In..."
          : "Sign In"}
      </button>

      {/* Register */}
      <p className="text-center text-sm text-slate-400">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-medium text-emerald-400 hover:text-emerald-300"
        >
          Sign Up
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;