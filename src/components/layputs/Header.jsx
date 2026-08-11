import React, { useState } from 'react';
import { Link as navList, authLinks } from '../navList';
import { NavLink } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-190">
      <div className="flex justify-between items-center px-4 sm:px-7 py-2">
        {/* Logo Section */}
        <div className="flex items-center">
          <img src="/MAIN LOGO 2.png" alt="CleanAbia Logo" className="w-14 h-14 sm:w-18 sm:h-18" />
          <div className="text-left ml-2">
            <h1 className="text-xl sm:text-2xl font-semibold text-green-700 leading-tight">
              Clean<span className="text-black">Abia</span>
              <span className="text-amber-400">.</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-600">Together for a Cleaner Abia</p>
          </div>
        </div>

        {/* Desktop Main Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          {navList.map((l, idx) => (
            <NavLink
              key={idx}
              to={l.path}
              className={({ isActive }) =>
                `font-medium transition-colors hover:text-amber-600 ${
                  isActive ? 'text-amber-600 font-semibold' : 'text-gray-700'
                }`
              }
            >
              {l.title}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Auth Navigation */}
        <nav className="hidden md:flex space-x-4 items-center">
          {authLinks.map((l, idx) => (
            <NavLink
              key={idx}
              to={l.path}
              className={`px-5 py-2.5 font-semibold transition-all ${
                l.title === 'Signup'
                  ? 'bg-green-900 rounded-3xl text-white hover:bg-green-800'
                  : 'text-green-900 hover:text-green-700'
              }`}
            >
              {l.title}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Hamburger Toggle Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-gray-700 text-3xl focus:outline-none p-1"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col space-y-4 shadow-inner">
          {/* Main Links */}
          <div className="flex flex-col space-y-3 pb-3 border-b border-gray-200">
            {navList.map((l, idx) => (
              <NavLink
                key={idx}
                to={l.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-lg font-medium py-1 transition-colors ${
                    isActive ? 'text-amber-600 font-semibold' : 'text-gray-700'
                  }`
                }
              >
                {l.title}
              </NavLink>
            ))}
          </div>

          {/* Auth Links */}
          <div className="flex flex-col space-y-3 pt-1">
            {authLinks.map((l, idx) => (
              <NavLink
                key={idx}
                to={l.path}
                onClick={() => setIsOpen(false)}
                className={`text-center py-2.5 font-semibold rounded-lg transition-all ${
                  l.title === 'Signup'
                    ? 'bg-green-900 text-white hover:bg-green-800'
                    : 'text-green-900 border border-green-900 hover:bg-green-50'
                }`}
              >
                {l.title}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}