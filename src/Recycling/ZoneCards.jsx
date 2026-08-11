//import React from 'react'
import { FaRecycle, FaArrowRight } from "react-icons/fa6";

export default function ZoneCards({location}) {
  return (
    <div className="group flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#EAF4EA]">
        <FaRecycle
          size={25}
          className="text-[#0F6B43]"
        />
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-bold text-[#17241E]">
          {location.name}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {location.address}
        </p>

        <p className="mt-2 text-sm font-medium text-[#0F6B43]">
          {location.days}
          <span className="mx-2">•</span>
          {location.time}
        </p>
      </div>

      <FaArrowRight
        size={18}
        className="text-[#0F6B43] transition-transform group-hover:translate-x-1"
      />

    </div>
  )
}