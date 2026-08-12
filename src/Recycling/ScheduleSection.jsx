//import React from 'react'
import { schedule } from "../../Data/Schedule"

export default function ScheduleSection() {
  return (
    <section id="schedule" className="bg-[#F2F7F2] py-20 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

          <div className="px-8 py-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">
              Full schedule
            </h2>
          </div>

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">

              <thead>
                <tr className="text-left text-sm uppercase tracking-wide text-gray-500">
                  <th className="px-8 py-5">Zone</th>
                  <th className="px-8 py-5">Days</th>
                  <th className="px-8 py-5">Time</th>
                </tr>
              </thead>

              <tbody>
                {schedule.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="px-8 py-6 font-medium text-gray-900">
                      {item.zone}
                    </td>

                    <td className="px-8 py-6">
                      <div className="flex flex-wrap gap-2">
                        {item.days.map((day) => (
                          <span
                            key={day}
                            className="bg-[#E8F5EB] text-[#0F6B43] text-sm font-medium px-3 py-1 rounded-md"
                          >
                            {day}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="px-8 py-6 text-gray-700">
                      {item.time}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          <div className="md:hidden p-5 space-y-5">
            {schedule.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-2xl p-5"
              >
                <h3 className="font-semibold text-lg">
                  {item.zone}
                </h3>

                <div className="flex flex-wrap gap-2 mt-4">
                  {item.days.map((day) => (
                    <span
                      key={day}
                      className="bg-[#E8F5EB] text-[#0F6B43] text-sm px-3 py-1 rounded-md"
                    >
                      {day}
                    </span>
                  ))}
                </div>

                <p className="mt-4 text-gray-600">
                  {item.time}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}