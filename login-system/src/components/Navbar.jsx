import { Link, NavLink } from 'react-router';

function Navbar() {
  const getNavLinkClass = ({ isActive }) =>
    `transition-colors ${
      isActive
        ? 'font-semibold text-blue-600'
        : 'text-gray-600 hover:text-gray-900'
    }`;

  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold text-gray-900"
        >
          MERN Auth
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-4">
          <NavLink
            to="/"
            className={getNavLinkClass}
          >
            Home
          </NavLink>

          <NavLink
            to="/login"
            className={getNavLinkClass}
          >
            Login
          </NavLink>

          <NavLink
            to="/register"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            Sign Up
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;