import React, { useState, useEffect, useRef } from "react";
import { GoPerson, GoMail, GoLocation, GoShield } from "react-icons/go";
import { CiCamera } from "react-icons/ci";

export default function Profile({ setPages, userProfile, setUserProfile }) {
  // Fallback defaults if parent prop isn't passed yet
  const defaultProfile = {
    fullName: "Chidinma Okafor",
    email: "chidinma.okafor@example.com",
    address: "15 Brass Street, Aba, Abia State",
    reporterId: "CA-ABA-8921",
    role: "Community Reporter",
    avatarUrl: null, // Track avatar image source
  };

  const initialData = userProfile || defaultProfile;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialData);

  // Hidden file input reference
  const fileInputRef = useRef(null);

  // Sync state if userProfile prop changes from parent or localStorage hydration
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

  // Trigger file picker click
  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Convert selected file to Base64 preview & persist to state
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedData = { ...formData, avatarUrl: reader.result };
        setFormData(updatedData);
        
        // Save avatar immediately if parent updater function exists
        if (typeof setUserProfile === "function") {
          setUserProfile(updatedData);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    setFormData(userProfile || defaultProfile);
    setIsEditing(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (typeof setUserProfile === "function") {
      setUserProfile(formData);
    }
    setIsEditing(false);
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

      <div className="max-w-4xl space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            {/* Avatar Preview OR Initials */}
            <div className="w-24 h-24 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-3xl shadow overflow-hidden">
              {formData.avatarUrl ? (
                <img
                  src={formData.avatarUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                getInitials(formData.fullName)
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
              className="absolute bottom-0 right-0 bg-forest text-white p-2 rounded-full shadow hover:opacity-90 transition-opacity cursor-pointer"
              title="Upload photo"
            >
              <CiCamera className="text-lg" />
            </button>
          </div>

          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-xl font-bold text-gray-900">
              {formData.fullName}
            </h2>
            <p className="text-sm text-gray-500">{formData.role}</p>
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
                    name="fullName"
                    value={formData.fullName || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest"
                    required
                  />
                ) : (
                  <p className="text-sm font-semibold text-gray-800 py-1">
                    {formData.fullName}
                  </p>
                )}
              </div>
            </div>

            {/* Email Address */}
            <div className="flex items-start gap-3">
              <GoMail className="text-xl text-forest mt-2 shrink-0" />
              <div className="w-full">
                <label className="block text-xs text-gray-400 font-medium uppercase mb-1">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest"
                    required
                  />
                ) : (
                  <p className="text-sm font-semibold text-gray-800 py-1">
                    {formData.email}
                  </p>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-3">
              <GoLocation className="text-xl text-forest mt-2 shrink-0" />
              <div className="w-full">
                <label className="block text-xs text-gray-400 font-medium uppercase mb-1">
                  Address
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={formData.address || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest"
                    required
                  />
                ) : (
                  <p className="text-sm font-semibold text-gray-800 py-1">
                    {formData.address}
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
                  {formData.reporterId}
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
                  className="bg-forest text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Save Changes
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