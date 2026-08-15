//import React from 'react'
import { useState } from "react";
import {
  FaLocationDot,
  FaRecycle,
  FaXmark,
} from "react-icons/fa6";
import locations from "@/Recycling/locations";

export default function ZoneMap() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  return (
    <div className="relative h-105 overflow-hidden rounded-3xl bg-[#E5EEE5] sm:h-125 lg:h-137.5">
      <img
        src="public/Abia map.png"
        alt="Map of Abia State"
        className="absolute inset-0 h-full w-full object-contain"
      />

      <div className="absolute left-3 top-3 z-30 flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-md sm:left-5 sm:top-5 sm:px-4 sm:py-3">
        <FaLocationDot
          className="h-3.5 w-3.5 text-[#0F6B43] sm:h-4 sm:w-4"
        />

        <span className="text-[11px] font-semibold text-[#17382B] sm:text-sm">
          9 active zones · Abia State
        </span>
      </div>

      {locations.map((location) => (
        <button
          key={location.id}
          type="button"
          onClick={() => setSelectedLocation(location)}
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hover:scale-110"
          style={{
            top: location.top,
            left: location.left,
          }}
          aria-label={`View ${location.name} recycling zone`}
        >
          <div className="relative">

            <FaLocationDot
              className="h-9 w-9 text-[#0F6B43] drop-shadow-md sm:h-11 sm:w-11"
            />

            <FaRecycle
              className="absolute left-1/2 top-[18%] h-3 w-3 -translate-x-1/2 text-white sm:h-4 sm:w-4"
            />

          </div>

          <span className="absolute left-1/2 top-9 -translate-x-1/2 whitespace-nowrap rounded-md bg-white px-1.5 py-1 text-[9px] font-semibold text-[#26352D] shadow-sm sm:top-11 sm:px-2 sm:text-xs">
            {location.name}
          </span>
        </button>
      ))}

      {selectedLocation && (
        <div className="absolute left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-70 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-4 shadow-2xl sm:p-5">

          <button
            type="button"
            onClick={() => setSelectedLocation(null)}
            className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 sm:h-8 sm:w-8"
            aria-label="Close location details"
          >
            <FaXmark size={13} />
          </button>

          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF4EA] sm:mb-4 sm:h-12 sm:w-12">
            <FaRecycle
              className="h-5 w-5 text-[#0F6B43] sm:h-5.5 sm:w-5.5"
            />
          </div>

          <h3 className="text-lg font-bold text-[#17241E] sm:text-xl">
            {selectedLocation.name}
          </h3>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            {selectedLocation.address}
          </p>

          <p className="mt-3 text-sm font-semibold text-[#0F6B43] sm:mt-4">
            {selectedLocation.days}
          </p>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            {selectedLocation.time}
          </p>

          <button
            type="button"
            className="mt-4 rounded-lg bg-[#0F6B43] px-4 py-2 text-xs font-semibold text-white hover:bg-[#095533] sm:mt-5 sm:text-sm"
          >
            View details
          </button>

        </div>
      )}

      <div className="absolute bottom-3 left-3 z-30 rounded-xl bg-white px-3 py-2 shadow-md sm:bottom-5 sm:left-5 sm:rounded-2xl sm:px-5 sm:py-4">
        <p className="text-[10px] text-gray-500 sm:text-xs">
          Active recycling network
        </p>

        <p className="mt-1 text-xs font-semibold text-[#0F6B43] sm:text-sm">
          9 locations across Abia State
        </p>
      </div>

    </div>
  )
}