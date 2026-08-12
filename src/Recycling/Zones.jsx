//import React from 'react'
import ZoneMap from "./ZoneMap";
import ZoneCard from "./ZoneCards";
import locations from "./locations";


export default function Zones() {
  return (
    <section id="zones">
      <div className="mx-auto max-w-350">

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