import React, { useState, useEffect } from "react";
import Aside from "./Aside";
import SemiMain from "./SemiMain";
import { getMyReports } from '../services/reports';
import { getMyProfile, updateMyProfile } from '../services/profiles'; 

export default function ReporterDashboard() {
  const [pages, setPages] = useState("overview");
  
  // State management
  const [userProfile, setUserProfile] = useState(null);
  const [reports, setReports] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user profile and reports from Supabase on mount
  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true);
        setError(null);

        // Fetch profile and reports in parallel
        const [profileData, reportsData] = await Promise.all([
          getUserProfile(),
          getMyReports()
        ]);

        setUserProfile(profileData);
        setReports(reportsData || []);
      } catch (err) {
        console.error("Error loading dashboard data from Supabase:", err);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  // Helper function to update profile directly via Supabase service
  const handleProfileUpdate = async (updatedFields) => {
    try {
      const updatedProfile = await updateUserProfile(updatedFields);
      setUserProfile(updatedProfile);
    } catch (err) {
      console.error("Failed to update profile:", err);
      throw err;
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-forest-tint">
        <div className="text-lg font-medium text-gray-700">Loading dashboard...</div>
      </div>
    );
  }

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
        setUserProfile={handleProfileUpdate}
        reports={reports}
        reportsError={error}
      />
    </div>
  );
}
