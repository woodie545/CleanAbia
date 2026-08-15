import React from 'react';
import { FaCircle } from 'react-icons/fa';
import { steps } from './carousel';
import { NavLink } from 'react-router-dom';

export default function WasteToEnergy() {
  const earningsData = [
    {
      material: 'Plastics (PET / HDPE)',
      color: 'text-[#245938]',
      rate: '₦150 / kg',
      est10kg: '₦1,500',
    },
    {
      material: 'Metals (scrap, cans)',
      color: 'text-[#c7800d]',
      rate: '₦280 / kg',
      est10kg: '₦2,800',
    },
    {
      material: 'Paper & cardboard',
      color: 'text-[#798f50]',
      rate: '₦90 / kg',
      est10kg: '₦900',
    },
    {
      material: 'Organic waste',
      color: 'text-[#487a60]',
      rate: '₦60 / kg',
      est10kg: '₦600',
    },
    {
      material: 'E-waste',
      color: 'text-[#b5392e]',
      rate: '₦350 / kg',
      est10kg: '₦3,500',
    },
  ];

  return (
    <section className="bg-[#e5efe6] p-4 sm:p-10 lg:p-16 text-gray-800">
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12">
        
        {/* Top Hero Section */}
        <section className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-12">
          {/* Text Container */}
          <div className="space-y-4 lg:space-y-5 w-full lg:w-1/2">
            <h3 className="text-[#1f5a3e] text-xs sm:text-sm font-mono tracking-widest uppercase font-semibold">
              — WASTE TO ENERGY
            </h3>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-mono font-bold text-gray-900 leading-tight">
              Turn recyclables into cash — and power
            </h1>
            <p className="text-[#474b48] text-sm sm:text-base lg:text-lg leading-relaxed">
              Every kilogram you bring in is weighed, sorted and paid for on the spot — then routed to Abia State's waste-to-energy partners, where it's converted into electricity that feeds back into the local grid.
            </p>
            <div className="pt-2">
              <NavLink 
                to="/wastetoenergy"
              className="w-full sm:w-auto border border-[#103021] rounded-2xl px-5 py-2.5 font-semibold text-[#103021] hover:bg-[#103021] hover:text-white transition-all cursor-pointer text-xs sm:text-sm">
                Learn more about waste-to-energy &rarr;
              </NavLink>
            </div>
          </div>

          {/* Image Container */}
          <div className="w-full lg:w-1/2 h-64 sm:h-80 lg:h-96 border border-black/5 rounded-2xl overflow-hidden shadow-xs shrink-0">
            <img
              src="/convert.png"
              alt="Waste to Energy conversion"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Rates Table Section */}
        <section className="bg-white rounded-2xl shadow-xs border border-gray-100 p-5 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 font-mono text-xs sm:text-sm mb-6 pb-4 border-b border-gray-100">
            <h2 className="font-bold text-[#0c2e22] text-base sm:text-lg">What you earn per drop-off</h2>
            <span className="self-start sm:self-auto bg-[#e4efea] text-[#1f5a3e] px-3 py-1 rounded-full font-semibold text-[11px] sm:text-xs">
              PAID SAME DAY
            </span>
          </div>

          {/* Mobile Card View (< sm) */}
          <div className="block sm:hidden divide-y divide-gray-100">
            {earningsData.map((item, idx) => (
              <div key={idx} className="py-3 space-y-1">
                <div className="flex items-center gap-2 font-semibold text-xs text-gray-900">
                  <FaCircle className={`text-[10px] shrink-0 ${item.color}`} />
                  <span>{item.material}</span>
                </div>
                <div className="flex justify-between items-center text-xs pt-1 pl-4">
                  <span className="text-gray-500 font-mono">Rate: <strong className="text-gray-800">{item.rate}</strong></span>
                  <span className="text-gray-500 font-mono">10kg: <strong className="text-[#1f5a3e]">{item.est10kg}</strong></span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop & Tablet Table View (≥ sm) */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-400 font-mono text-xs uppercase tracking-wider border-b border-gray-100">
                  <th className="py-3 font-medium">MATERIAL</th>
                  <th className="py-3 font-medium text-right">RATE</th>
                  <th className="py-3 font-medium text-right">EST. FOR 10KG</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-xs sm:text-sm">
                {earningsData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 font-semibold text-gray-900">
                      <div className="flex items-center gap-2">
                        <FaCircle className={`text-[10px] ${item.color}`} />
                        <span>{item.material}</span>
                      </div>
                    </td>
                    <td className="py-3.5 text-right font-mono text-gray-700">{item.rate}</td>
                    <td className="py-3.5 text-right font-mono font-semibold text-[#1f5a3e]">{item.est10kg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[11px] sm:text-xs text-gray-500 mt-6 pt-4 border-t border-gray-100 leading-relaxed">
            Rates are reviewed monthly. Payment is released once your drop-off is weighed and confirmed at the centre — usually within the hour, straight to your CleanAbia balance.
          </p>
        </section>

        {/* Workflow Steps Section */}
        <section className="bg-white rounded-2xl p-5 sm:p-8 shadow-xs border border-gray-100">
          <h2 className="text-lg sm:text-2xl font-bold text-[#0c2e22] mb-6 sm:mb-8 font-mono">
            How the conversion actually works
          </h2>

          <div className="relative">
            {/* Horizontal connecting line on md+ screens */}
            <div className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] h-[1.5px] bg-gray-200 z-0" />

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 relative z-10">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.number}
                    className="flex flex-col items-center text-center px-2"
                  >
                    {/* Icon Circle */}
                    <div className="w-14 h-14 rounded-full bg-white border-2 border-[#154d38] flex items-center justify-center mb-4 text-[#154d38] shadow-xs">
                      <Icon className="w-6 h-6 stroke-[1.75]" />
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-[#0c2e22] text-sm sm:text-base mb-2">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-xs">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </div>
    </section>
  );
}