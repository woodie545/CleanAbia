import React, { useState } from "react";
import { CiClock2, CiGrid41, CiCamera, CiSettings } from "react-icons/ci";
import { AiOutlineDollar } from "react-icons/ai";
import { GoAlert, GoPerson } from "react-icons/go";
import { LuBell, LuMenu, LuPackageCheck, LuX } from "react-icons/lu";

export default function Overview({ userProfile, setActiveTab }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Dynamic name extraction from props
  const fullName = userProfile?.fullName || "Chidinma Okafor";
  const firstName = fullName.split(" ")[0];

  // Points Progress Calculation
  const currentPoints = userProfile?.points || 0;
  const targetPoints = 1500;
  const percentage = Math.min((currentPoints / targetPoints) * 100, 100);

  // SVG Donut Circle Parameters
  const radius = 50;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-forest-tint min-h-screen flex flex-col md:flex-row">
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
        />
      )}

      {/* Main Dashboard Content */}
      <main className="flex-1 p-4 md:p-8 min-w-full overflow-x-hidden">
        {/* Header Section */}
        <div className="flex items-center justify-between gap-4 mb-2">
          <h1 className="text-2xl md:text-3xl font-bold text-black truncate">
            Welcome back, {firstName}
          </h1>
          <button className="flex items-center justify-center bg-white rounded-full w-10 h-10 shrink-0 shadow-sm hover:shadow transition-shadow">
            <LuBell className="text-lg text-gray-700" />
          </button>
        </div>
        <p className="text-gray-600 text-sm md:text-base mb-6">
          You haven't filed a report yet - here's where they'll show up.
        </p>

        {/* Overview Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <p className="text-gray-500 text-sm mb-2">Total reports</p>
            <p className="text-forest font-bold text-2xl mb-2">0</p>
            <p className="text-xs text-gray-400">None this week yet</p>
          </div>
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <p className="text-gray-500 text-sm mb-2">Confirmed</p>
            <p className="text-forest font-bold text-2xl mb-2">0</p>
            <p className="text-xs text-gray-400">No reports yet</p>
          </div>
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <p className="text-gray-500 text-sm mb-2">Points earned</p>
            <p className="text-forest font-bold text-2xl mb-2">{currentPoints}</p>
            <p className="text-xs text-gray-400">1,500 to next payout</p>
          </div>
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <p className="text-gray-500 text-sm mb-2">Withdrawable</p>
            <p className="text-forest font-bold text-2xl mb-2">₦ 0</p>
            <p className="text-xs text-gray-400">Withdrawals aren't live yet</p>
          </div>
        </section>

        {/* Dashboard Content Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm text-center flex flex-col items-center justify-center min-h-[220px]">
              <h2 className="font-semibold text-lg mb-2 self-start">
                Recent reports
              </h2>
              <p className="text-gray-500 text-sm max-w-md my-4">
                No reports yet - file your first one and it will show up here.
              </p>
              <button className="bg-forest rounded-full px-6 py-2.5 text-white font-semibold text-sm hover:opacity-90 transition-opacity">
                Report a dirty site
              </button>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="font-semibold text-lg mb-4">
                Sanitation reminder & etiquette
              </h2>
              <div className="space-y-4">
                <div className="flex gap-3 pb-3 border-b border-gray-100">
                  <GoAlert className="text-2xl text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold">
                      Monthly sanitation exercise
                    </p>
                    <p className="text-sm text-gray-600">
                      Last Saturday of every month, 7am-10am across Abia LGAs.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pb-3 border-b border-gray-100">
                  <CiCamera className="text-2xl text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold">
                      Report real, current sites
                    </p>
                    <p className="text-sm text-gray-600">
                      Old or resolved photos will be rejected during review.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CiClock2 className="text-2xl text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold">
                      Stay safe while reporting
                    </p>
                    <p className="text-sm text-gray-600">
                      Never step into traffic or private property for a photo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Widgets Column */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col justify-between min-h-[300px]">
              <h2 className="font-semibold text-lg mb-4">Points to payout</h2>

              {/* Circular Progress Section */}
              <div className="flex flex-col items-center justify-center my-auto">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                    {/* Light Gray Track */}
                    <circle
                      cx="60"
                      cy="60"
                      r={radius}
                      stroke="#e3e8df"
                      strokeWidth={strokeWidth}
                      fill="transparent"
                    />
                    {/* Active Green Progress Bar */}
                    <circle
                      cx="60"
                      cy="60"
                      r={radius}
                      stroke="#1e3a29"
                      strokeWidth={strokeWidth}
                      fill="transparent"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      className="transition-all duration-500 ease-out"
                    />
                  </svg>

                  {/* Text Inside Ring */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-extrabold text-[#1e3a29]">
                      {currentPoints}
                    </span>
                    <span className="text-xs text-gray-500 font-medium -mt-1">
                      of 1,500 pts
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  {targetPoints - currentPoints} points to your next withdrawal tier
                </p>
              </div>

              <button className="w-full bg-forest rounded-full py-3 text-white font-semibold text-sm opacity-80 cursor-not-allowed mt-6">
                Withdrawal - coming soon
              </button>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="font-bold text-base mb-3">Your activity</h2>
              <div className="flex gap-3">
                <LuPackageCheck className="text-2xl text-amber-600 shrink-0" />
                <div>
                  <p className="text-sm font-semibold">This week</p>
                  <p className="text-xs text-gray-500">
                    No reports filed this week yet
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}