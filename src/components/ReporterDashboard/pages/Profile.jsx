import React, { useState, useEffect, useRef } from "react";
import { GoPerson, GoMail, GoLocation, GoShield, GoDeviceMobile } from "react-icons/go";
import { CiCamera } from "react-icons/ci";
import { useAuth } from "../../../hooks/useAuth";
import { uploadAvatar } from "../../../services/profiles";

// Field names below match the `profiles` table exactly
// (full_name, phone, location, avatar_url) so saves persist
// correctly to Supabase.
export default function Profile({ setPages, userProfile, setUserProfile }) {
  const { user, refreshProfile } = useAuth();

  const defaultProfile = {
    full_name: "Chidinma Okafor",
    phone: "",
    location: "15 Brass Street, Aba, Abia State",
    role: "reporter",
    avatar_url: null,
  };

  const initialData = userProfile || defaultProfile;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const fileInputRef = useRef(null);

  // Sync state if userProfile prop changes from the parent
  // (e.g. after a refresh from Supabase).
  useEffect(() => {
    if (userProfile) {
      setFormData(userProfile);
    }
  }, [userProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Uploads the picked file straight to Supabase Storage
  // (the `avatars` bucket) and saves the resulting URL.
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingAvatar(true);
    setMessage({ type: "", text: "" });

    try {
      const updatedProfile = await uploadAvatar(file);
      setFormData((prev) => ({ ...prev, avatar_url: updatedProfile.avatar_url }));
      await refreshProfile();

      setMessage({ type: "success", text: "Profile photo updated." });
    } catch (err) {
      console.error("Failed to upload avatar:", err);
      setMessage({ type: "error", text: err.message || "Failed to upload photo." });
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    setIsEditing(true);
    setMessage({ type: "", text: "" });
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    setFormData(userProfile || defaultProfile);
    setIsEditing(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      if (typeof setUserProfile === "function") {
        await setUserProfile({
          full_name: formData.full_name,
          phone: formData.phone,
          location: formData.location,
        });
      }
      setIsEditing(false);
      setMessage({ type: "success", text: "Profile updated." });
    } catch (err) {
      console.error("Failed to save profile:", err);
      setMessage({ type: "error", text: err.message || "Failed to save changes." });
    } finally {
      setSaving(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return "CO";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <main className="flex-1 p-4 md:p-8 min-w-0 overflow-x-hidden bg-forest-tint">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-black">
          User Profile
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Manage your account details and personal info.
        </p>
      </div>

      {message.text && (
        <div
          className={`max-w-4xl mb-5 p-3 rounded-lg text-sm ${
            message.type === "error"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="max-w-4xl space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            {/* Avatar Preview OR Initials */}
            <div className="w-24 h-24 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-3xl shadow overflow-hidden">
              {formData.avatar_url ? (
                <img
                  src={formData.avatar_url}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                getInitials(formData.full_name)
              )}
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            {/* Camera Button */}
            <button
              type="button"
              onClick={handleCameraClick}
              disabled={uploadingAvatar}
              className="absolute bottom-0 right-0 bg-forest text-white p-2 rounded-full shadow hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-60"
              title="Upload photo"
            >
              <CiCamera className="text-lg" />
            </button>
          </div>

          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-xl font-bold text-gray-900">
              {formData.full_name}
            </h2>
            <p className="text-sm text-gray-500 capitalize">{formData.role || "reporter"}</p>
            <span className="inline-block bg-green-100 text-green-800 text-xs px-2.5 py-0.5 rounded-full font-medium">
              Verified Reporter
            </span>
          </div>
        </div>

        {/* Info Details Form */}
        <form
          onSubmit={handleSave}
          className="bg-white rounded-lg p-6 shadow-sm space-y-6"
        >
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <h3 className="text-lg font-semibold text-gray-800">
              Personal Details
            </h3>
            {isEditing && (
              <span className="text-xs bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full font-medium">
                Editing Mode
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="flex items-start gap-3">
              <GoPerson className="text-xl text-forest mt-2 shrink-0" />
              <div className="w-full">
                <label className="block text-xs text-gray-400 font-medium uppercase mb-1">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest"
                    required
                  />
                ) : (
                  <p className="text-sm font-semibold text-gray-800 py-1">
                    {formData.full_name}
                  </p>
                )}
              </div>
            </div>

            {/* Email Address - read only, changed from Settings */}
            <div className="flex items-start gap-3">
              <GoMail className="text-xl text-forest mt-2 shrink-0" />
              <div className="w-full">
                <label className="block text-xs text-gray-400 font-medium uppercase mb-1">
                  Email Address
                </label>
                <p className="text-sm font-semibold text-gray-800 py-1">
                  {user?.email}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3">
              <GoDeviceMobile className="text-xl text-forest mt-2 shrink-0" />
              <div className="w-full">
                <label className="block text-xs text-gray-400 font-medium uppercase mb-1">
                  Phone
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest"
                  />
                ) : (
                  <p className="text-sm font-semibold text-gray-800 py-1">
                    {formData.phone || "Not set"}
                  </p>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-3">
              <GoLocation className="text-xl text-forest mt-2 shrink-0" />
              <div className="w-full">
                <label className="block text-xs text-gray-400 font-medium uppercase mb-1">
                  Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={formData.location || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest"
                  />
                ) : (
                  <p className="text-sm font-semibold text-gray-800 py-1">
                    {formData.location}
                  </p>
                )}
              </div>
            </div>

            {/* Reporter ID */}
            <div className="flex items-start gap-3">
              <GoShield className="text-xl text-forest mt-2 shrink-0" />
              <div className="w-full">
                <label className="block text-xs text-gray-400 font-medium uppercase mb-1">
                  Reporter ID
                </label>
                <p className="text-sm font-semibold text-gray-800 py-1">
                  {formData.id ? `CA-${formData.id.slice(0, 8).toUpperCase()}` : "—"}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-gray-100 flex gap-3">
            {isEditing ? (
              <>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-forest disabled:opacity-60 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={handleCancelClick}
                  className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleEditClick}
                className="bg-forest text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
