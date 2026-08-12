//import React from 'react'
import { IoCheckmarkSharp, IoCloseSharp } from "react-icons/io5";
import { accepted, rejected } from "../../data/acceptedItems";

export default function AcceptedItems() {
  return (
    <section className="bg-[#EEF5EE] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="uppercase tracking-[0.3em] text-xs text-gray-500 mb-3">
          Before You Go
        </p>
        <h2 className="text-4xl font-semibold text-[#1F2937] mb-12">
          What you can — and can't — bring
        </h2>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-[#124C2E] mb-8">
              Accepted
            </h3>

            <div className="space-y-5">
              {accepted.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-4"
                >
                  <IoCheckmarkSharp
                    className="text-green-700 mt-1 shrink-0"
                    size={20}
                  />

                  <p className="text-gray-700 leading-7">
                    {item}
                  </p>
                </div>
              ))}
            </div>

          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-red-600 mb-8">
              Not accepted at drop-off
            </h3>

            <div className="space-y-5">
              {rejected.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-4"
                >
                  <IoCloseSharp
                    className="text-red-500 mt-1 shrink-0"
                    size={20}
                  />
                  <p className="text-gray-700 leading-7">
                    {item}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}