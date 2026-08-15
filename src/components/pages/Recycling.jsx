import AcceptedItems from '@/Recycling/AcceptedItems'
import Ctas from '@/Recycling/Ctas'
import Faqs from '@/Recycling/Faqs'
import HeroSection from '@/Recycling/HeroSection'
import ProcessSection from '@/Recycling/ProcessSection'
import ScheduleSection from '@/Recycling/ScheduleSection'
import Zones from '@/Recycling/Zones'
import React from 'react'

export default function Recycling() {
  return (
    <div>
      <HeroSection />
      <Zones />
      <ScheduleSection />
      <AcceptedItems />
      <ProcessSection />
      <Faqs />
      <Ctas />
    </div>
  )
}
