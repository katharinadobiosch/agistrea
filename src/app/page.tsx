'use client'

import { useState } from 'react'
import Hero from '@/components/layout/Hero'
import Intro from '@/components/Intro'
import { SideNav } from '@/components/layout/SideNav'
// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Agistrea – handpicked places on a tiny Greek island",
//   description:
//     "Curated apartments and rooms on Agistri, Greece. No mass tourism – just small, quiet places to stay.",
// };

export default function Home() {
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(prev => !prev)
  }

  const toggleMainMenu = () => {
    setIsMenuOpen(prev => !prev)
    setIsLanguageMenuOpen(false)
  }

  return (
    <>
      <div className="pt-0 pr-[15px] pl-[15px] md:ml-20 md:w-[calc(100%-80px)] md:pt-[95vh]">
        <Intro />
      </div>
      <div className="home">
        <img src="/assets/images/Homepage/intro.jpeg" className="w-screen object-cover" alt="" />
      </div>
    </>
  )
}
