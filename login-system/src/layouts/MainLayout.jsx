import { Link, NavLink, Outlet } from 'react-router';
import { useTheme } from '../contexts/ThemeContext';

function MainLayout() {
  const { isDark } = useTheme();

  const navLinkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-md font-medium transition ${
      isActive ?  
        isDark ? 'bg-blue-400 text-white' : 'bg-blue-200 text-gray-800'
      : isDark ? 'text-white hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`;

  return (
    <div
      className={`min-h-screen transition-colors ${
        isDark
          ? 'bg-gray-800 text-white'
          : 'bg-gray-50 text-gray-900'
      }`}
    >
      <header
        className={`border-b ${
          isDark
            ? 'border-gray-200 bg-gray-900'
            : 'border-gray-200 bg-white'
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/">
            <div className={`text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Todo<span className="text-blue-500">App</span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <NavLink
              to="/"
              end
              className={navLinkClass}
            >
              Home
            </NavLink>

            <NavLink
              to="/login"
              className={navLinkClass}
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              className={navLinkClass}
            >
              Register
            </NavLink>
          </div>
        </nav>
      </header>

      <Outlet />
    </div>
  );
}

export default MainLayout;