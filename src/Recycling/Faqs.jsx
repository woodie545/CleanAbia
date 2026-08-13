//import React from 'react'
 import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { faq } from "@/Recycling/faq";


export default function Faqs() {
    const [open, setOpen] = useState(0);

   const toggle = (index) => {
     setOpen(open === index ? null : index);
   }
  return (
    <section className="bg-[#EEF5EE] py-20 px-6">
      <div className="max-w-4xl mx-auto">

        <p className="uppercase tracking-[0.3em] text-xs text-gray-500 mb-3">
          FAQ
        </p>

        <h2 className="text-4xl font-semibold mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-5">

          {faq.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
            >

              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center px-7 py-6"
              >

                <span className="text-left font-semibold text-lg">
                  {item.question}
                </span>

                {open === index ? (
                  <FiMinus size={22} />
                ) : (
                  <FiPlus size={22} />
                )}
              </button>

              <div
                className={`transition-all duration-300 overflow-hidden ${
                  open === index
                    ? "max-h-40 px-7 pb-6"
                    : "max-h-0"
                }`}
              >
                <p className="text-gray-600 leading-7">
                  {item.answer}
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  )
}