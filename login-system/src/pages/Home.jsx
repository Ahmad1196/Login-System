import { Link } from 'react-router';
import {
  IoCheckmarkCircleOutline,
  IoShieldCheckmarkOutline,
  IoFlashOutline,
} from 'react-icons/io5';

import { useTheme } from '../contexts/ThemeContext';

function Home() {
  const { isDark } = useTheme();

  return (
    <main
      className={`min-h-[calc(100vh-64px)] transition-colors ${
        isDark
          ? 'bg-gray-800 text-white'
          : 'bg-gray-50 text-gray-900'
      }`}
    >
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div
              className={`mb-6 inline-flex items-center rounded-full border px-4 py-2 text-md ${
                isDark
                  ? 'border-gray-600 bg-gray-900 text-gray-300'
                  : 'border-gray-200 bg-white text-gray-600'
              }`}
            >
              Simple task management
            </div>

            <h1
              className={`text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl ${
                isDark
                  ? 'text-white'
                  : 'text-gray-900'
              }`}
            >
              Organize your work.
              <span
                className={`block ${
                  isDark
                    ? 'text-gray-300'
                    : 'text-gray-600'
                }`}
              >
                One task at a time.
              </span>
            </h1>

            <p
              className={`mx-auto mt-6 max-w-2xl text-base leading-7 sm:text-lg ${
                isDark
                  ? 'text-gray-400'
                  : 'text-gray-600'
              }`}
            >
              Create todo lists, manage individual tasks,
              track progress, and keep your work organized
              from one simple dashboard.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/register"
                className={`rounded-xl px-6 py-3 text-sm font-semibold transition ${
                  isDark
                    ? 'bg-white text-gray-900 hover:bg-gray-200'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                Get started
              </Link>

              <Link
                to="/login"
                className={`rounded-xl border px-6 py-3 text-sm font-semibold transition ${
                  isDark
                    ? 'border-gray-600 text-gray-200 hover:bg-gray-900'
                    : 'border-gray-300 text-gray-700 hover:bg-white'
                }`}
              >
                Sign in
              </Link>
            </div>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-3">
            <FeatureCard
              icon={<IoCheckmarkCircleOutline />}
              title="Simple organization"
              description="Create separate todo lists for different projects, goals, or areas of your life."
              isDark={isDark}
            />

            <FeatureCard
              icon={<IoFlashOutline />}
              title="Fast workflow"
              description="Add, edit, complete, and remove tasks without unnecessary navigation."
              isDark={isDark}
            />

            <FeatureCard
              icon={<IoShieldCheckmarkOutline />}
              title="Private account"
              description="Your todo lists belong to your authenticated account and stay separated from other users."
              isDark={isDark}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  isDark,
}) {
  return (
    <div
      className={`rounded-2xl border p-6 transition-colors ${
        isDark
          ? 'border-gray-700 bg-gray-900'
          : 'border-gray-200 bg-gray-100'
      }`}
    >
      <div
        className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-2xl ${
          isDark
            ? 'bg-gray-800 text-gray-200'
            : 'bg-gray-100 text-gray-700'
        }`}
      >
        {icon}
      </div>

      <h2
        className={`text-lg font-semibold ${
          isDark
            ? 'text-white'
            : 'text-gray-900'
        }`}
      >
        {title}
      </h2>

      <p
        className={`mt-2 text-sm leading-6 ${
          isDark
            ? 'text-gray-400'
            : 'text-gray-600'
        }`}
      >
        {description}
      </p>
    </div>
  );
}

export default Home;