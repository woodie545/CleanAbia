import React from 'react';
import { 
  Camera, 
  Check, 
  User, 
  Box, 
  Zap, 
  DollarSign 
} from 'lucide-react';

export default function TheLoop() {
  // 6 steps distributed in order around the circle (360° / 6 = 60° step interval)
  const steps = [
    {
      number: '1',
      title: 'Report',
      description: 'Photo + GPS of a dirty site',
      icon: <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-800 hover:text-amber-600" />,
      badgeColor: 'border-emerald-800 bg-white hover:border-amber-600 hover:bg-amber-100',
      angle: -90, // Top center (12 o'clock)
    },
    {
      number: '2',
      title: 'Verify',
      description: 'Admin confirms the report',
      icon: <Check className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-800 hover:text-amber-600" />,
      badgeColor: 'border-emerald-800 bg-white hover:border-amber-600 hover:bg-amber-100',
      angle: -30, // 2 o'clock
    },
    {
      number: '3',
      title: 'Dispatch',
      description: 'Job offered to nearby agents',
      icon: <User className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-800 hover:text-amber-600" />,
      badgeColor: 'border-emerald-800 bg-white hover:border-amber-600 hover:bg-amber-100',
      angle: 30, // 4 o'clock
    },
    {
      number: '4',
      title: 'Collect',
      description: 'Site cleared, waste sorted',
      icon: <Box className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-800 hover:text-amber-600" />,
      badgeColor: 'border-emerald-800 bg-white hover:border-amber-600 hover:bg-amber-100',
      angle: 90, // Bottom center (6 o'clock)
    },
    {
      number: '5',
      title: 'Convert',
      description: 'Recyclables become energy',
      icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-800 hover:text-amber-600" />,
      badgeColor: 'border-emerald-800 bg-white hover:border-amber-600 hover:bg-amber-100',
      angle: 150, // 8 o'clock
    },
    {
      number: '6',
      title: 'Reward',
      description: 'Points and cash paid out',
      icon: <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-800 hover:text-amber-600" />,
      badgeColor: 'border-emerald-800 bg-white', // Highlighted yellow badge as shown in image
      angle: 210, // 10 o'clock
    },
  ];

  const radius = 190; // Radius in pixels for the circular arrangement

  return (
    <section className="bg-[#EAF1EB] min-h-screen py-16 px-4 flex flex-col items-center justify-center font-sans text-gray-800">
      {/* Header text */}
      <div className="text-center max-w-xl mb-12 sm:mb-16">
        <p className="text-emerald-900 text-xs tracking-widest font-mono mb-3 uppercase">
          — THE LOOP
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-4">
          Six stages. One continuous cycle.
        </h2>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
          Every report you file eventually comes back around as cleared land, generated power, or money in someone's pocket.
        </p>
      </div>

      {/* Desktop / Tablet Layout: Trigonometric Dynamic Circle */}
      <div className="hidden md:flex relative w-[520px] h-[520px] items-center justify-center">
        {/* SVG Dotted Circular Ring Path */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 520 520">
          <circle
            cx="260"
            cy="260"
            r={radius}
            fill="none"
            stroke="#94A3B8"
            strokeWidth="2"
            strokeDasharray="4 6"
            className="opacity-60"
          />
        </svg>

        {/* 6 Step Nodes */}
        {steps.map((item) => {
          // Convert angle degrees to radians for circular positioning
          const rad = (item.angle * Math.PI) / 180;
          const x = radius * Math.cos(rad);
          const y = radius * Math.sin(rad);

          return (
            <div
              key={item.number}
              className="absolute flex flex-col items-center text-center w-48 transition-transform duration-300  hover:scale-105"
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              {/* Icon Circle */}
              <div
                className={`w-14 h-14 rounded-full border-2 flex items-center justify-center shadow-xs mb-2  transition-all ${item.badgeColor}`}
              >
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="font-bold text-sm text-gray-900">
                {item.number}. {item.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-gray-600 mt-0.5 leading-snug px-2">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Mobile Layout: Responsive Card Grid (screens < 768px) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md md:hidden">
        {steps.map((item) => (
          <div
            key={item.number}
            className="bg-white/80 backdrop-blur-xs p-4 rounded-xl border border-gray-200/80 shadow-xs flex items-center gap-4"
          >
            <div
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center shrink-0 ${item.badgeColor}`}
            >
              {item.icon}
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-900">
                {item.number}. {item.title}
              </h3>
              <p className="text-xs text-gray-600 mt-0.5">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}