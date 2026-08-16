import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";

import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "../../../validators/auth/auth.schema";

import { resetPassword } from "../../../services/auth/auth.service";

function ResetPasswordForm() {
  const navigate = useNavigate();

  const { token } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(
      resetPasswordSchema
    ),
  });

  const onSubmit = async (
    data: ResetPasswordFormData
  ) => {
    try {
      if (!token) {
        toast.error("Invalid reset link");
        return;
      }

      await resetPassword(token, {
        password: data.password,
      });

      toast.success(
        "Password reset successful!"
      );

      navigate("/login");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div>
        <label className="mb-2 block text-sm text-slate-300">
          New Password
        </label>

        <input
          {...register("password")}
          type="password"
          placeholder="Enter new password"
          className="w-full rounded-xl border border-slate-700 bg-[#162032] px-4 py-3 text-white outline-none focus:border-emerald-500"
        />

        {errors.password && (
          <p className="mt-2 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Confirm Password
        </label>

        <input
          {...register("confirmPassword")}
          type="password"
          placeholder="Confirm new password"
          className="w-full rounded-xl border border-slate-700 bg-[#162032] px-4 py-3 text-white outline-none focus:border-emerald-500"
        />

        {errors.confirmPassword && (
          <p className="mt-2 text-sm text-red-500">
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
          ? "Resetting..."
          : "Reset Password"}
      </button>
    </form>
  );
}

export default ResetPasswordForm;