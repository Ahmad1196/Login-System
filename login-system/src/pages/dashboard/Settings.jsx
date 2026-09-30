import { useState } from "react";
import {
  IoCheckmarkCircleOutline,
  IoMoonOutline,
  IoSunnyOutline,
} from "react-icons/io5";

import { changePassword } from "../../services/authService";
import { useTheme } from "../../contexts/ThemeContext";

function Settings() {
  const { theme, setTheme, isDark } = useTheme();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  const handleChangePassword = async (event) => {
    event.preventDefault();

    setPasswordError("");
    setPasswordSuccess("");

    if (!currentPassword) {
      setPasswordError("Current password is required");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    try {
      setIsChangingPassword(true);

      const response = await changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });

      if (!response.ok) {
        setPasswordError(response.message || "Failed to change password");
        return;
      }

      setPasswordSuccess("Password changed successfully");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Failed to change password:", error);

      setPasswordError("Unable to change password");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const cardClass = isDark
    ? "border-gray-700 bg-gray-900"
    : "border-gray-200 bg-white";

  const headingClass = isDark ? "text-white" : "text-gray-900";
  const secondaryTextClass = isDark ? "text-gray-400" : "text-gray-600";
  const inputClass = isDark
    ? "border-gray-600 bg-gray-800 text-white placeholder:text-gray-500 focus:border-gray-400"
    : "border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-gray-500";

  return (
    <div>
      <div className="mb-8">
        <h1 className={`text-2xl font-bold sm:text-3xl ${headingClass}`}>
          Settings
        </h1>

        <p className={`mt-2 text-sm ${secondaryTextClass}`}>
          Manage your appearance and account security.
        </p>
      </div>

      <div className="space-y-6">
        {/* Appearance */}
        <section className={`rounded-2xl border p-6 shadow-lg ${cardClass}`}>
          <div className="mb-6">
            <h2 className={`text-lg font-semibold ${headingClass}`}>
              Appearance
            </h2>

            <p className={`mt-1 text-sm ${secondaryTextClass}`}>
              Choose how the application should look.
            </p>
          </div>

          <div
            className={`flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between ${
              isDark
                ? "border-gray-700 bg-gray-800"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  isDark
                    ? "bg-gray-700 text-gray-200"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {isDark ? (
                  <IoMoonOutline className="text-xl" />
                ) : (
                  <IoSunnyOutline className="text-xl" />
                )}
              </div>

              <div>
                <p className={`text-sm font-medium ${headingClass}`}>
                  Theme mode
                </p>

                <p className={`mt-1 text-xs ${secondaryTextClass}`}>
                  Current theme: {theme}
                </p>
              </div>
            </div>

            <div
              className={`flex rounded-xl border p-1 ${
                isDark
                  ? "border-gray-600 bg-gray-900"
                  : "border-gray-300 bg-white"
              }`}
            >
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                  theme === "light"
                    ? isDark
                      ? "bg-gray-700 text-white"
                      : "bg-gray-200 text-gray-900"
                    : secondaryTextClass
                }`}
              >
                <IoSunnyOutline />
                Light
              </button>

              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                  theme === "dark"
                    ? isDark
                      ? "bg-gray-700 text-white"
                      : "bg-gray-200 text-gray-900"
                    : secondaryTextClass
                }`}
              >
                <IoMoonOutline />
                Dark
              </button>
            </div>
          </div>
        </section>

        {/* Security */}
        <section className={`rounded-2xl border p-6 shadow-lg ${cardClass}`}>
          <div className="mb-6">
            <h2 className={`text-lg font-semibold ${headingClass}`}>
              Change password
            </h2>

            <p className={`mt-1 text-sm ${secondaryTextClass}`}>
              Update your account password.
            </p>
          </div>

          <form onSubmit={handleChangePassword} className="max-w-xl space-y-5">
            <PasswordInput
              label="Current password"
              value={currentPassword}
              onChange={setCurrentPassword}
              disabled={isChangingPassword}
              inputClass={inputClass}
              headingClass={headingClass}
            />

            <PasswordInput
              label="New password"
              value={newPassword}
              onChange={setNewPassword}
              disabled={isChangingPassword}
              inputClass={inputClass}
              headingClass={headingClass}
            />

            <PasswordInput
              label="Confirm new password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              disabled={isChangingPassword}
              inputClass={inputClass}
              headingClass={headingClass}
            />

            {passwordError && (
              <p className="text-sm text-red-400">{passwordError}</p>
            )}

            {passwordSuccess && (
              <div className="flex items-center gap-2 text-sm text-green-400">
                <IoCheckmarkCircleOutline className="text-lg" />
                {passwordSuccess}
              </div>
            )}

            <button
              type="submit"
              disabled={isChangingPassword}
              className={`rounded-xl px-5 py-2.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${
                isDark
                  ? "bg-white text-gray-900 hover:bg-gray-200"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
            >
              {isChangingPassword ? "Changing password..." : "Change password"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

function PasswordInput({
  label,
  value,
  onChange,
  disabled,
  inputClass,
  headingClass,
}) {
  return (
    <div>
      <label className={`mb-2 block text-sm font-medium ${headingClass}`}>
        {label}
      </label>

      <input
        type="password"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition focus:ring-4 focus:ring-gray-500/10 disabled:cursor-not-allowed disabled:opacity-60 ${inputClass}`}
      />
    </div>
  );
}

export default Settings;