import React, { useState, useEffect } from "react";
import Aside from "./Aside";
import SemiMain from "./SemiMain";
import { getMyReports } from '../../services/reports';
import { updateMyProfile } from '../../services/profiles';
import { useAuth } from '../../hooks/useAuth';

export default function ReporterDashboard() {
  const [pages, setPages] = useState("overview");

  // Profile comes from AuthProvider (loaded on sign-in).
  const { profile: userProfile, profileLoading, refreshProfile } = useAuth();
  const [reports, setReports] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch this reporter's reports from Supabase on mount.
  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true);
        setError(null);

        const reportsData = await getMyReports();
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

  // Persists profile edits to Supabase, then refreshes the
  // shared profile in AuthProvider so every part of the
  // dashboard (sidebar, overview, etc.) stays in sync.
  const handleProfileUpdate = async (updatedFields) => {
    try {
      const updatedProfile = await updateMyProfile(updatedFields);
      await refreshProfile();
      return updatedProfile;
    } catch (err) {
      console.error("Failed to update profile:", err);
      throw err;
    }
  };

  if (loading || profileLoading) {
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
