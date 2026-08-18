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
import { useAuth } from "../../../hooks/useAuth";
import { signIn, updateAuthUser } from "../../../services/auth";

// Note: email notification / SMS alert preferences aren't stored
// anywhere in the schema yet (no columns for them on `profiles`),
// so those two toggles are local-only for now and don't persist.
export default function Settings({ userProfile = {}, setUserProfile }) {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    full_name: userProfile?.full_name || "",
    email: user?.email || "",
    location: userProfile?.location || "",
  });

  const [notifications, setNotifications] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [saving, setSaving] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    setFormData({
      full_name: userProfile?.full_name || "",
      email: user?.email || "",
      location: userProfile?.location || "",
    });
  }, [userProfile, user]);

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
    setTimeout(() => setShowPopup(false), 4000);
  };

  const handleSaveAll = async (e) => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmPassword } = passwords;
    const isChangingPassword = currentPassword || newPassword || confirmPassword;

    if (isChangingPassword) {
      if (!currentPassword) {
        triggerPopup("error", "Please enter your current password.");
        return;
      }
      if (newPassword.length < 6) {
        triggerPopup("error", "New password must be at least 6 characters long.");
        return;
      }
      if (newPassword !== confirmPassword) {
        triggerPopup("error", "Passwords do not match!");
        return;
      }
    }

    setSaving(true);

    try {
      // Profile fields (name/location) go through the profiles table.
      if (typeof setUserProfile === "function") {
        await setUserProfile({
          full_name: formData.full_name,
          location: formData.location,
        });
      }

      // Email change goes through Supabase Auth, and typically
      // requires the person to confirm via a link sent to their
      // new (and sometimes old) address before it takes effect.
      if (formData.email && formData.email !== user?.email) {
        await updateAuthUser({ email: formData.email });
      }

      // Password change: verify the current password first by
      // signing in with it, then apply the new one.
      if (isChangingPassword) {
        await signIn(user.email, currentPassword);
        await updateAuthUser({ password: newPassword });
      }

      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
      triggerPopup(
        "success",
        formData.email !== user?.email
          ? "Saved! Check your inbox to confirm your new email."
          : "Saved successfully!"
      );
    } catch (err) {
      console.error("Failed to save settings:", err);
      triggerPopup(
        "error",
        err.message?.includes("Invalid login")
          ? "Current password is incorrect."
          : err.message || "Something went wrong. Please try again."
      );
    } finally {
      setSaving(false);
    }
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
                name="full_name"
                value={formData.full_name}
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
              <p className="text-xs text-gray-400 mt-1">
                Changing this sends a confirmation link to your new address.
              </p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
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

          <p className="text-xs text-amber-700 bg-amber-50 rounded-lg p-2.5">
            Notification preferences aren't wired up to the backend yet -
            these toggles are just a preview for now.
          </p>

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
            disabled={isPasswordMismatch || saving}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-opacity shadow-sm cursor-pointer ${
              isPasswordMismatch || saving
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-forest text-white hover:opacity-90"
            }`}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </main>
  );
}
