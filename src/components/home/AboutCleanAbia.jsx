import React from 'react';
import { DollarSign, Eye, Zap } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const partners = [
  'ABIA MIN. OF ENVIRONMENT',
  'GREENGRID ENERGY',
  'UMUAHIA LGA COUNCIL',
  'ARIARIA TRADERS UNION',
  'NASENI ABIA',
];

const cards = [
  {
    icon: DollarSign,
    title: 'Our mission',
    description:
      'Make it effortless for every Abia resident to report, clear and recycle waste — and get paid fairly for the effort they put in.',
  },
  {
    icon: Eye,
    title: 'Our vision',
    description:
      'A state where no dumpsite outlives a single report, and waste is treated as a resource that funds households, not a burden that\'s ignored.',
  },
  {
    icon: Zap,
    title: 'Our goals',
    description:
      'Clear 100,000 reported sites, pay out over ₦500M to reporters and agents, and help power 10,000 homes from recovered waste by 2030.',
  },
];

export default function AboutCleanAbia() {
  return (
    <section className="bg-[#f7f9f4] py-16 px-6 md:px-12 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Partners Banner */}
        <div className="text-center">
          <p className="text-xs text-gray-500 font-medium mb-8 tracking-wide">
            In partnership with
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {partners.map((partner, index) => (
              <span
                key={index}
                className="text-xs sm:text-sm font-mono tracking-widest text-gray-500 font-semibold uppercase"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="text-center max-w-3xl mx-auto space-y-6 pt-4">
          {/* Subtitle Badge */}
          <div className="inline-flex items-center gap-2">
            <span className="w-4 h-[1.5px] bg-[#1a4332]" />
            <span className="text-xs font-semibold tracking-widest text-[#1a4332] uppercase">
              ABOUT CLEANABIA
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0d2a1f] tracking-tight leading-tight">
            Cleaner streets, real income, homegrown energy
          </h2>

          {/* Paragraph */}
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            CleanAbia started as a final-year group project focused on one question: what would it take for Abia State residents to actually want to report a dirty site? The answer was to make it fast, and to make it pay.
          </p>

          {/* CTA Button */}
          <div className="pt-2">
            <NavLink
              to="/about"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-900 text-gray-900 text-xs sm:text-sm font-medium hover:bg-gray-900 hover:text-white transition-all duration-200"
            >
              Learn more about CleanAbia
              <span>→</span>
            </NavLink>
          </div>
        </div>

        {/* 3-Column Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border border-gray-100/80 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] flex flex-col items-start text-left space-y-4"
              >
                {/* Icon Container */}
                <div className="w-10 h-10 rounded-lg bg-[#e2f0e8] text-[#1a4332] flex items-center justify-center">
                  <Icon className="w-5 h-5 stroke-[2]" />
                </div>

                {/* Card Title */}
                <h3 className="text-lg font-bold text-[#0d2a1f]">
                  {card.title}
                </h3>

                {/* Card Description */}
                <p className="text-gray-500 text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
