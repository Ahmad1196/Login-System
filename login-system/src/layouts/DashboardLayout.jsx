import { useState } from "react";
import { NavLink, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import {
  IoClose,
  IoList,
  IoMenu,
  IoSettingsOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { SlLogout } from "react-icons/sl";
import { FaUserCheck } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { FaUserLarge } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      {/* Navbar */}
      <header className="fixed inset-x-0 top-0 z-40 h-16 border-b border-gray-500 bg-gray-900">
        <div className="flex h-full items-center justify-between px-4 sm:px-6">
          {/* Left side */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="rounded-lg p-2 text-gray-300 transition hover:bg-gray-800 hover:text-white lg:hidden"
              aria-label="Open sidebar"
            >
              <IoMenu className="text-2xl" />
            </button>

            <div className="text-xl font-bold tracking-tight">
              Todo<span className="text-blue-500">App</span>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-1">
            {/* NEW BUTTONS STYLING */}
            <div className="group relative">
              <button
                type="button"
                onClick={() => navigate("/dashboard/profile")}
                aria-label={user?.name || "Profile"}
                className="rounded-lg p-2 text-gray-200 transition hover:bg-gray-800 hover:text-white"
              >
                <FaUserLarge size={25}/>
              </button>

              <span className="pointer-events-none absolute right-0 top-full z-50 mt-2 whitespace-nowrap rounded-md bg-gray-700 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                {user?.name || "Profile"}
              </span>
            </div>

            <div className="group relative">
              <button
                type="button"
                onClick={handleLogout}
                aria-label="Logout"
                className="rounded-lg p-2 text-red-600 transition hover:bg-gray-800 hover:text-red-500"
              >
                <IoLogOutOutline size={25}/>
              </button>

              <span className="pointer-events-none absolute right-0 top-full z-50 mt-2 whitespace-nowrap rounded-md bg-gray-700 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                Logout
              </span>
            </div>

            {/* OLD BUTTONS STYLING */}
            {/* <button
              type="button"
              onClick={() => navigate('/dashboard/profile')}
              className="rounded-lg border border-gray-500 px-3 py-2 text-sm font-medium text-gray-200 transition hover:bg-gray-800 hover:text-white"
            >
              <FaUserLarge size={22} />
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700"
            >
              <IoLogOutOutline size={22} />
            </button> */}
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed bottom-0 left-0 top-16 z-50 w-72 border-r border-gray-500 bg-gray-900 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex items-center justify-between border-b border-gray-500 px-5 py-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Menu
            </h2>

            <button
              type="button"
              onClick={closeSidebar}
              className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-800 hover:text-white lg:hidden"
              aria-label="Close sidebar"
            >
              <IoClose className="text-xl" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 p-4">
            <NavLink
              to="/dashboard"
              onClick={closeSidebar}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              <IoList className="text-xl" />
              <span>Todo Lists</span>
            </NavLink>

            <NavLink
              to="/dashboard/settings"
              onClick={closeSidebar}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              <IoSettingsOutline className="text-xl" />
              <span>Settings</span>
            </NavLink>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="min-h-screen pt-16 lg:pl-72">
        <div className="min-h-[calc(100vh-64px)] bg-gray-800 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
