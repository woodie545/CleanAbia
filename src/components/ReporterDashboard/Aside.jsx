import React, { useState } from "react";
import { CiClock2, CiGrid41, CiCamera, CiSettings } from "react-icons/ci";
import { AiOutlineDollar } from "react-icons/ai";
import { GoAlert, GoPerson } from "react-icons/go";
import { LuBell, LuMenu, LuX } from "react-icons/lu";

// Pass activePage alongside setPages and userProfile
export default function Aside({ setPages, userProfile, activePage = "overview" }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Extract values dynamically with fallback defaults
  const fullName = userProfile?.fullName || "Chidinma Okafor";
  const address = userProfile?.address || "15 Brass Street, Aba";
  const role = userProfile?.role || "Reporter";
  const avatarUrl = userProfile?.avatarUrl || null;

  // Helper function to extract initials dynamically
  const getInitials = (name) => {
    if (!name) return "CO";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Helper function to calculate nav link styles based on active status
  const getLinkClass = (pageName) => {
    const isActive = activePage === pageName;
    return `flex items-center gap-3 p-2 rounded-lg transition-colors cursor-pointer ${
      isActive
        ? "bg-forest-tint text-forest font-bold"
        : "text-white hover:bg-white/10 font-bold"
    }`;
  };

  return (
    <>
      <header className="md:hidden flex items-center justify-between bg-forest p-4 text-white sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <img
            src="/image.png"
            alt="Logo"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-lg font-bold">CleanAbia</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1 focus:outline-none"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? (
            <LuX className="text-2xl" />
          ) : (
            <LuMenu className="text-2xl" />
          )}
        </button>
      </header>

      <aside
        className={`fixed md:sticky top-0 left-0 z-20 h-screen w-64 shrink-0 bg-forest p-6 text-white flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="space-y-8 overflow-y-auto">
          <div className="hidden md:flex items-center gap-3 pt-2">
            <img
              src="/image.png"
              alt="Logo"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-xl font-bold">CleanAbia</span>
          </div>

          <nav className="space-y-4">
            <a
              onClick={() => {
                setPages("overview");
                setSidebarOpen(false);
              }}
              className={getLinkClass("overview")}
            >
              <CiGrid41 className="text-2xl shrink-0" />
              <span>Overview</span>
            </a>
            <a
              onClick={() => {
                setPages("report");
                setSidebarOpen(false);
              }}
              className={getLinkClass("report")}
            >
              <CiCamera className="text-2xl shrink-0" />
              <span>File a Report</span>
            </a>
            <a
              onClick={() => {
                setPages("profile");
                setSidebarOpen(false);
              }}
              className={getLinkClass("profile")}
            >
              <GoPerson className="text-2xl shrink-0" />
              <span>Profile</span>
            </a>
            <a
              onClick={() => {
                setPages("setting");
                setSidebarOpen(false);
              }}
              className={getLinkClass("setting")}
            >
              <CiSettings className="text-2xl shrink-0" />
              <span>Settings</span>
            </a>
          </nav>
        </div>

        {/* Dynamic Bottom Profile Badge */}
        <div className="space-y-4 pt-6 shrink-0">
          <button className="w-full bg-forest border border-white/30 rounded-full py-2 px-4 font-bold hover:bg-white/10 transition-colors">
            Log out
          </button>
          <div className="border-b border-white/30" />
          <div>
            <p className="text-center font-bold mb-3 truncate">{fullName}</p>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center shrink-0 h-9 w-9 rounded-full bg-amber-600 text-white font-bold overflow-hidden">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  getInitials(fullName)
                )}
              </div>
              <div className="text-xs text-white/80 leading-tight min-w-0">
                <p className="truncate font-medium">{role}</p>
                <p className="truncate">{address}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}