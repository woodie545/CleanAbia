import React, { useState, useEffect } from "react";
import {
  LuBell,
  LuLock,
  LuUser,
  LuEye,
  LuEyeOff,
  LuCircleCheck,
  LuCheck,
  LuX,
} from "react-icons/lu";

export default function Settings({ userProfile = {}, setUserProfile }) {
  // Local state for account information with safe fallbacks
  const [formData, setFormData] = useState({
    fullName: userProfile?.fullName || "Chidinma Okafor",
    email: userProfile?.email || "chidinma.okafor@example.com",
    address: userProfile?.address || "15 Brass Street, Aba",
  });

  const [notifications, setNotifications] = useState(
    userProfile?.notifications ?? true,
  );
  const [smsAlerts, setSmsAlerts] = useState(userProfile?.smsAlerts ?? false);

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (userProfile) {
      setFormData({
        fullName: userProfile.fullName || "",
        email: userProfile.email || "",
        address: userProfile.address || "",
      });
      if (userProfile.notifications !== undefined) {
        setNotifications(userProfile.notifications);
      }
      if (userProfile.smsAlerts !== undefined) {
        setSmsAlerts(userProfile.smsAlerts);
      }
    }
  }, [userProfile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const isPasswordMismatch =
    passwords.confirmPassword.length > 0 &&
    passwords.newPassword !== passwords.confirmPassword;

  const triggerPopup = (type, text) => {
    setStatusMessage({ type, text });
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const handleSaveAll = (e) => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmPassword } = passwords;

    if (currentPassword || newPassword || confirmPassword) {
      if (!currentPassword) {
        triggerPopup("error", "Please enter your current password.");
        return;
      }
      if (newPassword.length < 6) {
        triggerPopup(
          "error",
          "New password must be at least 6 characters long.",
        );
        return;
      }
      if (newPassword !== confirmPassword) {
        triggerPopup("error", "Passwords do not match!");
        return;
      }
    }

    if (setUserProfile) {
      setUserProfile((prev) => ({
        ...prev,
        ...formData,
        notifications,
        smsAlerts,
      }));
    }

    setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
    triggerPopup("success", "Saved successfully!");
  };

  return (
    <main className="flex-1 p-4 md:p-8 min-w-0 overflow-x-hidden bg-forest-tint relative">
      {showPopup && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-white border border-gray-100 shadow-xl rounded-xl p-4 transition-all duration-300">
          {statusMessage.type === "success" ? (
            <LuCircleCheck className="text-2xl text-green-600 shrink-0" />
          ) : (
            <LuX className="text-2xl text-red-600 shrink-0" />
          )}
          <div>
            <p className="text-sm font-bold text-gray-800">
              {statusMessage.type === "success" ? "Success" : "Error"}
            </p>
            <p className="text-xs text-gray-600">{statusMessage.text}</p>
          </div>
          <button
            onClick={() => setShowPopup(false)}
            className="ml-4 text-gray-400 hover:text-gray-600"
          >
            <LuX />
          </button>
        </div>
      )}

      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-black">
          Account Settings
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Update your preferences and manage security options.
        </p>
      </div>

      <form onSubmit={handleSaveAll} className="max-w-4xl space-y-6">
        <section className="bg-white rounded-lg p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <LuUser className="text-lg text-forest" />
            <h2 className="font-semibold text-lg text-gray-800">
              Account Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest"
                required
              />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <LuLock className="text-lg text-forest" />
            <h2 className="font-semibold text-lg text-gray-800">
              Change Password
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  name="currentPassword"
                  value={passwords.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                  className="w-full border border-gray-200 rounded-lg p-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showCurrent ? <LuEyeOff /> : <LuEye />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                  className="w-full border border-gray-200 rounded-lg p-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showNew ? <LuEyeOff /> : <LuEye />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                  className={`w-full border rounded-lg p-2.5 pr-10 text-sm focus:outline-none focus:ring-2 ${
                    isPasswordMismatch
                      ? "border-red-500 focus:ring-red-200 focus:border-red-500"
                      : "border-gray-200 focus:ring-forest/20 focus:border-forest"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showConfirm ? <LuEyeOff /> : <LuEye />}
                </button>
              </div>
              {isPasswordMismatch && (
                <p className="text-xs text-red-500 mt-1 font-medium">
                  Passwords do not match
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <LuBell className="text-lg text-forest" />
            <h2 className="font-semibold text-lg text-gray-800">
              Notifications
            </h2>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Email Notifications
                </p>
                <p className="text-xs text-gray-500">
                  Get updates when your filed report status changes.
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="w-4 h-4 accent-forest cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 pt-3">
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  SMS Alerts
                </p>
                <p className="text-xs text-gray-500">
                  Receive instant SMS alerts regarding monthly cleanup
                  schedules.
                </p>
              </div>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="w-4 h-4 accent-forest cursor-pointer"
              />
            </div>
          </div>
        </section>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPasswordMismatch}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-opacity shadow-sm cursor-pointer ${
              isPasswordMismatch
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-forest text-white hover:opacity-90"
            }`}
          >
            Save Changes
          </button>
        </div>
      </form>
    </main>
  );
}
