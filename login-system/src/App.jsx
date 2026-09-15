import { Link } from 'react-router';
import './App.css';
import react from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link
            to="/"
            className="text-xl font-bold text-gray-900"
          >
            MERN Auth
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-900"
            >
              Home
            </Link>

            <Link
              to="/login"
              className="text-gray-600 hover:text-gray-900"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900">
          MERN Authentication App
        </h1>

        <p className="mt-2 text-gray-600">
          Our authentication system will be built here.
        </p>
      </main>
    </div>
  );
}

export default App;