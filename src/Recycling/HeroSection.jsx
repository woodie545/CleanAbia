//import React from 'react'
 import { IoArrowBack } from "react-icons/io5";
 import { FiMapPin } from "react-icons/fi";

export default function HeroSection() {
  return (
    <section className="pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <button className="flex items-center gap-2 text-[#17382B] hover:text-green-900 transition-colors">
           <IoArrowBack size={18} /> 
          <span className="font-medium">Back to Home</span>
        </button>

        {/* Hero content */}
        <div className="mt-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-[#17382B]">
             <FiMapPin /> 
            Recycling Centers
          </div>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
            Find Your Nearest
            <br />
            Recycling Drop-off Point
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            You don't need a job offer to recycle — six designated zones across Abia State accept recyclables on fixed days, weigh them on the spot, and pay you before you leave.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-full bg-[#17382B] px-6 py-3 font-semibold text-white transition hover:bg-green-700" onClick={() =>document.getElementById("zones")?.scrollIntoView({behavior: "smooth",})}>
              View Recycling Zones
            </button>

            <button className="rounded-full border border-[#17382B] px-6 py-3 font-semibold text-[#17382B] transition hover:bg-green-50" onClick={() =>document.getElementById("schedule")?.scrollIntoView({behavior: "smooth"})}>
              Collection Schedule
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}