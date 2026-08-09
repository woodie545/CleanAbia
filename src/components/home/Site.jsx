import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function SiteEtiquette() {
  return (
    <section className="bg-[#0b3323] text-white py-16 px-6 md:px-16 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        
        {/* Left Column: Heading & Content */}
        <div className="max-w-2xl">
          {/* Subtitle / Category Tag */}
          <div className="flex items-center gap-2 mb-4">
            <span className="w-4 h-[1.5px] bg-[#d97706] inline-block"></span>
            <span className="text-[#d97706] text-xs font-semibold tracking-wider uppercase">
              SITE ETIQUETTE
            </span>
          </div>

          {/* Main Title */}
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 tracking-tight">
            A few house rules, so the loop stays fair
          </h2>

          {/* Description */}
          <p className="text-[#87a892] text-sm sm:text-base leading-relaxed">
            Report real, current sites only. Don't stand in traffic or private property for a
            photo. Agents: confirm the site matches the report before marking a job
            complete.
          </p>
        </div>

        {/* Right Column: Reminder Card */}
        <div className="w-full md:w-auto bg-[#0d3b29] border border-[#164c36] rounded-xl p-5 md:max-w-sm flex items-start gap-4 shadow-sm">
          {/* Warning Icon */}
          <AlertTriangle className="w-5 h-5 text-[#f59e0b] shrink-0 mt-0.5" />

          {/* Card Text */}
          <div className="space-y-1">
            <h3 className="text-white font-semibold text-sm">
              Reminder
            </h3>
            <p className="text-[#7ea28b] text-xs sm:text-sm leading-relaxed">
              Sanitation exercise holds every last Saturday of the month across Abia LGAs, 7am–10am.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}