//import React from 'react'
import ZoneMap from "./Zonemap";
import ZoneCard from "./ZoneCards";
import locations from "@/Recycling/locations";


export default function Zones() {
  return (
    <section id="zones">
      <div className="mx-auto max-w-350 p-6">

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          <ZoneMap />

          <div className="flex flex-col gap-4">

            {locations.slice(0, 4).map((location) => (
              <ZoneCard
                key={location.id}
                location={location}
              />
            ))}

          </div>

        </div>

      </div>
    </section>
  )
}