function Login() {
  return (
    <section className="flex min-h-[calc(100vh-100px)] items-center justify-center py-8">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-900 sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Login
        </h1>

        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Enter your credentials to access your account.
        </p>
      </div>
    </section>
  );
}

export default Login;
