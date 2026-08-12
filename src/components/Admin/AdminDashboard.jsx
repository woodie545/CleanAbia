import { useState } from "react";
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

/* =========================================================
   REPORT IMAGES
========================================================= */

const reportImages = [
  "/report-ogbor.jpg",
  "/report-world-bank.jpg",
  "/report-ariaria.jpg",
];

/* =========================================================
   REPORT DATA
========================================================= */

const reports = [
  {
    id: 1,
    site: "Ogbor Hill Rd, Aba South",
    issue: "Overflowing bin",
    reporter: "Chidinma O.",
    submitted: "4 min ago",
    image: reportImages[0],
    description:
      "An overflowing waste bin has been reported at Ogbor Hill Road, Aba South.",
  },
  {
    id: 2,
    site: "World Bank Housing Estate",
    issue: "Illegal dumping",
    reporter: "Tochukwu I.",
    submitted: "19 min ago",
    image: reportImages[1],
    description:
      "Waste has been illegally dumped around the World Bank Housing Estate.",
  },
  {
    id: 3,
    site: "Ariaria Market, Rear Gate",
    issue: "Blocked gutter",
    reporter: "Blessing A.",
    submitted: "33 min ago",
    image: reportImages[2],
    description:
      "A blocked drainage gutter was reported at the rear gate of Ariaria Market.",
  },
];

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
   OVERVIEW STATS
========================================================= */

const stats = [
  {
    title: "Pending review",
    value: "11",
    text: "Avg. 22 min to confirm",
  },
  {
    title: "Active agents",
    value: "142",
    text: "37 online now",
  },
  {
    title: "Waste collected (mo.)",
    value: "18.4t",
    text: "≈ 6.1t recycled",
  },
  {
    title: "Payouts (mo.)",
    value: "₦4.2M",
    text: "Reporters + Agents",
  },
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
  const handleNavigation = (label) => {
    onNavigate(label);

    if (mobile && closeMenu) {
      closeMenu();
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
        <button className="h-8.5 w-full rounded-full border border-[#78978a] text-sm font-semibold text-white transition hover:bg-[#174d3a]">
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

function ConfirmationToast({ onClose }) {
  return (
    <div className="fixed bottom-6 right-6 z-110 w-300px rounded-xl border border-[#dfe3dc] bg-white p-4 shadow-xl">
      <div className="flex items-start">
        <div>
          <p className="text-sm font-bold text-[#17352a]">
            Site confirmed
          </p>

          <p className="mt-1 text-[13px] leading-[1.35] text-[#60716a]">
            Job dispatched to 14 nearby agents.
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

function OverviewPage({ onMenu }) {
  return (
    <>
      <PageHeader
        title="Verification queue"
        description="11 reports awaiting confirmation across 6 LGAs."
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
        <DashboardCard className="h-80 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-md font-medium">
              Live job board
            </h2>

            <button className="text-md font-semibold text-[#006044]">
              View all
            </button>
          </div>

          <div className="mt-4 space-y-2">
            <div className="rounded-lg border border-[#dfe4dd] px-6 py-3">
              <p className="text-md font-medium">
                Ndoni St, Umuahia
              </p>

              <span className="mt-1.5 inline-flex rounded-full bg-[#e2eee8] px-3.5 py-1.5 text-xs font-bold text-[#176348]">
                CLAIMED
              </span>

              <p className="mt-2.5 text-sm text-[#60716a]">
                Taken by Agent Ifeoma B. — 6 minutes after posting.
              </p>
            </div>

            <div className="rounded-[15px] border border-[#dfe4dd] px-6 py-3">
              <p className="text-md font-medium">
                Milverton Rd, Aba North
              </p>

              <span className="mt-1.5 inline-flex rounded-full bg-[#e4ecf8] px-3 py-1.5 text-xs font-bold text-[#2861a9]">
                OPEN · SENT TO 14 AGENTS
              </span>

              <p className="mt-2.5 text-sm text-[#60716a]">
                Awaiting first acceptance.
              </p>
            </div>
          </div>
        </DashboardCard>

        {/* RECYCLING */}
        <DashboardCard className="p-4">
          <h2 className="text-md font-medium">
            Recycling drop-offs to verify
          </h2>

          <div className="mt-4">
            <div className="flex gap-4 border-b border-[#dfe3dc] py-3">
              <FiZap
                size={24}
                className="mt-1 shrink-0 text-[#e09a0b]"
              />

              <div>
                <p className="text-sm font-semibold">
                  Faulks Rd centre
                </p>

                <p className="my-1 text-sm text-[#60716a]">
                  84kg mixed plastics — pending weight check
                </p>
              </div>
            </div>

            <div className="flex gap-4 border-b border-[#dfe3dc] py-3">
              <FiZap
                size={24}
                className="my-1 shrink-0 text-[#e09a0b]"
              />

              <div>
                <p className="text-sm font-semibold">
                  Umuahia centre
                </p>

                <p className="mt-1 text-xs leading-snug text-[#60716a]">
                  112kg organics — confirmed, payment queued
                </p>
              </div>
            </div>
          </div>

          <button className="mt-2 h-10 w-full rounded-full border border-[#53605a] text-sm font-semibold hover:bg-[#f3f5f2]">
            Open recycling queue
          </button>
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
  statuses,
  onConfirm,
  onReject,
  onImageClick,
}) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedLga, setSelectedLga] = useState("All LGAs");

  const lgas = [
    "All LGAs",
    "Aba North",
    "Aba South",
    "Arochukwu",
    "Bende",
    "Umuahia South",
  ];

  return (
    <>
      <PageHeader
        title="Reported sites"
        description="View and manage reported waste sites across 6 LGAs."
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
              <div className="absolute right-0 top-7 z-20 w-40 rounded-lg border border-[#dfe3dc] bg-white py-1 shadow-lg">
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

          {reports.map((report) => (
            <ReportRow
              key={report.id}
              report={report}
              status={statuses[report.id]}
              onConfirm={() => onConfirm(report.id)}
              onReject={() => onReject(report.id)}
              onImageClick={onImageClick}
            />
          ))}
        </div>

        {selectedLga !== "All LGAs" && (
          <p className="mt-3 text-sm text-[#60716a]">
            Filter selected:{" "}
            <strong>{selectedLga}</strong>
          </p>
        )}
      </section>
    </>
  );
}

/* =========================================================
   JOB DISPATCH PAGE
========================================================= */

function JobDispatchPage({ onMenu }) {
  const jobs = [
    ["JOB-056", "Ogbor Hill Rd, Aba South", "Aba South", "Open"],
    ["JOB-055", "World Bank Housing Estate", "Aba North", "In progress"],
    ["JOB-054", "Ariaria Market, Rear Gate", "Aba Central", "In progress"],
    ["JOB-053", "Faulks Rd Workshop", "Aba South", "Completed"],
    ["JOB-052", "Umuahia Rd, Opp. Stadium", "Umuahia", "Completed"],
  ];

  return (
    <>
      <PageHeader
        title="Job dispatch"
        description="Manage waste collection jobs and agent assignments."
        onMenu={onMenu}
      />

      <section className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
        {[
          ["Jobs", "56", "All jobs"],
          ["Pending", "18", "Awaiting agents"],
          ["In progress", "22", "Active jobs"],
          ["Completed", "14", "Finished"],
          ["Cancelled", "2", "This month"],
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

          <button className="rounded-full bg-[#0d3f2d] px-4 py-2 text-sm font-semibold text-white">
            + Create job
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-212.5 text-left text-sm">
            <thead className="border-b border-[#dfe3dc] text-xs uppercase text-[#61716a]">
              <tr>
                <th className="px-5 py-4">Job ID</th>
                <th className="px-5 py-4">Site</th>
                <th className="px-5 py-4">Location</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((job) => (
                <tr
                  key={job[0]}
                  className="border-b border-[#edf0ed] last:border-0"
                >
                  <td className="px-5 py-4 font-semibold">
                    {job[0]}
                  </td>

                  <td className="px-5 py-4">
                    {job[1]}
                  </td>

                  <td className="px-5 py-4 text-[#61716a]">
                    {job[2]}
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-full bg-[#e4ecf8] px-3 py-1 text-xs font-semibold text-[#2861a9]">
                      {job[3]}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <button className="rounded-full border border-[#53605a] px-4 py-1.5 text-xs font-semibold">
                      View
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
   AGENTS PAGE
========================================================= */

function AgentsPage({ onMenu }) {
  const agents = [
    ["Adesse Collins", "0803 123 4567", "Aba South", "Online", "42"],
    ["Chidi Nwosu", "0806 987 6543", "Aba North", "Online", "62"],
    ["Tochukwu Ike", "0812 345 6789", "Aba Central", "Offline", "38"],
    ["Emeka Okafor", "0703 765 4321", "Umuahia", "Online", "63"],
    ["Faith Sunday", "0814 234 5678", "Umuahia North", "Offline", "27"],
  ];

  return (
    <>
      <PageHeader
        title="Agents"
        description="View and manage verification agents."
        onMenu={onMenu}
      />

      <section className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total agents" value="142" text="All LGAs" />
        <StatCard title="Online now" value="37" text="Currently active" />
        <StatCard title="Offline" value="105" text="Not active" />
        <StatCard title="On duty" value="84" text="With active jobs" />
      </section>

      <DashboardCard className="mt-8 overflow-hidden">
        <div className="flex items-center justify-between p-5">
          <h2 className="font-medium">Agents</h2>

          <button className="rounded-full bg-[#0d3f2d] px-4 py-2 text-sm font-semibold text-white">
            + Add agent
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-212.5 text-left text-sm">
            <thead className="border-y border-[#dfe3dc] text-xs uppercase text-[#61716a]">
              <tr>
                <th className="px-5 py-4">Agent</th>
                <th className="px-5 py-4">Phone</th>
                <th className="px-5 py-4">Location</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Jobs completed</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {agents.map((agent) => (
                <tr
                  key={agent[0]}
                  className="border-b border-[#edf0ed] last:border-0"
                >
                  <td className="px-5 py-4 font-semibold">
                    {agent[0]}
                  </td>

                  <td className="px-5 py-4 text-[#61716a]">
                    {agent[1]}
                  </td>

                  <td className="px-5 py-4">
                    {agent[2]}
                  </td>

                  <td className="px-5 py-4">
                    <span className="font-semibold text-[#176b4c]">
                      ● {agent[3]}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    {agent[4]}
                  </td>

                  <td className="px-5 py-4">
                    <button className="rounded-full border border-[#53605a] px-4 py-1.5 text-xs font-semibold">
                      View
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
   REPORTERS PAGE
========================================================= */

function ReportersPage({ onMenu }) {
  const reporters = [
    ["Blessing A.", "0801 222 1122", "Aba Central", "24", "May 12, 2025"],
    ["Chidinma O.", "0801 333 4444", "Aba South", "18", "Apr 30, 2025"],
    ["Samuel E.", "0808 555 6666", "Umuahia", "32", "May 26, 2025"],
    ["Chiamaka K.", "0811 777 8888", "Aba North", "9", "May 06, 2025"],
    ["Mercy U.", "0807 999 0000", "Umuahia North", "12", "Apr 18, 2025"],
  ];

  return (
    <>
      <PageHeader
        title="Reporters"
        description="View and manage community reporters."
        onMenu={onMenu}
      />

      <section className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total reporters" value="317" text="All time" />
        <StatCard title="Active" value="251" text="Submitted in last 30 days" />
        <StatCard title="Inactive" value="66" text="No recent reports" />
        <StatCard title="Reports submitted" value="1,248" text="All time" />
      </section>

      <DashboardCard className="mt-8 overflow-hidden">
        <div className="flex items-center justify-between p-5">
          <h2 className="font-medium">Community reporters</h2>

          <button className="flex items-center gap-1 text-sm font-semibold text-[#006044]">
            Filter by LGA
            <FiChevronDown size={15} />
          </button>
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
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {reporters.map((reporter) => (
                <tr
                  key={reporter[0]}
                  className="border-b border-[#edf0ed] last:border-0"
                >
                  <td className="px-5 py-4 font-semibold">
                    {reporter[0]}
                  </td>

                  <td className="px-5 py-4 text-[#61716a]">
                    {reporter[1]}
                  </td>

                  <td className="px-5 py-4">
                    {reporter[2]}
                  </td>

                  <td className="px-5 py-4">
                    {reporter[3]}
                  </td>

                  <td className="px-5 py-4">
                    {reporter[4]}
                  </td>

                  <td className="px-5 py-4">
                    <span className="font-semibold text-[#176b4c]">
                      ● Active
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <button className="rounded-full border border-[#53605a] px-4 py-1.5 text-xs font-semibold">
                      View
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
   RECYCLING CENTRES PAGE
========================================================= */

function RecyclingCentresPage({ onMenu }) {
  const centres = [
    ["Faulks Rd centre", "Aba South", "Plastics, Metals, Paper", "Active", "May 28, 2026"],
    ["Umuahia centre", "Umuahia North", "Organics, Plastics", "Active", "May 21, 2026"],
    ["Ariaria recycling hub", "Aba Central", "Plastics, Paper, Glass", "Under review", "May 16, 2026"],
    ["Ogwuma drop-off", "Ossisa", "Metals, Electronics", "Active", "Apr 15, 2026"],
    ["World Bank Estate centre", "Aba North", "Plastics, Metals", "Active", "May 01, 2026"],
  ];

  return (
    <>
      <PageHeader
        title="Recycling centres"
        description="Manage approved recycling and drop-off centres."
        onMenu={onMenu}
      />

      <section className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total centres" value="24" text="Across LGAs" />
        <StatCard title="Active" value="18" text="Accepting materials" />
        <StatCard title="Under review" value="3" text="Pending verification" />
        <StatCard title="Inactive" value="3" text="Temporarily closed" />
      </section>

      <DashboardCard className="mt-8 overflow-hidden">
        <div className="flex items-center justify-between p-5">
          <h2 className="font-medium">Recycling centres</h2>

          <button className="rounded-full bg-[#0d3f2d] px-4 py-2 text-sm font-semibold text-white">
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
                <th className="px-5 py-4">Last verified</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {centres.map((centre) => (
                <tr
                  key={centre[0]}
                  className="border-b border-[#edf0ed] last:border-0"
                >
                  <td className="px-5 py-4 font-semibold">
                    {centre[0]}
                  </td>

                  <td className="px-5 py-4">
                    {centre[1]}
                  </td>

                  <td className="px-5 py-4 text-[#61716a]">
                    {centre[2]}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={
                        centre[3] === "Active"
                          ? "font-semibold text-[#176b4c]"
                          : "font-semibold text-[#c58b12]"
                      }
                    >
                      ● {centre[3]}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    {centre[4]}
                  </td>

                  <td className="px-5 py-4">
                    <button className="rounded-full border border-[#53605a] px-4 py-1.5 text-xs font-semibold">
                      View
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

function PaymentsPage({ onMenu }) {
  const payments = [
    ["PAY-0248", "Adesse Collins", "Agent payout", "₦26,000", "Completed", "Jun 01, 2025"],
    ["PAY-0247", "Faulk Rd centre", "Centre payout", "₦90,000", "Pending", "Jun 01, 2025"],
    ["PAY-0246", "Chidi Nwosu", "Agent payout", "₦22,500", "Completed", "May 31, 2025"],
    ["PAY-0245", "Umuahia centre", "Centre payout", "₦35,000", "Completed", "May 31, 2025"],
    ["PAY-0244", "Tochukwu Ike", "Agent payout", "₦20,000", "Failed", "May 30, 2025"],
  ];

  return (
    <>
      <PageHeader
        title="Payments"
        description="Track payouts to agents and centres."
        onMenu={onMenu}
      />

      <section className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard title="Total payouts" value="₦4.2M" text="All time" />
        <StatCard title="This month" value="₦612K" text="June 2025" />
        <StatCard title="Pending" value="₦85K" text="Awaiting approval" />
        <StatCard title="Completed" value="₦527K" text="This month" />
        <StatCard title="Failed" value="₦12K" text="Needs review" />
      </section>

      <DashboardCard className="mt-8 overflow-hidden">
        <div className="flex items-center justify-between p-5">
          <h2 className="font-medium">Payment history</h2>

          <button className="flex items-center gap-1 text-sm font-semibold text-[#006044]">
            Filter
            <FiChevronDown size={15} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-850px text-left text-sm">
            <thead className="border-y border-[#dfe3dc] text-xs uppercase text-[#61716a]">
              <tr>
                <th className="px-5 py-4">Payment ID</th>
                <th className="px-5 py-4">Recipient</th>
                <th className="px-5 py-4">Type</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((payment) => (
                <tr
                  key={payment[0]}
                  className="border-b border-[#edf0ed] last:border-0"
                >
                  <td className="px-5 py-4 font-semibold">
                    {payment[0]}
                  </td>

                  <td className="px-5 py-4">
                    {payment[1]}
                  </td>

                  <td className="px-5 py-4 text-[#61716a]">
                    {payment[2]}
                  </td>

                  <td className="px-5 py-4 font-semibold">
                    {payment[3]}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={
                        payment[4] === "Completed"
                          ? "font-semibold text-[#176b4c]"
                          : payment[4] === "Failed"
                          ? "font-semibold text-[#b93630]"
                          : "font-semibold text-[#c58b12]"
                      }
                    >
                      ● {payment[4]}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    {payment[5]}
                  </td>

                  <td className="px-5 py-4">
                    <button className="rounded-full border border-[#53605a] px-4 py-1.5 text-xs font-semibold">
                      View
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
   PAGE ROUTER
========================================================= */

function DashboardContent({
  activePage,
  onMenu,
  statuses,
  onConfirm,
  onReject,
  onImageClick,
}) {
  switch (activePage) {
    case "Reported sites":
      return (
        <ReportedSitesPage
          onMenu={onMenu}
          statuses={statuses}
          onConfirm={onConfirm}
          onReject={onReject}
          onImageClick={onImageClick}
        />
      );

    case "Job dispatch":
      return <JobDispatchPage onMenu={onMenu} />;

    case "Agents":
      return <AgentsPage onMenu={onMenu} />;

    case "Reporters":
      return <ReportersPage onMenu={onMenu} />;

    case "Recycling centres":
      return <RecyclingCentresPage onMenu={onMenu} />;

    case "Payments":
      return <PaymentsPage onMenu={onMenu} />;

    case "Overview":
    default:
      return <OverviewPage onMenu={onMenu} />;
  }
}

/* =========================================================
   MAIN ADMIN DASHBOARD
========================================================= */

export default function AdminDashboard() {
  const [mobileMenu, setMobileMenu] = useState(false);

  const [activePage, setActivePage] = useState("Overview");

  const [statuses, setStatuses] = useState({});

  const [showToast, setShowToast] = useState(false);

  const [selectedReport, setSelectedReport] = useState(null);

  /* =======================================================
     CONFIRM SITE
  ======================================================= */

  const confirmSite = (id) => {
    setStatuses((previous) => ({
      ...previous,
      [id]: "confirmed",
    }));

    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 4500);
  };

  /* =======================================================
     REJECT SITE
  ======================================================= */

  const rejectSite = (id) => {
    setStatuses((previous) => ({
      ...previous,
      [id]: "rejected",
    }));
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
          <DashboardContent
            activePage={activePage}
            onMenu={() => setMobileMenu(true)}
            statuses={statuses}
            onConfirm={confirmSite}
            onReject={rejectSite}
            onImageClick={setSelectedReport}
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
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}