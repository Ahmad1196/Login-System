function Home() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Welcome to MERN Auth
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
          A full-stack authentication application built with
          React, Express, MongoDB and Node.js.
        </p>
      </div>
    </section>
  );
}

export default Home;