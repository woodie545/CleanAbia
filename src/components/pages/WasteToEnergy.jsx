import FAQwaste from '@/Waste-Energy/FAQwaste'
import Process from '@/Waste-Energy/Process'
import { Tracker } from '@/Waste-Energy/Tracker'
import Waste from '@/Waste-Energy/Waste'
import React from 'react'

export default function WasteToEnergy() {
  return (
    <div>
      <Waste />
      <Tracker />
      <Process />
      <FAQwaste />
    </div>
  )
}
