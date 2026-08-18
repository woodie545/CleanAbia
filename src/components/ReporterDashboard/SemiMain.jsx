import React from "react";
import Overview from "./pages/Overview";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import FileAReport from "./pages/FileAReport"; // 1. Import your report component

export default function SemiMain({
  pages,
  setPages,
  userProfile,
  setUserProfile,
  reports,
  reportsError,
}) {
  return (
    <div className="flex-1 min-w-0 bg-forest-tint overflow-y-auto p-4">
      {/* 1. Overview */}
      {pages === "overview" && (
        <Overview
          userProfile={userProfile}
          setActiveTab={setPages}
          reports={reports}
          reportsError={reportsError}
        />
      )}

      {/* 2. File a Report */}
      {(pages === "report" || pages === "Report") && (
        <FileAReport setPages={setPages} userProfile={userProfile} />
      )}

      {/* 3. Profile */}
      {(pages === "profile" ||
        pages === "Profile" ||
        pages === "userProfile") && (
        <Profile
          setPages={setPages}
          userProfile={userProfile}
          setUserProfile={setUserProfile}
        />
      )}

      {/* 4. Settings */}
      {(pages === "setting" ||
        pages === "settings" ||
        pages === "Settings") && (
        <Settings
          setPages={setPages}
          userProfile={userProfile}
          setUserProfile={setUserProfile}
        />
      )}

      {/* DEBUG CATCHER: Shows if there is a spelling/naming mismatch */}
      {![
        "overview",
        "report",
        "Report",
        "profile",
        "Profile",
        "userProfile",
        "setting",
        "settings",
        "Settings",
      ].includes(pages) && (
        <div className="p-6 bg-red-50 text-red-700 rounded-lg border border-red-200">
          <h2 className="font-bold text-lg mb-1">Page Not Found Mismatch</h2>
          <p className="text-sm">
            Current active page string is:{" "}
            <code className="bg-red-100 px-2 py-1 rounded font-mono font-bold">
              "{pages}"
            </code>
          </p>
          <p className="text-xs mt-2 text-red-600">
            Check your <code className="font-bold">Aside.jsx</code> file to see
            what string <code className="font-bold">setPages(...)</code> is
            sending when you click the menu item!
          </p>
        </div>
      )}
    </div>
  );
}
