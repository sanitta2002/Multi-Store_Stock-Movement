import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { useUserSignUp } from "../hooks/useAuth";
import {
  signupSchema,
  type SignupFormData,
} from "../validation/authValidation";
import { useNavigate } from "react-router-dom";
import { FRONT_ROUTES } from "../constants/frontRoutes";

export default function Register() {
  const { mutate: signup, isPending } = useUserSignUp();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleSignup = (data: SignupFormData) => {
    signup(data, {
      onSuccess: () => {
        toast.success("Registration successful");
        reset();
      },
      onError: (error) => {
        toast.error(
          error?.message || "Email already registered"
        );
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
        <h1 className="text-center text-3xl font-bold text-black">
          Create Account
        </h1>

        <p className="mt-2 text-center text-gray-500">
          Register to continue
        </p>

        <form
          onSubmit={handleSubmit(handleSignup)}
          className="mt-8 space-y-5"
        >
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-black">
              Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              {...register("name")}
              className={`w-full rounded-lg border px-4 py-3 outline-none transition ${
                errors.name
                  ? "border-red-500"
                  : "border-gray-300 focus:border-black"
              }`}
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-black">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className={`w-full rounded-lg border px-4 py-3 outline-none transition ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 focus:border-black"
              }`}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-black">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className={`w-full rounded-lg border px-4 py-3 outline-none transition ${
                errors.password
                  ? "border-red-500"
                  : "border-gray-300 focus:border-black"
              }`}
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button
           onClick={() => navigate(FRONT_ROUTES.LOGIN)}
            type="button"
            className="font-semibold text-black hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}