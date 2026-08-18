import React, { useState } from 'react';
import { BsGrid } from 'react-icons/bs';
import { FaRegBell } from 'react-icons/fa6';
import { GoPerson, GoStack } from 'react-icons/go';
import { LuCircleDollarSign } from 'react-icons/lu';
import { RxCross2 } from 'react-icons/rx';

export default function Aside({
  setPages,
  isMobileMenuOpen,
  toggleMobileMenu,
  showToast,
  profile
}) {
  const [activeNav, setActiveNav] = useState('Overview');

  // Helper function to extract initials dynamically from full name
  const getInitials = (name) => {
    if (!name) return 'EO';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return parts[0][0]?.toUpperCase() || 'EO';
  };

  const navItems = [
    {
      label: 'Overview',
      icon: <BsGrid className="text-xl" />,
    },
    {
      label: 'Job Offers',
      icon: <FaRegBell className="text-xl" />,
    },
    {
      label: 'My Jobs',
      icon: <GoStack className="text-xl" />,
    },
    {
      label: 'Earnings',
      icon: <LuCircleDollarSign className="text-xl" />,
    },
    {
      label: 'Profile',
      icon: <GoPerson className="text-xl" />,
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileMenuOpen && (
        <div
          onClick={toggleMobileMenu}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* Aside / Mobile Drawer */}
      <aside
        className={`
          fixed md:sticky
          top-0 left-0
          h-screen
          z-50
          w-[260px]
          bg-[#123A28]
          text-white
          p-5
          flex flex-col
          transition-transform duration-300 ease-in-out

          ${
            isMobileMenuOpen
              ? 'translate-x-0'
              : '-translate-x-full md:translate-x-0'
          }
        `}
      >
        <div className="flex-1">
          {/* Logo + Close button */}
          <div className="flex justify-between items-center my-2 -ml-1">
            <div className="flex items-center gap-2">
              <img
                src="/Logo.png"
                alt="CleanAbia logo"
                className="h-10 w-10 object-contain"
              />

              <h2 className="font-medium text-xl text-white">
                CleanAbia
              </h2>
            </div>

            {/* Close button only appears on mobile */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-2xl text-white focus:outline-none"
              aria-label="Close menu"
            >
              <RxCross2 />
            </button>
          </div>

          {/* Navigation */}
          <section className="font-medium mt-4">
            {navItems.map((nav) => (
              <button
                key={nav.label}
                onClick={() => {
                  setActiveNav(nav.label);
                  setPages(nav.label);

                  // Close drawer after selecting a page on mobile
                  if (isMobileMenuOpen) {
                    toggleMobileMenu();
                  }
                }}
                className={`
                  w-full
                  flex
                  items-center
                  gap-3
                  p-3
                  rounded-xl
                  transition-all

                  ${
                    activeNav === nav.label
                      ? 'bg-[#1E5B3E] font-bold text-white shadow-sm'
                      : 'hover:bg-[#1A4B34] text-gray-200'
                  }
                `}
              >
                {nav.icon}
                <p>{nav.label}</p>
              </button>
            ))}
          </section>
        </div>

        {/* Bottom user section */}
        <section className="mt-auto mx-2 pb-4">
          <button
            onClick={() => showToast?.('Logging out...')}
            className="w-full border border-white/30 py-2 rounded-2xl hover:bg-white hover:text-[#123A28] transition-colors font-medium"
          >
            Log out
          </button>

          <div className="border-b border-gray-600 my-3"></div>

          <div className="flex gap-3 items-center">
            {/* Avatar / Initials Dynamic Display */}
            {profile?.image ? (
              <img
                src={profile.image}
                alt={profile?.name || 'User Profile'}
                className="w-10 h-10 rounded-full object-cover shrink-0"
              />
            ) : (
              <div className="flex items-center justify-center rounded-full bg-[#F2A93B] text-[#123A28] font-bold w-10 h-10 text-lg shrink-0">
                {getInitials(profile?.name)}
              </div>
            )}

            <div className="overflow-hidden">
              <h3 className="font-medium truncate">
                {profile?.name || 'Emeka Okoye'}
              </h3>

              <p className="text-sm text-gray-300 truncate">
                {profile?.role && profile?.location
                  ? `${profile.role}.${profile.location}`
                  : 'Agent.Umuahia'}
              </p>
            </div>
          </div>
        </section>
      </aside>
    </>
  );
}