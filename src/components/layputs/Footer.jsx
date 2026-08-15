import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0b3323] text-[#a1beaa] py-12 px-6 md:px-16 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4 pr-0 md:pr-8">
            <div className="flex items-center gap-3">
              {/* Custom Dotted Sun/Gear Logo */}
              <div className="relative w-8 h-8 flex items-center justify-center">
                <img src="/MAIN LOGO 2.png" alt="" />
              </div>
              <span className="text-white font-bold text-2xl tracking-tight">CleanAbia</span>
            </div>
            <p className="text-[#87a892] text-sm leading-relaxed max-w-sm">
              A community sanitation and recycling network for Abia State — report, recycle, and get rewarded.
            </p>
          </div>

          {/* Product Navigation */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest text-[#72947e] uppercase mb-5">
              PRODUCT
            </h3>
            <ul className="space-y-3 text-sm font-medium text-[#c8d9cc]">
              <li><NavLink to="/Report" className="hover:text-white transition-colors">Report a site</NavLink></li>
              <li><NavLink to="/Agent" className="hover:text-white transition-colors">Become an agent</NavLink></li>
              <li><NavLink to="/Recycling" className="hover:text-white transition-colors">Recycling centres</NavLink></li>
            </ul>
          </div>

          {/* Company Navigation */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest text-[#72947e] uppercase mb-5">
              COMPANY
            </h3>
            <ul className="space-y-3 text-sm font-medium text-[#c8d9cc]">
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#etiquette" className="hover:text-white transition-colors">Sanitation etiquette</a></li>
              <li><a href="#waste-to-energy" className="hover:text-white transition-colors">Waste-to-energy</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest text-[#72947e] uppercase mb-5">
              CONTACT
            </h3>
            <ul className="space-y-3 text-sm font-medium text-[#c8d9cc]">
              <li>Umuahia, Abia State</li>
              <li>
                <a href="mailto:hello@cleanabia.ng" className="hover:text-white transition-colors">
                  hello@cleanabia.ng
                </a>
              </li>
              <li>
                <a href="tel:+2348000000000" className="hover:text-white transition-colors">
                  +234 800 000 0000
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Divider and Copyright */}
        <div className="border-t border-[#164432] pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#6e8e7a] gap-4">
          <p>© 2026 CleanAbia. Built for Abia State.</p>
          <div className="flex gap-2">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
            <span>·</span>
            <a href="#terms" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}