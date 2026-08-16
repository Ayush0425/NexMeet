import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";

import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "../../../validators/auth/auth.schema";

import { forgotPassword } from "../../../services/auth/auth.service";

function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(
      forgotPasswordSchema
    ),
  });

  const onSubmit = async (
    data: ForgotPasswordFormData
  ) => {
    try {
      const response =
        await forgotPassword(data);

      toast.success(
        response.message ||
          "Reset link sent successfully!"
      );
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
          Email
        </label>

        <input
          {...register("email")}
          type="email"
          placeholder="Enter your registered email"
          className="w-full rounded-xl border border-slate-700 bg-[#162032] px-4 py-3 text-white outline-none transition focus:border-emerald-500"
        />

        {errors.email && (
          <p className="mt-2 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-emerald-500 py-3 font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting
          ? "Sending..."
          : "Send Reset Link"}
      </button>
    </form>
  );
}

export default ForgotPasswordForm;