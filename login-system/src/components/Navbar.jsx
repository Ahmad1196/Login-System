import { useState } from 'react';
import { Link, NavLink } from 'react-router';

import { CiLight } from 'react-icons/ci';
import { MdNightlight } from 'react-icons/md';
import { IoMenu } from 'react-icons/io5';
import { FaReact } from "react-icons/fa";
import { IoLogoPlaystation } from "react-icons/io";

function Navbar({ theme, toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getNavLinkClass = ({ isActive }) =>
    `transition-colors ${
      isActive
        ? 'font-semibold text-blue-600'
        : 'text-gray-100 hover:text-gray-300'
    }`;

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleThemeToggle = () => {
    toggleTheme();
  };

  return (
    <header className="border-b border-gray-100 bg-gray-950 transition-colors">
      <nav className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-10">
        {/* Top Navbar */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="text-xl font-bold text-gray-100 flex items-center gap-2"
          >
            {/* MERN Auth */}
            <FaReact size={40} />
            {/* <IoLogoPlaystation size={40} /> */}
            React Logo
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-10 md:flex">
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

          {/* Mobile / Tablet Controls */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Menu Button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((previous) => !previous)}
              aria-label={
                isMenuOpen
                  ? 'Close navigation menu'
                  : 'Open navigation menu'
              }
              aria-expanded={isMenuOpen}
              className="rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              <IoMenu size={25} />
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Menu */}
        {isMenuOpen && (
          <div className="border-t border-gray-200 py-4 dark:border-gray-800 md:hidden">
            <div className="flex flex-col gap-4">
              <NavLink
                to="/"
                onClick={closeMenu}
                className={getNavLinkClass}
              >
                Home
              </NavLink>

              <NavLink
                to="/login"
                onClick={closeMenu}
                className={getNavLinkClass}
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                onClick={closeMenu}
                className="w-fit rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
              >
                Sign Up
              </NavLink>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
