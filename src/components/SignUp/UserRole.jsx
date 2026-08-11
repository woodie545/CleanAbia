import React from 'react';
import { Camera, Layers, Check } from 'lucide-react';

export default function UserRoles({setPage}) {
  const reporterFeatures = [
    'Camera + auto-location reporting, no forms to fill',
    'Earn points for every confirmed report',
    'Withdraw cash once you hit the payout threshold',
    'Track your neighbourhood getting cleaner over time',
  ];

  const agentFeatures = [
    'Job offers sent to your dashboard and your email',
    'First to accept gets the job — simple and fair',
    'Paid once recyclables are confirmed at drop-off',
    'Build a public rating that unlocks bigger jobs',
  ];

  return (
    <section className="bg-[#f7f7ef] min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-gray-800 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Section Heading */}
        <p className="text-gray-600 text-sm sm:text-base text-left font-normal">
          CleanAbia runs on two roles working together — pick the one that fits you.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          
          {/* Card 1: Reporter */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs border border-gray-100/80 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Icon Badge */}
              <div className="w-12 h-12 rounded-xl bg-[#e5efe6] flex items-center justify-center text-[#1f5a3e]">
                <Camera className="w-6 h-6" />
              </div>

              {/* Title & Description */}
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
                  Sign up as a Reporter
                </h2>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  See a dumpsite, a blocked drain, an overflowing bin? Report it in under a minute and earn points every time it's confirmed.
                </p>
              </div>

              {/* Features List */}
              <ul className="space-y-3.5 pt-2">
                {reporterFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-600 leading-snug">
                    <Check className="w-4 h-4 text-gray-800 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button onClick={() => setPage('Reporter')} className="w-full sm:w-auto bg-[#1f5a3e] hover:bg-[#15412c] text-white font-medium text-sm py-3 px-6 rounded-full transition-colors duration-200 cursor-pointer">
                Sign up as Reporter
              </button>
            </div>
          </div>

          {/* Card 2: Agent */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs border border-gray-100/80 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Icon Badge */}
              <div className="w-12 h-12 rounded-xl bg-[#fef3e2] flex items-center justify-center text-[#e6931e]">
                <Layers className="w-6 h-6" />
              </div>

              {/* Title & Description */}
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
                  Sign up as an Agent
                </h2>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Take on verified clean-up and recycling-collection jobs near you, and get paid per completed job — plus recyclables you bring in yourself.
                </p>
              </div>

              {/* Features List */}
              <ul className="space-y-3.5 pt-2">
                {agentFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-600 leading-snug">
                    <Check className="w-4 h-4 text-gray-800 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button onClick={() => setPage('Agent')} className="w-full sm:w-auto bg-[#e6931e] hover:bg-[#cf8014] text-[#103021] font-semibold text-sm py-3 px-6 rounded-full transition-colors duration-200 cursor-pointer">
                Sign up as Agent
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}