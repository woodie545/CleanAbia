import React, { useEffect, useRef, useState } from 'react';
import { imgList } from './carousel';
import { HiOutlineCamera } from 'react-icons/hi2';
import { NavLink } from 'react-router-dom';

// Reusable Counter component for individual stat numbers
function Counter({ start = 0, end, duration = 2000, prefix = '', suffix = '', decimals = 0 }) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTime = null;
    let animationFrameId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth step calculation
      const currentNumber = start + progress * (end - start);
      setCount(currentNumber);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [start, end, duration]);

  // Format with specified decimal places or standard number formatting
  const formattedValue = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toLocaleString();

  return (
    <span>
      {prefix}{formattedValue}{suffix}
    </span>
  );
}

export default function Hero() {
  const sliderRef = useRef(null);

  // Auto-scrolling Carousel effect
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const interval = setInterval(() => {
      const cardWidth = slider.clientWidth;
      // Check if reached scroll end (with buffer for precision)
      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col lg:flex-row justify-between p-4 sm:p-8 lg:p-12 items-center gap-8 lg:gap-12 max-w-7xl mx-auto">
      {/* Left Content */}
      <div className="w-full lg:w-5/12 space-y-6">
        <p className="text-green-700 text-xs sm:text-sm font-semibold tracking-wide">
          - ABIA STATE WASTE-TO-VALUE NETWORK
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Earn money while keeping Abia
          <span className="text-green-700"> clean</span>
          <span className="text-amber-600">.</span>
        </h1>

        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
          CleanAbia connects everyday Residents, Verified sanitation Agents and
          Recycling centers—turning dirty sites into cleaned land, and Waste into
          Wages and Watts.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 border-b border-gray-300 pb-6">
          <button className="border border-amber-400 px-6 py-3 text-sm rounded-md flex items-center justify-center gap-2 bg-amber-400 font-medium hover:bg-amber-500 transition-colors">
            <HiOutlineCamera className="text-xl" />
            Report a dirty site
          </button>
          <NavLink 
            to="/Agent" 
            className="border border-gray-400 px-6 py-3 text-sm rounded-md text-center font-medium hover:bg-gray-50 transition-colors"
          >
            Join as an Agent
          </NavLink>
        </div>

        {/* Dynamic Animated Numbers Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-xs">
          <div className="text-center p-2 rounded-lg bg-gray-50/50 sm:bg-transparent">
            <p className="font-semibold font-mono text-lg sm:text-xl text-gray-900">
              <Counter start={0} end={12480} duration={2000} />
            </p>
            <span className="text-gray-600">Sites Reported</span>
          </div>

          <div className="text-center p-2 rounded-lg bg-gray-50/50 sm:bg-transparent">
            <p className="font-semibold font-mono text-lg sm:text-xl text-gray-900">
              <Counter start={0} end={8920} duration={2000} />
            </p>
            <span className="text-gray-600">Sites Cleared</span>
          </div>

          <div className="text-center p-2 rounded-lg bg-gray-50/50 sm:bg-transparent">
            <p className="font-semibold font-mono text-lg sm:text-xl text-gray-900">
              <Counter 
                start={0} 
                end={48.2} 
                duration={2000} 
                prefix="₦" 
                suffix="M" 
                decimals={1} 
              />
            </p>
            <span className="text-gray-600">Paid to Recycle</span>
          </div>

          <div className="text-center p-2 rounded-lg bg-gray-50/50 sm:bg-transparent">
            <p className="font-semibold font-mono text-lg sm:text-xl text-gray-900">
              <Counter start={0} end={17} duration={1500} />
            </p>
            <span className="text-gray-600">LGAs Covered</span>
          </div>
        </div>
      </div>

      {/* Right Carousel */}
      <div
        ref={sliderRef}
        className="w-full lg:w-1/2 h-80 sm:h-96 md:h-110 border rounded-xl flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory shadow-sm"
        style={{ scrollbarWidth: 'none' }}
      >
        {imgList.map((i) => (
          <div key={i.id} className="w-full shrink-0 snap-start relative h-full">
            <img src={i.img} alt="" className="w-full h-full object-cover" />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

            {/* Text Overlay */}
            <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col-reverse gap-1">
              <h2 className="text-xl sm:text-2xl font-semibold font-mono drop-shadow">{i.text}</h2>
              <p className="text-amber-300 font-mono text-xs sm:text-sm">{i.description || i.descriprion}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}