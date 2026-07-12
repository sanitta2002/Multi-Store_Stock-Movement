import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useAuth";
import { loginSchema, type LoginFormData } from "../validation/authValidation";
import { FRONT_ROUTES } from "../constants/frontRoutes";
import { setAuthUser } from "../store/slices/authSlice";
import { setAccessToken } from "../store/slices/tokenSlice";
import { useDispatch } from "react-redux";


export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = (data: LoginFormData) => {
    login(data, {
    onSuccess: (response) => {
      dispatch(setAuthUser(response.user));
      dispatch(setAccessToken(response.accessToken));

      toast.success("Login successful");
      navigate(FRONT_ROUTES.DASHBOARD);
      
    },
  });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
        <h1 className="text-center text-3xl font-bold text-black">
          Welcome Back
        </h1>

        <p className="mt-2 text-center text-gray-500">
          Login to your account
        </p>

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="mt-8 space-y-5"
        >
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
            className="w-full rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-gray-800 disabled:opacity-60"
          >
            {isPending ? "Signing In..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to={FRONT_ROUTES.REGISTER}
            className="font-semibold text-black hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}