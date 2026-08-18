import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiCamera,
  FiBox,
  FiUser,
  FiUsers,
  FiZap,
  FiDollarSign,
  FiBell,
  FiMenu,
  FiX,
  FiChevronDown,
} from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import {
  getAllReports,
  getAllAgents,
  getAllReporters,
  getAllWithdrawals,
  getAllJobs,
  getAllRecyclingCentres,
  confirmReport,
  rejectReport,
  verifyAgent,
  rejectAgent,
  updateWithdrawalStatus,
  createRecyclingCentre,
  setRecyclingCentreActive,
} from "../../services/admin";

/* =========================================================
   FORMAT HELPERS
========================================================= */

function timeAgo(dateString) {
  if (!dateString) return "";
  const diffMs = Date.now() - new Date(dateString).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr${hrs === 1 ? "" : "s"} ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

function formatDate(dateString) {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount || 0);
}

const CATEGORY_LABELS = {
  overflowing_bin: "Overflowing bin",
  illegal_dumping: "Illegal dumping",
  blocked_drainage: "Blocked drainage",
  drainage_clearance: "Drainage clearance",
  waste_collection: "Waste collection",
  other: "Other",
};

// Adapts a raw `reports` row (+ joined profile/images) into the
// shape ReportRow/ImagePreviewModal expect.
function mapReportForDisplay(report) {
  return {
    id: report.id,
    site: report.address || report.title,
    issue: CATEGORY_LABELS[report.category] || report.category,
    reporter: report.profiles?.full_name || "Unknown reporter",
    submitted: timeAgo(report.created_at),
    image: report.report_images?.[0]?.public_url || "/logo.svg",
    description: report.description || "No description provided.",
    status: report.status,
  };
}

/* =========================================================
   SIDEBAR NAVIGATION
========================================================= */

const navItems = [
  { label: "Overview", icon: FiGrid },
  { label: "Reported sites", icon: FiCamera },
  { label: "Job dispatch", icon: FiBox },
  { label: "Agents", icon: FiUser },
  { label: "Reporters", icon: FiUsers },
  { label: "Recycling centres", icon: FiZap },
  { label: "Payments", icon: FiDollarSign },
];

/* =========================================================
   SIDEBAR
========================================================= */

function Sidebar({
  mobile = false,
  closeMenu,
  activePage,
  onNavigate,
}) {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleNavigation = (label) => {
    onNavigate(label);

    if (mobile && closeMenu) {
      closeMenu();
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (err) {
      console.error("Failed to log out:", err);
    }
  };

  return (
    <aside
      className={`flex flex-col bg-[#0d3f2d] text-white ${
        mobile
          ? "fixed inset-y-0 left-0 z-50 h-screen w-70 lg:hidden"
          : "fixed inset-y-0 left-0 z-40 hidden h-screen w-62 shrink-0 lg:flex"
      }`}
    >
      {/* LOGO */}
      <div className="flex shrink-0 items-center px-6.25 pt-7">
        <img
          src="/logo.svg"
          alt="CleanAbia logo"
          className="h-7 w-7 shrink-0 object-contain"
        />

        <span className="ml-2 text-md font-bold">
          CleanAbia
        </span>

        <span className="ml-3 rounded-md border border-[#e7a719] px-2 py-0.5 text-[10px] font-bold text-[#e7a719]">
          ADMIN
        </span>

        {mobile && (
          <button
            onClick={closeMenu}
            className="ml-auto text-white"
            aria-label="Close menu"
          >
            <FiX size={20} />
          </button>
        )}
      </div>

      {/* NAVIGATION */}
      <nav className="mt-11 flex-1 overflow-hidden px-6.25">
        {navItems.map(({ label, icon: Icon }) => {
          const isActive = activePage === label;

          return (
            <button
              key={label}
              onClick={() => handleNavigation(label)}
              className={`mb-1 flex h-10 w-full items-center gap-4.5 rounded-xl px-4.25 transition ${
                isActive
                  ? "bg-[#2b5948] text-white"
                  : "text-[#b9cec5] hover:bg-[#174d3a]"
              }`}
            >
              <Icon size={21} strokeWidth={1.8} />

              <span className="text-sm font-semibold">
                {label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* BOTTOM SIDEBAR */}
      <div className="mt-auto shrink-0 px-6.25 pb-7">
        <button
          onClick={handleLogout}
          className="h-8.5 w-full rounded-full border border-[#78978a] text-sm font-semibold text-white transition hover:bg-[#174d3a]"
        >
          Log out
        </button>

        <div className="mt-5 border-t border-[#285746] pt-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f2aa19] font-bold text-[#164431]">
              MI
            </div>

            <div>
              <p className="text-sm font-bold">
                Ministry Admin
              </p>

              <p className="mt-1 text-sm text-[#9eb8ad]">
                Verification desk
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({ title, value, text }) {
  return (
    <div className="rounded-xl border border-[#dfe3dc] bg-white p-5 shadow-[0_7px_18px_rgba(15,55,39,0.05)]">
      <p className="text-sm text-[#61716a]">
        {title}
      </p>

      <p className="mt-5 text-2xl font-bold leading-none tracking-[-1px] text-[#003d2b]">
        {value}
      </p>

      <p className="mt-3.25 text-sm text-[#006044]">
        {text}
      </p>
    </div>
  );
}

/* =========================================================
   PAGE HEADER
========================================================= */

function PageHeader({ title, description, onMenu }) {
  return (
    <header className="flex items-start justify-between">
      <div>
        <button
          onClick={onMenu}
          className="mb-2 text-[#0d3f2d] lg:hidden"
          aria-label="Open menu"
        >
          <FiMenu size={25} />
        </button>

        <h1 className="text-xl font-medium tracking-tight lg:text-2xl">
          {title}
        </h1>

        <p className="mt-2.75 text-sm text-[#64736d]">
          {description}
        </p>
      </div>

      <button className="relative mt-0.75 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#dce1da] bg-white">
        <FiBell size={20} strokeWidth={1.7} />

        <span className="absolute right-2.5 top-2 h-2.25 w-2.25 rounded-full bg-[#b93630]" />
      </button>
    </header>
  );
}

/* =========================================================
   ACTION BUTTONS
========================================================= */

function ActionButtons({ status, onConfirm, onReject }) {
  if (status === "confirmed") {
    return (
      <span className="inline-flex rounded-full bg-[#e2eee8] px-4 py-2 text-sm font-semibold text-[#176348]">
        Confirmed
      </span>
    );
  }

  if (status === "rejected") {
    return (
      <span className="inline-flex rounded-full bg-[#f9e5e3] px-4 py-2 text-sm font-semibold text-[#b93630]">
        Rejected
      </span>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={onConfirm}
        className="rounded-full bg-[#0d3f2d] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#174d3a]"
      >
        Confirm
      </button>

      <button
        onClick={onReject}
        className="rounded-full border border-[#26342e] bg-white px-5 py-2 text-sm font-semibold text-[#111b17] transition hover:bg-[#f3f5f2]"
      >
        Reject
      </button>
    </div>
  );
}

/* =========================================================
   IMAGE PREVIEW MODAL
========================================================= */

function ImagePreviewModal({ report, onClose }) {
  if (!report) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/35 px-4 backdrop-blur-[3px]"
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-[#dfe3dc] bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-[#53645d] shadow-md transition hover:bg-[#f2f5f2]"
          aria-label="Close image preview"
        >
          <FiX size={18} />
        </button>

        {/* IMAGE */}
        <div className="flex h-[32vh] min-h-210px max-h-330px shrink-0 items-center justify-center overflow-hidden bg-[#f1f4f1]">
          <img
            src={report.image}
            alt={report.site}
            className="h-full w-full object-contain"
          />
        </div>

        {/* DETAILS */}
        <div className="shrink-0 p-4 sm:p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-[#006044]">
            Report details
          </p>

          <h2 className="mt-1 text-lg font-semibold leading-tight text-[#071a14] sm:text-xl">
            {report.site}
          </h2>

          <div className="mt-3 grid grid-cols-2 gap-x-5 gap-y-2.5">
            <div>
              <p className="text-xs font-medium uppercase text-[#718079]">
                Issue
              </p>

              <p className="mt-0.5 text-sm font-semibold text-[#17241e]">
                {report.issue}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase text-[#718079]">
                Reporter
              </p>

              <p className="mt-0.5 text-sm font-semibold text-[#17241e]">
                {report.reporter}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase text-[#718079]">
                Submitted
              </p>

              <p className="mt-0.5 text-sm font-semibold text-[#17241e]">
                {report.submitted}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase text-[#718079]">
                Status
              </p>

              <p className="mt-0.5 text-sm font-semibold text-[#176b4c]">
                Pending confirmation
              </p>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mt-3 border-t border-[#e1e6e2] pt-3">
            <p className="text-[11px] font-medium uppercase text-[#718079]">
              Description
            </p>

            <p className="mt-1 text-sm leading-5 text-[#53645d]">
              {report.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   REPORT ROW
========================================================= */

function ReportRow({
  report,
  status,
  onConfirm,
  onReject,
  onImageClick,
}) {
  return (
    <div className="border-b border-[#e5e9e5] py-4 last:border-b-0 lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)_minmax(0,1.1fr)_minmax(190px,1.15fr)] lg:items-center lg:gap-0">
      {/* SITE + IMAGE */}
      <div className="flex min-w-0 items-center gap-4 lg:pr-4">
        <button
          type="button"
          onClick={() => onImageClick(report)}
          className="group h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#0d3f2d] ring-1 ring-[#dfe3dc] transition hover:ring-2 hover:ring-[#176b4c]"
          aria-label={`View image for ${report.site}`}
        >
          <img
            src={report.image}
            alt=""
            className="h-full w-full object-cover transition group-hover:scale-105"
          />
        </button>

        <div className="min-w-0">
          <p className="min-w-0 text-md font-semibold leading-tight text-[#071a14] lg:truncate">
            {report.site}
          </p>

          <p className="mt-1.25 text-sm text-[#61716a]">
            {report.issue}
          </p>

          <button
            type="button"
            onClick={() => onImageClick(report)}
            className="mt-1 text-xs font-semibold text-[#006044] hover:underline lg:hidden"
          >
            View image
          </button>
        </div>
      </div>

      {/* MOBILE DETAILS */}
      <div className="mt-4 grid grid-cols-2 gap-4 lg:contents">
        {/* REPORTER */}
        <div className="min-w-0">
          <p className="mb-1 text-[11px] font-medium uppercase text-[#4d5f58] lg:hidden">
            Reporter
          </p>

          <p className="min-w-0 truncate text-sm text-[#101b17]">
            {report.reporter}
          </p>
        </div>

        {/* SUBMITTED */}
        <div className="min-w-0">
          <p className="mb-1 text-[11px] font-medium uppercase text-[#4d5f58] lg:hidden">
            Submitted
          </p>

          <p className="min-w-0 truncate text-sm text-[#53645d]">
            {report.submitted}
          </p>
        </div>
      </div>

      {/* ACTION */}
      <div className="mt-4 min-w-0 lg:mt-0">
        <p className="mb-2 text-[11px] font-medium uppercase text-[#4d5f58] lg:hidden">
          Action
        </p>

        <ActionButtons
          status={status}
          onConfirm={onConfirm}
          onReject={onReject}
        />
      </div>
    </div>
  );
}

/* =========================================================
   CONFIRMATION TOAST
========================================================= */

function ConfirmationToast({ onClose, message }) {
  return (
    <div className="fixed bottom-6 right-6 z-110 w-300px rounded-xl border border-[#dfe3dc] bg-white p-4 shadow-xl">
      <div className="flex items-start">
        <div>
          <p className="text-sm font-bold text-[#17352a]">
            Site confirmed
          </p>

          <p className="mt-1 text-[13px] leading-[1.35] text-[#60716a]">
            {message || "Job dispatched to nearby agents."}
          </p>
        </div>

        <button
          onClick={onClose}
          className="ml-auto text-[#73817b]"
          aria-label="Close notification"
        >
          <FiX size={16} />
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   SHARED PAGE CARD
========================================================= */

function DashboardCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-xl border border-[#dfe3dc] bg-white shadow-[0_7px_18px_rgba(15,55,39,0.05)] ${className}`}
    >
      {children}
    </div>
  );
}

/* =========================================================
   OVERVIEW PAGE
========================================================= */

function OverviewPage({ onMenu, reports, agents, jobs, withdrawals }) {
  const pendingReports = reports.filter((r) => r.status === "pending");
  const verifiedAgents = agents.filter((a) => a.is_verified);
  const openJobs = jobs.filter((j) => j.status === "open" || j.status === "assigned");
  const inProgressJobs = jobs.filter((j) => j.status === "accepted" || j.status === "in_progress");

  const monthlyPayouts = withdrawals
    .filter((w) => w.status === "paid")
    .reduce((total, w) => total + Number(w.amount || 0), 0);

  const uniqueLgas = new Set(
    reports.map((r) => r.lga).filter(Boolean)
  ).size;

  const stats = [
    {
      title: "Pending review",
      value: String(pendingReports.length),
      text: `${uniqueLgas} LGA${uniqueLgas === 1 ? "" : "s"} affected`,
    },
    {
      title: "Verified agents",
      value: String(verifiedAgents.length),
      text: `${agents.length} total registered`,
    },
    {
      title: "Jobs in progress",
      value: String(inProgressJobs.length),
      text: `${openJobs.length} awaiting an agent`,
    },
    {
      title: "Payouts (paid)",
      value: formatCurrency(monthlyPayouts),
      text: "Reporters + Agents",
    },
  ];

  const recentJobs = [...jobs]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 3);

  return (
    <>
      <PageHeader
        title="Verification queue"
        description={`${pendingReports.length} report${pendingReports.length === 1 ? "" : "s"} awaiting confirmation across ${uniqueLgas} LGA${uniqueLgas === 1 ? "" : "s"}.`}
        onMenu={onMenu}
      />

      <section className="mt-9.75 grid grid-cols-1 gap-5.5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            {...stat}
          />
        ))}
      </section>

      <section className="mt-9 grid gap-7 xl:grid-cols-[1.43fr_1fr]">
        {/* LIVE JOB BOARD */}
        <DashboardCard className="h-80 p-4 overflow-y-auto">
          <div className="flex items-center justify-between">
            <h2 className="text-md font-medium">
              Live job board
            </h2>
          </div>

          <div className="mt-4 space-y-2">
            {recentJobs.length === 0 && (
              <p className="text-sm text-[#60716a] py-4">No jobs yet.</p>
            )}
            {recentJobs.map((job) => (
              <div key={job.id} className="rounded-lg border border-[#dfe4dd] px-6 py-3">
                <p className="text-md font-medium">
                  {job.reports?.title || job.reports?.address || job.job_code}
                </p>

                <span
                  className={`mt-1.5 inline-flex rounded-full px-3.5 py-1.5 text-xs font-bold ${
                    job.status === "open" || job.status === "assigned"
                      ? "bg-[#e4ecf8] text-[#2861a9]"
                      : "bg-[#e2eee8] text-[#176348]"
                  }`}
                >
                  {job.status === "open" || job.status === "assigned"
                    ? "OPEN"
                    : job.status?.toUpperCase()}
                </span>

                <p className="mt-2.5 text-sm text-[#60716a]">
                  {job.profiles?.full_name
                    ? `Taken by ${job.profiles.full_name}`
                    : "Awaiting first acceptance."}
                </p>
              </div>
            ))}
          </div>
        </DashboardCard>

        {/* RECYCLING */}
        <DashboardCard className="p-4">
          <h2 className="text-md font-medium">
            Pending reports
          </h2>

          <div className="mt-4">
            {pendingReports.slice(0, 3).map((report) => (
              <div key={report.id} className="flex gap-4 border-b border-[#dfe3dc] py-3 last:border-b-0">
                <FiCamera
                  size={24}
                  className="mt-1 shrink-0 text-[#e09a0b]"
                />

                <div>
                  <p className="text-sm font-semibold">
                    {report.title}
                  </p>

                  <p className="my-1 text-sm text-[#60716a]">
                    {report.address} — {timeAgo(report.created_at)}
                  </p>
                </div>
              </div>
            ))}
            {pendingReports.length === 0 && (
              <p className="text-sm text-[#60716a] py-4">Nothing pending review.</p>
            )}
          </div>
        </DashboardCard>
      </section>
    </>
  );
}

/* =========================================================
   REPORTED SITES PAGE
========================================================= */

function ReportedSitesPage({
  onMenu,
  reports,
  onConfirm,
  onReject,
  onImageClick,
}) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedLga, setSelectedLga] = useState("All LGAs");

  const lgas = [
    "All LGAs",
    ...Array.from(new Set(reports.map((r) => r.lga).filter(Boolean))),
  ];

  const filteredReports =
    selectedLga === "All LGAs"
      ? reports
      : reports.filter((r) => r.lga === selectedLga);

  return (
    <>
      <PageHeader
        title="Reported sites"
        description={`View and manage reported waste sites across ${lgas.length - 1} LGA${lgas.length - 1 === 1 ? "" : "s"}.`}
        onMenu={onMenu}
      />

      <section className="mt-9 rounded-[17px] border border-[#dfe3dc] bg-white px-6 py-8.75 shadow-[0_7px_18px_rgba(15,55,39,0.05)] sm:px-8.25">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-normal tracking-[-0.3px]">
              Reported sites
            </h2>

            <p className="mt-1 text-sm text-[#64736d]">
              Manage all submitted waste reports.
            </p>
          </div>

          <div className="relative shrink-0">
            <button
              onClick={() =>
                setFilterOpen((previous) => !previous)
              }
              className="flex items-center gap-1 text-sm font-semibold text-[#006044]"
            >
              Filter by LGA
              <FiChevronDown size={16} />
            </button>

            {filterOpen && (
              <div className="absolute right-0 top-7 z-20 w-40 rounded-lg border border-[#dfe3dc] bg-white py-1 shadow-lg max-h-64 overflow-y-auto">
                {lgas.map((lga) => (
                  <button
                    key={lga}
                    onClick={() => {
                      setSelectedLga(lga);
                      setFilterOpen(false);
                    }}
                    className={`block w-full px-3 py-2 text-left text-sm hover:bg-[#f2f5f2] ${
                      selectedLga === lga
                        ? "font-bold text-[#176b4c]"
                        : "text-[#26352e]"
                    }`}
                  >
                    {lga}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 overflow-hidden">
          {/* DESKTOP TABLE HEADER */}
          <div className="hidden w-full border-b border-[#dfe3dc] pb-3 text-sm font-medium uppercase text-[#4d5f58] lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)_minmax(0,1.1fr)_minmax(190px,1.15fr)]">
            <span className="pl-20">Site</span>
            <span>Reporter</span>
            <span>Submitted</span>
            <span>Action</span>
          </div>

          {filteredReports.length === 0 && (
            <p className="py-10 text-center text-sm text-[#60716a]">
              No reports {selectedLga !== "All LGAs" ? `in ${selectedLga}` : "yet"}.
            </p>
          )}

          {filteredReports.map((report) => {
            const display = mapReportForDisplay(report);
            return (
              <ReportRow
                key={report.id}
                report={display}
                status={display.status}
                onConfirm={() => onConfirm(report.id)}
                onReject={() => onReject(report.id)}
                onImageClick={() => onImageClick(display)}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}

/* =========================================================
   JOB DISPATCH PAGE
========================================================= */

const JOB_STATUS_LABELS = {
  open: "Open",
  assigned: "Assigned",
  accepted: "Accepted",
  in_progress: "In progress",
  completed: "Completed",
  confirmed: "Confirmed",
  cancelled: "Cancelled",
};

function JobDispatchPage({ onMenu, jobs }) {
  const counts = {
    pending: jobs.filter((j) => j.status === "open" || j.status === "assigned").length,
    inProgress: jobs.filter((j) => j.status === "accepted" || j.status === "in_progress").length,
    completed: jobs.filter((j) => j.status === "completed" || j.status === "confirmed").length,
    cancelled: jobs.filter((j) => j.status === "cancelled").length,
  };

  return (
    <>
      <PageHeader
        title="Job dispatch"
        description="Manage waste collection jobs and agent assignments."
        onMenu={onMenu}
      />

      <section className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
        {[
          ["Jobs", String(jobs.length), "All jobs"],
          ["Pending", String(counts.pending), "Awaiting agents"],
          ["In progress", String(counts.inProgress), "Active jobs"],
          ["Completed", String(counts.completed), "Finished"],
          ["Cancelled", String(counts.cancelled), "This month"],
        ].map(([title, value, text]) => (
          <StatCard
            key={title}
            title={title}
            value={value}
            text={text}
          />
        ))}
      </section>

      <DashboardCard className="mt-8 overflow-hidden">
        <div className="flex items-center justify-between border-b border-[#dfe3dc] p-5">
          <h2 className="font-medium">Active jobs</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-212.5 text-left text-sm">
            <thead className="border-b border-[#dfe3dc] text-xs uppercase text-[#61716a]">
              <tr>
                <th className="px-5 py-4">Job code</th>
                <th className="px-5 py-4">Site</th>
                <th className="px-5 py-4">Agent</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Payout</th>
              </tr>
            </thead>

            <tbody>
              {jobs.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-[#61716a]">
                    No jobs yet.
                  </td>
                </tr>
              )}
              {jobs.map((job) => (
                <tr
                  key={job.id}
                  className="border-b border-[#edf0ed] last:border-0"
                >
                  <td className="px-5 py-4 font-semibold">
                    {job.job_code}
                  </td>

                  <td className="px-5 py-4">
                    {job.reports?.title || job.reports?.address || "—"}
                  </td>

                  <td className="px-5 py-4 text-[#61716a]">
                    {job.profiles?.full_name || "Unassigned"}
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-full bg-[#e4ecf8] px-3 py-1 text-xs font-semibold text-[#2861a9]">
                      {JOB_STATUS_LABELS[job.status] || job.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 font-semibold">
                    {formatCurrency(job.payout_amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>
    </>
  );
}

/* =========================================================
   AGENTS PAGE
========================================================= */

function AgentsPage({ onMenu, agents, onVerify, onReject }) {
  const [busyId, setBusyId] = useState(null);

  const verifiedCount = agents.filter((a) => a.is_verified).length;
  const pendingCount = agents.filter((a) => a.verification_status === "pending" || !a.verification_status).length;
  const rejectedCount = agents.filter((a) => a.verification_status === "rejected").length;

  const handleAction = async (agent, action) => {
    setBusyId(agent.id);
    try {
      await action(agent.id);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <>
      <PageHeader
        title="Agents"
        description="View and manage verification agents."
        onMenu={onMenu}
      />

      <section className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total agents" value={String(agents.length)} text="All LGAs" />
        <StatCard title="Verified" value={String(verifiedCount)} text="Approved" />
        <StatCard title="Pending" value={String(pendingCount)} text="Awaiting review" />
        <StatCard title="Rejected" value={String(rejectedCount)} text="Not approved" />
      </section>

      <DashboardCard className="mt-8 overflow-hidden">
        <div className="flex items-center justify-between p-5">
          <h2 className="font-medium">Agents</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-212.5 text-left text-sm">
            <thead className="border-y border-[#dfe3dc] text-xs uppercase text-[#61716a]">
              <tr>
                <th className="px-5 py-4">Agent</th>
                <th className="px-5 py-4">Phone</th>
                <th className="px-5 py-4">Agent code</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {agents.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-[#61716a]">
                    No agents have signed up yet.
                  </td>
                </tr>
              )}
              {agents.map((agent) => (
                <tr
                  key={agent.id}
                  className="border-b border-[#edf0ed] last:border-0"
                >
                  <td className="px-5 py-4 font-semibold">
                    {agent.profiles?.full_name || "Unknown"}
                  </td>

                  <td className="px-5 py-4 text-[#61716a]">
                    {agent.profiles?.phone || "—"}
                  </td>

                  <td className="px-5 py-4">
                    {agent.agent_code || "—"}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`font-semibold ${
                        agent.is_verified
                          ? "text-[#176b4c]"
                          : agent.verification_status === "rejected"
                          ? "text-[#b93630]"
                          : "text-[#c58b12]"
                      }`}
                    >
                      ●{" "}
                      {agent.is_verified
                        ? "Verified"
                        : agent.verification_status === "rejected"
                        ? "Rejected"
                        : "Pending"}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    {agent.is_verified ? (
                      <span className="text-xs text-[#61716a]">—</span>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAction(agent, onVerify)}
                          disabled={busyId === agent.id}
                          className="rounded-full bg-[#0d3f2d] px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
                        >
                          Verify
                        </button>
                        <button
                          onClick={() => handleAction(agent, onReject)}
                          disabled={busyId === agent.id}
                          className="rounded-full border border-[#53605a] px-3 py-1.5 text-xs font-semibold disabled:opacity-60"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>
    </>
  );
}

/* =========================================================
   REPORTERS PAGE
========================================================= */

function ReportersPage({ onMenu, reporters }) {
  const activeCount = reporters.filter((r) => r.is_active).length;
  const totalReports = reporters.reduce(
    (sum, r) => sum + (r.reports?.length || 0),
    0
  );

  return (
    <>
      <PageHeader
        title="Reporters"
        description="View and manage community reporters."
        onMenu={onMenu}
      />

      <section className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total reporters" value={String(reporters.length)} text="All time" />
        <StatCard title="Active" value={String(activeCount)} text="Account enabled" />
        <StatCard title="Inactive" value={String(reporters.length - activeCount)} text="Account disabled" />
        <StatCard title="Reports submitted" value={String(totalReports)} text="All time" />
      </section>

      <DashboardCard className="mt-8 overflow-hidden">
        <div className="flex items-center justify-between p-5">
          <h2 className="font-medium">Community reporters</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-212.5 text-left text-sm">
            <thead className="border-y border-[#dfe3dc] text-xs uppercase text-[#61716a]">
              <tr>
                <th className="px-5 py-4">Reporter</th>
                <th className="px-5 py-4">Phone</th>
                <th className="px-5 py-4">Location</th>
                <th className="px-5 py-4">Reports</th>
                <th className="px-5 py-4">Joined</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {reporters.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-[#61716a]">
                    No reporters yet.
                  </td>
                </tr>
              )}
              {reporters.map((reporter) => (
                <tr
                  key={reporter.id}
                  className="border-b border-[#edf0ed] last:border-0"
                >
                  <td className="px-5 py-4 font-semibold">
                    {reporter.full_name}
                  </td>

                  <td className="px-5 py-4 text-[#61716a]">
                    {reporter.phone || "—"}
                  </td>

                  <td className="px-5 py-4">
                    {reporter.location || "—"}
                  </td>

                  <td className="px-5 py-4">
                    {reporter.reports?.length || 0}
                  </td>

                  <td className="px-5 py-4">
                    {formatDate(reporter.created_at)}
                  </td>

                  <td className="px-5 py-4">
                    <span className={`font-semibold ${reporter.is_active ? "text-[#176b4c]" : "text-[#b93630]"}`}>
                      ● {reporter.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>
    </>
  );
}

/* =========================================================
   RECYCLING CENTRES PAGE
========================================================= */

function RecyclingCentresPage({ onMenu, centres, onAddCentre, onToggleActive }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [busyId, setBusyId] = useState(null);
  const [formState, setFormState] = useState({
    name: "",
    address: "",
    lga: "",
    phone: "",
    accepted_materials: "",
  });
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const activeCount = centres.filter((c) => c.is_active).length;

  const handleAdd = async (e) => {
    e.preventDefault();
    setFormError("");
    setSaving(true);

    try {
      await onAddCentre({
        name: formState.name,
        address: formState.address,
        lga: formState.lga,
        phone: formState.phone,
        accepted_materials: formState.accepted_materials
          .split(",")
          .map((m) => m.trim())
          .filter(Boolean),
      });
      setFormState({ name: "", address: "", lga: "", phone: "", accepted_materials: "" });
      setShowAddForm(false);
    } catch (err) {
      setFormError(err.message || "Failed to add centre.");
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (centre) => {
    setBusyId(centre.id);
    try {
      await onToggleActive(centre.id, !centre.is_active);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <>
      <PageHeader
        title="Recycling centres"
        description="Manage approved recycling and drop-off centres."
        onMenu={onMenu}
      />

      <section className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard title="Total centres" value={String(centres.length)} text="Across LGAs" />
        <StatCard title="Active" value={String(activeCount)} text="Accepting materials" />
        <StatCard title="Inactive" value={String(centres.length - activeCount)} text="Temporarily closed" />
      </section>

      {showAddForm && (
        <DashboardCard className="mt-8 p-5">
          <h2 className="font-medium mb-4">Add recycling centre</h2>
          {formError && (
            <p className="mb-3 text-sm text-[#b93630]">{formError}</p>
          )}
          <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              required
              placeholder="Centre name"
              value={formState.name}
              onChange={(e) => setFormState((p) => ({ ...p, name: e.target.value }))}
              className="border border-[#dfe3dc] rounded-lg px-3 py-2 text-sm"
            />
            <input
              required
              placeholder="LGA"
              value={formState.lga}
              onChange={(e) => setFormState((p) => ({ ...p, lga: e.target.value }))}
              className="border border-[#dfe3dc] rounded-lg px-3 py-2 text-sm"
            />
            <input
              required
              placeholder="Address"
              value={formState.address}
              onChange={(e) => setFormState((p) => ({ ...p, address: e.target.value }))}
              className="border border-[#dfe3dc] rounded-lg px-3 py-2 text-sm sm:col-span-2"
            />
            <input
              placeholder="Phone"
              value={formState.phone}
              onChange={(e) => setFormState((p) => ({ ...p, phone: e.target.value }))}
              className="border border-[#dfe3dc] rounded-lg px-3 py-2 text-sm"
            />
            <input
              placeholder="Materials accepted (comma-separated)"
              value={formState.accepted_materials}
              onChange={(e) => setFormState((p) => ({ ...p, accepted_materials: e.target.value }))}
              className="border border-[#dfe3dc] rounded-lg px-3 py-2 text-sm"
            />
            <div className="sm:col-span-2 flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="rounded-full bg-[#0d3f2d] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save centre"}
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="rounded-full border border-[#53605a] px-4 py-2 text-sm font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </DashboardCard>
      )}

      <DashboardCard className="mt-8 overflow-hidden">
        <div className="flex items-center justify-between p-5">
          <h2 className="font-medium">Recycling centres</h2>

          <button
            onClick={() => setShowAddForm((s) => !s)}
            className="rounded-full bg-[#0d3f2d] px-4 py-2 text-sm font-semibold text-white"
          >
            + Add centre
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-850px text-left text-sm">
            <thead className="border-y border-[#dfe3dc] text-xs uppercase text-[#61716a]">
              <tr>
                <th className="px-5 py-4">Centre</th>
                <th className="px-5 py-4">Location</th>
                <th className="px-5 py-4">Materials accepted</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {centres.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-[#61716a]">
                    No recycling centres added yet.
                  </td>
                </tr>
              )}
              {centres.map((centre) => (
                <tr
                  key={centre.id}
                  className="border-b border-[#edf0ed] last:border-0"
                >
                  <td className="px-5 py-4 font-semibold">
                    {centre.name}
                  </td>

                  <td className="px-5 py-4">
                    {centre.lga || centre.address}
                  </td>

                  <td className="px-5 py-4 text-[#61716a]">
                    {(centre.accepted_materials || []).join(", ") || "—"}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={
                        centre.is_active
                          ? "font-semibold text-[#176b4c]"
                          : "font-semibold text-[#c58b12]"
                      }
                    >
                      ● {centre.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <button
                      onClick={() => handleToggle(centre)}
                      disabled={busyId === centre.id}
                      className="rounded-full border border-[#53605a] px-4 py-1.5 text-xs font-semibold disabled:opacity-60"
                    >
                      {centre.is_active ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>
    </>
  );
}

/* =========================================================
   PAYMENTS PAGE
========================================================= */

const WITHDRAWAL_STATUS_STYLES = {
  paid: "text-[#176b4c]",
  approved: "text-[#176b4c]",
  processing: "text-[#c58b12]",
  pending: "text-[#c58b12]",
  rejected: "text-[#b93630]",
  failed: "text-[#b93630]",
};

function PaymentsPage({ onMenu, withdrawals, onUpdateStatus }) {
  const [busyId, setBusyId] = useState(null);

  const totalPaid = withdrawals
    .filter((w) => w.status === "paid")
    .reduce((sum, w) => sum + Number(w.amount || 0), 0);
  const pendingTotal = withdrawals
    .filter((w) => w.status === "pending")
    .reduce((sum, w) => sum + Number(w.amount || 0), 0);
  const failedTotal = withdrawals
    .filter((w) => w.status === "failed" || w.status === "rejected")
    .reduce((sum, w) => sum + Number(w.amount || 0), 0);

  const handleUpdate = async (withdrawal, status) => {
    setBusyId(withdrawal.id);
    try {
      await onUpdateStatus(withdrawal.id, status);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <>
      <PageHeader
        title="Payments"
        description="Track payouts to agents and reporters."
        onMenu={onMenu}
      />

      <section className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard title="Total paid out" value={formatCurrency(totalPaid)} text="All time" />
        <StatCard title="Pending" value={formatCurrency(pendingTotal)} text="Awaiting approval" />
        <StatCard title="Failed / rejected" value={formatCurrency(failedTotal)} text="Needs review" />
      </section>

      <DashboardCard className="mt-8 overflow-hidden">
        <div className="flex items-center justify-between p-5">
          <h2 className="font-medium">Withdrawal requests</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-850px text-left text-sm">
            <thead className="border-y border-[#dfe3dc] text-xs uppercase text-[#61716a]">
              <tr>
                <th className="px-5 py-4">Recipient</th>
                <th className="px-5 py-4">Role</th>
                <th className="px-5 py-4">Bank</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Requested</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {withdrawals.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-[#61716a]">
                    No withdrawal requests yet.
                  </td>
                </tr>
              )}
              {withdrawals.map((payment) => (
                <tr
                  key={payment.id}
                  className="border-b border-[#edf0ed] last:border-0"
                >
                  <td className="px-5 py-4 font-semibold">
                    {payment.profiles?.full_name || "Unknown"}
                  </td>

                  <td className="px-5 py-4 text-[#61716a] capitalize">
                    {payment.profiles?.role || "—"}
                  </td>

                  <td className="px-5 py-4 text-[#61716a]">
                    {payment.bank_name} · {payment.account_number}
                  </td>

                  <td className="px-5 py-4 font-semibold">
                    {formatCurrency(payment.amount)}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`font-semibold capitalize ${WITHDRAWAL_STATUS_STYLES[payment.status] || "text-[#61716a]"}`}
                    >
                      ● {payment.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    {formatDate(payment.requested_at)}
                  </td>

                  <td className="px-5 py-4">
                    {payment.status === "pending" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdate(payment, "approved")}
                          disabled={busyId === payment.id}
                          className="rounded-full bg-[#0d3f2d] px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleUpdate(payment, "rejected")}
                          disabled={busyId === payment.id}
                          className="rounded-full border border-[#53605a] px-3 py-1.5 text-xs font-semibold disabled:opacity-60"
                        >
                          Reject
                        </button>
                      </div>
                    ) : payment.status === "approved" ? (
                      <button
                        onClick={() => handleUpdate(payment, "paid")}
                        disabled={busyId === payment.id}
                        className="rounded-full bg-[#0d3f2d] px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
                      >
                        Mark paid
                      </button>
                    ) : (
                      <span className="text-xs text-[#61716a]">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>
    </>
  );
}

/* =========================================================
   PAGE ROUTER
========================================================= */

function DashboardContent({
  activePage,
  onMenu,
  data,
  onConfirm,
  onReject,
  onImageClick,
  onVerifyAgent,
  onRejectAgent,
  onUpdateWithdrawal,
  onAddCentre,
  onToggleCentreActive,
}) {
  switch (activePage) {
    case "Reported sites":
      return (
        <ReportedSitesPage
          onMenu={onMenu}
          reports={data.reports}
          onConfirm={onConfirm}
          onReject={onReject}
          onImageClick={onImageClick}
        />
      );

    case "Job dispatch":
      return <JobDispatchPage onMenu={onMenu} jobs={data.jobs} />;

    case "Agents":
      return (
        <AgentsPage
          onMenu={onMenu}
          agents={data.agents}
          onVerify={onVerifyAgent}
          onReject={onRejectAgent}
        />
      );

    case "Reporters":
      return <ReportersPage onMenu={onMenu} reporters={data.reporters} />;

    case "Recycling centres":
      return (
        <RecyclingCentresPage
          onMenu={onMenu}
          centres={data.centres}
          onAddCentre={onAddCentre}
          onToggleActive={onToggleCentreActive}
        />
      );

    case "Payments":
      return (
        <PaymentsPage
          onMenu={onMenu}
          withdrawals={data.withdrawals}
          onUpdateStatus={onUpdateWithdrawal}
        />
      );

    case "Overview":
    default:
      return (
        <OverviewPage
          onMenu={onMenu}
          reports={data.reports}
          agents={data.agents}
          jobs={data.jobs}
          withdrawals={data.withdrawals}
        />
      );
  }
}

/* =========================================================
   MAIN ADMIN DASHBOARD
========================================================= */

export default function AdminDashboard() {
  const [mobileMenu, setMobileMenu] = useState(false);

  const [activePage, setActivePage] = useState("Overview");

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [selectedReport, setSelectedReport] = useState(null);

  const [data, setData] = useState({
    reports: [],
    agents: [],
    reporters: [],
    jobs: [],
    withdrawals: [],
    centres: [],
  });
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const loadAllData = useCallback(async () => {
    try {
      setLoading(true);
      setLoadError(null);

      const [reports, agents, reporters, jobs, withdrawals, centres] =
        await Promise.all([
          getAllReports(),
          getAllAgents(),
          getAllReporters(),
          getAllJobs(),
          getAllWithdrawals(),
          getAllRecyclingCentres(),
        ]);

      setData({ reports, agents, reporters, jobs, withdrawals, centres });
    } catch (err) {
      console.error("Failed to load admin dashboard data:", err);
      setLoadError("Failed to load dashboard data. Please refresh.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  const flashToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4500);
  };

  /* =======================================================
     CONFIRM / REJECT SITE
  ======================================================= */

  const confirmSite = async (id) => {
    try {
      await confirmReport(id);
      flashToast("Site confirmed and job dispatched to nearby agents.");
      await loadAllData();
    } catch (err) {
      console.error("Failed to confirm report:", err);
    }
  };

  const rejectSite = async (id) => {
    try {
      await rejectReport(id);
      await loadAllData();
    } catch (err) {
      console.error("Failed to reject report:", err);
    }
  };

  /* =======================================================
     AGENT VERIFICATION
  ======================================================= */

  const handleVerifyAgent = async (agentProfileId) => {
    try {
      await verifyAgent(agentProfileId);
      await loadAllData();
    } catch (err) {
      console.error("Failed to verify agent:", err);
    }
  };

  const handleRejectAgent = async (agentProfileId) => {
    try {
      await rejectAgent(agentProfileId);
      await loadAllData();
    } catch (err) {
      console.error("Failed to reject agent:", err);
    }
  };

  /* =======================================================
     WITHDRAWALS
  ======================================================= */

  const handleUpdateWithdrawal = async (withdrawalId, status) => {
    try {
      await updateWithdrawalStatus(withdrawalId, status);
      await loadAllData();
    } catch (err) {
      console.error("Failed to update withdrawal:", err);
    }
  };

  /* =======================================================
     RECYCLING CENTRES
  ======================================================= */

  const handleAddCentre = async (centre) => {
    await createRecyclingCentre(centre);
    await loadAllData();
  };

  const handleToggleCentreActive = async (centreId, isActive) => {
    try {
      await setRecyclingCentreActive(centreId, isActive);
      await loadAllData();
    } catch (err) {
      console.error("Failed to update recycling centre:", err);
    }
  };

  /* =======================================================
     NAVIGATION
  ======================================================= */

  const handleNavigation = (page) => {
    setActivePage(page);

    /*
      Scroll the main content back to the top
      whenever another sidebar page is selected.
    */
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#f4f6f2]">
        <p className="text-[#0d3f2d] font-medium">Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f6f2]">
      {/* DESKTOP SIDEBAR */}
      <Sidebar
        activePage={activePage}
        onNavigate={handleNavigation}
      />

      {/* MAIN */}
      <main className="min-w-0 lg:ml-62">
        <div className="px-5 pb-11 pt-6 sm:px-8.75 lg:px-12.5">
          {loadError && (
            <div className="mb-5 rounded-xl bg-[#f9e5e3] p-4 text-sm text-[#b93630]">
              {loadError}
            </div>
          )}
          <DashboardContent
            activePage={activePage}
            onMenu={() => setMobileMenu(true)}
            data={data}
            onConfirm={confirmSite}
            onReject={rejectSite}
            onImageClick={setSelectedReport}
            onVerifyAgent={handleVerifyAgent}
            onRejectAgent={handleRejectAgent}
            onUpdateWithdrawal={handleUpdateWithdrawal}
            onAddCentre={handleAddCentre}
            onToggleCentreActive={handleToggleCentreActive}
          />
        </div>
      </main>

      {/* MOBILE SIDEBAR */}
      {mobileMenu && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] lg:hidden"
            onClick={() => setMobileMenu(false)}
          />

          <Sidebar
            mobile
            closeMenu={() => setMobileMenu(false)}
            activePage={activePage}
            onNavigate={handleNavigation}
          />
        </>
      )}

      {/* IMAGE PREVIEW MODAL */}
      {selectedReport && (
        <ImagePreviewModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}

      {/* CONFIRMATION TOAST */}
      {showToast && (
        <ConfirmationToast
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}