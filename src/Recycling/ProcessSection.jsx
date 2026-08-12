//import React from 'react'
import { processSteps } from "../../Data/ProcessSteps";

export default function ProcessSection() {
  return (
    <section className="bg-[#F7FAF7] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="uppercase tracking-[0.3em] text-xs text-gray-500 mb-3">
          The Process
        </p>
        <h2 className="text-4xl font-semibold text-gray-900 mb-12">
          How a drop-off works
        </h2>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10">
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="hidden lg:block absolute top-8 left-20 right-20 h-0.5 bg-gray-200"></div>

            {processSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.id}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="relative z-10 w-16 h-16 rounded-full border-2 border-[#0F6B43] bg-white flex items-center justify-center">
                    <Icon className="text-[#0F6B43]" size={24} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-gray-900">
                    {step.id}. {step.title}
                  </h3>
                  <p className="mt-3 text-sm text-gray-600 leading-6">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  )
}