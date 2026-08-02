import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "../../../services/auth/auth.service";
import {
  loginSchema,
  type LoginFormData,
} from "../../../validators/auth/auth.schema";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
  try {
    const response = await loginUser(data);

    console.log(response);

    alert("Login Successful!");

    // Next we'll save JWT and redirect
  } catch (error) {
    console.error(error);

    alert("Invalid email or password");
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
          placeholder="Enter your email"
          className="w-full rounded-xl border border-slate-700 bg-[#162032] px-4 py-3 text-white outline-none transition focus:border-emerald-500"
        />

        {errors.email && (
          <p className="mt-2 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

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

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-emerald-500 py-3 font-semibold text-white transition hover:bg-emerald-600 disabled:opacity-50"
      >
        {isSubmitting ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
}

export default LoginForm;