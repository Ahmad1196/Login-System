import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import InputField from "../components/InputField";
import { loginUser } from "../services/authService";
import { useAuth } from '../contexts/AuthContext';
function Login() {
  const navigate = useNavigate();
  const { fetchCurrentUser } = useAuth();
  const [responseMessage, setResponseMessage] = useState("");
  const [responseType, setResponseType] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const showResponse = (message, type) => {
    setResponseMessage(message);
    setResponseType(type);
    setTimeout(() => {
      setResponseMessage("");
      setResponseType("");
    }, 2000);
  };
  const onSubmit = async (data) => {
    const response = await loginUser(data);
    reset();
    if (response.ok) {
      await fetchCurrentUser();
      showResponse(response.message, "success");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
      return;
    }
    showResponse(response.message, "error");
  };
  return (
    <>
      {" "}
      <section className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden px-4 py-10 sm:px-6">
        {" "}
        <div className="relative z-10 w-full max-w-md">
          {" "}
          <div className="rounded-3xl border border-gray-100 bg-white/90 p-6 backdrop-blur-sm sm:p-8">
            {" "}
            <div className="mb-8 text-center">
              {" "}
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
                {" "}
                Welcome back{" "}
              </p>{" "}
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {" "}
                Sign in to your account{" "}
              </h1>{" "}
              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500">
                {" "}
                Enter your credentials to continue.{" "}
              </p>{" "}
            </div>{" "}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {" "}
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
              />{" "}
              <InputField
                id="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                registration={register("password", {
                  required: "Password is required",
                })}
                error={errors.password?.message}
              />{" "}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full overflow-hidden rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {" "}
                <span className="relative z-10">
                  {" "}
                  {isSubmitting ? "Signing in..." : "Sign in"}{" "}
                </span>{" "}
              </button>{" "}
            </form>{" "}
            <div className="mt-7 border-t border-gray-100 pt-6 text-center">
              {" "}
              <p className="text-sm text-gray-500">
                {" "}
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-blue-600 transition-colors hover:text-blue-700 hover:underline"
                >
                  {" "}
                  Create account{" "}
                </Link>{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
          <p className="mt-6 text-center text-xs text-gray-400">
            {" "}
            Your information is securely handled.{" "}
          </p>{" "}
        </div>{" "}
      </section>{" "}
      <div
        className={`fixed bottom-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 transition-all duration-500 ${responseMessage ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-10 opacity-0"}`}
      >
        {" "}
        <div
          className={`rounded-xl px-5 py-4 text-center text-sm font-medium text-white shadow-xl ${responseType === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {" "}
          {responseMessage}{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
}
export default Login;
