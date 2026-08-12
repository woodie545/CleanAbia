import React, { useState, useEffect } from 'react';
import Process from './Process';

const wasteImages = [
  { src: "/plastic-bottles-recycle-images.webp", stage: "Collection" },
  { src: "/Waste-Energy image.jpg", stage: "Sorting" },
  { src: "/Waste-Energy-landfill.webp", stage: "Processing" },
  { src: "/Waste-Energy-Machines.webp", stage: "Power Generation" },
];

function Waste({ images = wasteImages, interval = 4000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval]);

  const activeStage = images[currentIndex]?.stage;

  return (
    <section className="relative min-h-screen overflow-hidden">

      {/* Background Slideshow */}
      <div className="fixed inset-0 -z-20 overflow-hidden bg-[#0B1F14]">
        {images.map((image, index) => (
          <div
            key={image.src}
            style={{ backgroundImage: `url('${image.src}')` }}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1400ms] ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      {/* Readability overlay */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-t from-[#0B1F14] via-[#0B1F14]/70 to-[#0B1F14]/30" />
      <div className="fixed inset-0 -z-10 bg-gradient-to-r from-[#0B1F14]/90 via-[#0B1F14]/40 to-transparent" />

      {/* Foreground Content */}
      <div className="relative z-10 flex min-h-screen flex-col justify-between px-6 py-10 md:px-12 md:py-14">

        {/* Top bar */}
        <div className="flex items-center justify-between">
          <a
            href="/"
            className="group inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-[#F3F5EE] ring-1 ring-inset ring-white/15 backdrop-blur-sm transition-all hover:bg-[#1E5B3E] hover:ring-[#1E5B3E]"
          >
            <span aria-hidden="true" className="transition-transform group-hover:-translate-x-0.5">←</span>
            Back to home
          </a>

          <span className="hidden rounded-full bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-[#9fb8ab] ring-1 ring-inset ring-white/15 backdrop-blur-sm md:inline-block">
            Abia State Grid
          </span>
        </div>

        {/* Hero copy */}
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#3db97d]">
            — Waste to Energy
          </p>

          <h1 className="font-mono text-4xl font-bold leading-[1.08] tracking-tight text-[#F3F5EE] sm:text-5xl lg:text-6xl">
            From waste to watts: how your recyclables become power
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#c3c9c4] sm:text-lg">
            Every drop-off does double duty — you're paid for the material itself,
            and what can't be resold is processed into electricity that feeds
            back into Abia State's grid. Here's what happens after you hand it over.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button className="inline-flex items-center gap-2 rounded-lg bg-[#1E5B3E] px-6 py-3 font-medium text-white transition-colors hover:bg-[#24714c]">
              See the process
              <span aria-hidden="true">→</span>
            </button>
            <a
              href="/tracker"
              className="text-sm font-medium text-[#9fb8ab] underline decoration-[#3db97d]/40 underline-offset-4 transition-colors hover:text-[#F3F5EE] hover:decoration-[#3db97d]"   
            >
              Start logging recyclables
            </a>
          </div>
        </div>

        {/* Stage indicator, synced to the slideshow */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#9fb8ab]">
            {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')} — {activeStage}
          </p>
          <div className="flex gap-2">
            {images.map((image, index) => (
              <div
                key={image.src}
                className="h-1 flex-1 overflow-hidden rounded-full bg-white/15 sm:max-w-[96px]"
              >
                <div
                  className={`h-full bg-[#3db97d] transition-all ease-linear ${
                    index === currentIndex
                      ? 'w-full'
                      : index < currentIndex
                      ? 'w-full opacity-40'
                      : 'w-0'
                  }`}
                  style={
                    index === currentIndex
                      ? { transitionDuration: `${interval}ms` }
                      : undefined
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Waste;
