import { Box, Settings, Zap, Plus } from 'lucide-react';


export const imgList = [
    {
        id: 1,
        img: "public/img1.png",
        text: "Snap a dirty site, tag ypu location",
        descriprion: "STEP 01 - REPORTERS"
    },

    {
        id: 2,
        img: "public/img2.png",
        text: "Verified agents clear and collect",
        descriprion: "STEP 02 - AGENTS"
    },

    {
        id: 3,
        img: "public/img3.png",
        text: "Reacyclables become energy-you get paid",
        descriprion: "STEP 03 - RECYCLABLES CREATE"
    },

]


export const steps = [
  {
    number: 1,
    title: '1. Collection & sorting',
    description:
      'Drop-offs are weighed and separated into plastics, metals, paper and organics at the zone centre.',
    icon: Box,
  },
  {
    number: 2,
    title: '2. Pre-processing',
    description:
      'Organics are shredded and dried; recoverable plastics and metals are baled for transport.',
    icon: Settings,
  },
  {
    number: 3,
    title: '3. Conversion',
    description:
      'Organic matter goes through anaerobic digestion; non-recyclable residue is processed for energy recovery.',
    icon: Zap,
  },
  {
    number: 4,
    title: '4. Grid distribution',
    description:
      'Generated electricity is fed into the local grid, powering homes and businesses nearby.',
    icon: Plus,
  },
];