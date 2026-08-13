import React from 'react'
import { roadmap } from './RoadmapData'

export default function RoadMap() {
  return (
   <section className="w-full bg-[#E4EEE6] py-16 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Top label */}
        <div className="flex items-center gap-3 text-[#2d6b52] uppercase tracking-[0.2em] text-xs font-semibold mb-4">
          <span className="w-10 h-px bg-[#2d6b52]"></span>
          <span>Roadmap</span>
        </div>

        {/* Heading */}
        <h2 className="text-4xl font-bold text-[#111827] mb-12">
          Where we're headed
        </h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[18px] top-2 bottom-2 w-px bg-[#d6ddd4]"></div>

          <div className="space-y-14">
            {roadmap.map((item) => (
              <div key={item.year} className="relative flex gap-6">
                {/* Circle */}
                <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#165c3d] text-white text-sm font-bold shadow-sm">
                  {item.badge}
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  <p className="text-sm font-semibold text-[#2d6b52] mb-1">
                    {item.year}
                  </p>

                  <h3 className="text-2xl font-bold text-[#111827] mb-3">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 leading-7 text-[15px]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  
  )
}
