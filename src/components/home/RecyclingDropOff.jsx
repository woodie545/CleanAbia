import React from 'react';
import CollectionMap from './CollectionMap';
import { NavLink } from 'react-router-dom';

export default function RecyclingDropOff() {
  const scheduleData = [
    { zone: 'Aba South Central', days: ['Mon', 'Wed', 'Fri'], time: '8am - 4pm' },
    { zone: 'Aba North Industrial', days: ['Tue', 'Thu', 'Sat'], time: '8am - 4pm' },
    { zone: 'Umuahia Main', days: ['Mon-Sat'], time: '9am - 5pm' },
    { zone: 'Ohafia', days: ['Wed', 'Sat'], time: '9am - 2pm' },
    { zone: 'Isuikwuato', days: ['Tue', 'Fri'], time: '9am - 2pm' },
    { zone: 'Arochukwu', days: ['Thu', 'Sat'], time: '9am - 2pm' },
  ];

  return (
    <section className="bg-[#f7f7ef] p-6 sm:p-12 lg:p-16 text-gray-800">
      <div className="max-w-7xl mx-auto space-y-10 lg:space-y-12">
        {/* Header Text Section */}
        <div className="space-y-4 max-w-3xl">
          <h3 className="text-xs sm:text-sm font-mono text-[#1f5a3e] tracking-widest uppercase">
            — RECYCLING DROP-OFF
          </h3>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-mono font-bold leading-tight text-gray-900">
            Bring your recyclables to a zone near you
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Six designated zones across Abia State accept recyclables on fixed days—no need to wait for a job offer, just show up with your sorted waste.
          </p>
          <NavLink
          to="/recycling"
          className="font-semibold text-xs sm:text-sm border border-[#1f5a3e] text-[#1f5a3e] rounded-full py-2.5 px-5 hover:bg-[#1f5a3e] hover:text-white transition-all cursor-pointer">
            Learn more about recycling &rarr;
          </NavLink>
        </div>

        {/* Content Section: 2 Columns on Desktop, 1 Column on Mobile */}
        <div className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-10 items-stretch">
          
          {/* Box 1: Info / Map Banner */}
          <div className="w-full lg:w-1/2 bg-[#e5efe6] rounded-2xl p-6 sm:p-8 flex flex-col justify-between min-h-[220px] lg:min-h-full border border-green-900/10 relative">
            <div>
              <p className="font-mono text-sm sm:text-base font-semibold text-[#1f5a3e] absolute top-6 left-6 ">
                6 Waste zones • Abia State
              </p>
            </div>

            <div>
              <CollectionMap className="" />
            </div>
            {/* Visual placeholder area */}
            <div className="mt-8 p-4 rounded-xl bg-white/50 backdrop-blur-xs border border-green-900/10 text-xs text-green-900 font-mono absolute bottom-6 left-6 z-50">
              📍 Drop-off points verified across Aba, Umuahia, and surrounding LGAs.
            </div>
          </div>

          {/* Box 2: Drop-Off Schedule Table Card */}
          <div className="w-full lg:w-1/2 bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-gray-100 flex flex-col justify-between">
            <div>
              <h2 className="font-mono text-lg sm:text-xl pb-4 font-bold text-[#1f5a3e] border-b border-gray-100">
                Days & drop-off periods
              </h2>

              {/* Table wrapper with x-axis overflow for ultra-small screens */}
              <div className="overflow-x-auto py-3">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="text-gray-400 font-mono border-b border-gray-100 uppercase text-[11px] tracking-wider">
                      <th className="py-2.5 pr-2 font-normal">Zone</th>
                      <th className="py-2.5 px-2 font-normal">Days</th>
                      <th className="py-2.5 pl-2 font-normal text-right">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {scheduleData.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-3 pr-2 font-medium text-gray-900 whitespace-nowrap">
                          {row.zone}
                        </td>
                        <td className="py-3 px-2 whitespace-nowrap">
                          <div className="flex flex-wrap gap-1">
                            {row.days.map((day, dIdx) => (
                              <span
                                key={dIdx}
                                className="bg-[#e5efe6] text-[#1f5a3e] text-[11px] font-semibold px-2 py-0.5 rounded-xs"
                              >
                                {day}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 pl-2 text-right font-mono text-gray-600 whitespace-nowrap">
                          {row.time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-gray-500 pt-4 border-t border-gray-100 leading-normal">
              Zones and hours can shift around public holidays—check your dashboard for live updates before you set out.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}