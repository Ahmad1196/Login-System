import { useForm } from "react-hook-form";
import { Link } from "react-router";

import InputField from "../components/InputField";
import { CgProfile } from "react-icons/cg";

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    console.log("Registration data:", data);
  };

  return (
    <section className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden px-4 py-10 sm:px-6">

      {/* Registration Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-3xl border border-gray-100 bg-white/90 p-6 backdrop-blur-sm sm:p-8">
          {/* Profile Image */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <CgProfile size={120} />
            </div>
          </div>

          {/* Header */}
          <div className="mb-8 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
              Get started
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Create your account
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500">
              Create your account and join us today. It only takes a minute to
              get started.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <InputField
              id="name"
              label="Full name"
              placeholder="John Doe"
              registration={register("name", {
                required: "Full name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
              error={errors.name?.message}
            />

            <InputField
              id="email"
              label="Email address"
              type="email"
              placeholder="john@example.com"
              registration={register("email", {
                required: "Email address is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              error={errors.email?.message}
            />

            <InputField
              id="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              registration={register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              error={errors.password?.message}
            />

            <InputField
              id="confirmPassword"
              label="Confirm password"
              type="password"
              placeholder="Re-enter your password"
              registration={register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              error={errors.confirmPassword?.message}
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full overflow-hidden rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-whitetransition-all duration-300 hover:bg-blue-800 hover:shadow-xl hover:shadow-blue-200 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              <span className="relative z-10">
                {isSubmitting ? "Creating account..." : "Create account"}
              </span>
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-7 border-t border-gray-100 pt-6 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-600 transition-colors hover:text-blue-700 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>

        {/* Small footer text */}
        <p className="mt-6 text-center text-xs text-gray-400">
          Your information is securely handled.
        </p>
      </div>
    </section>
  );
}

export default Register;
