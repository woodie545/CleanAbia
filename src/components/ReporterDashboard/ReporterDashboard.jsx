import React, { useState, useEffect } from "react";
import Aside from "./Aside";
import SemiMain from "./SemiMain";

const DEFAULT_PROFILE = {
  fullName: "Chidinma Okafor",
  email: "chidinma.okafor@example.com",
  address: "15 Brass Street, Aba, Abia State",
  reporterId: "CA-ABA-8921",
  role: "Community Reporter",
  notifications: true,
  smsAlerts: false,
};

export default function ReporterDashboard() {
  const [pages, setPages] = useState("overview");

  // Safe lazy state initialization
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const savedProfile = localStorage.getItem("userProfile");
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        // Ensure parsed value is an object and merge with defaults
        if (parsed && typeof parsed === "object") {
          return { ...DEFAULT_PROFILE, ...parsed };
        }
      }
    } catch (e) {
      console.error("Failed to parse userProfile from localStorage:", e);
    }
    return DEFAULT_PROFILE;
  });

  // Sync to localStorage
  useEffect(() => {
    if (userProfile) {
      localStorage.setItem("userProfile", JSON.stringify(userProfile));
    }
  }, [userProfile]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-forest-tint">
      <Aside
        setPages={setPages}
        userProfile={userProfile}
        activePage={pages}
      />

      <SemiMain
        pages={pages}
        setPages={setPages}
        userProfile={userProfile}
        setUserProfile={setUserProfile}
      />
    </div>
  );
}