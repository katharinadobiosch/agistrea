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
    setIsLanguageMenuOpen((prev) => !prev)
  }

  const toggleMainMenu = () => {
    setIsMenuOpen((prev) => !prev)
    setIsLanguageMenuOpen(false)
  }

  return (
    <div className="home pt-[97vh] md:pt-[50px] md:pt-[97vh]">
      <div className="border border-red-50">
        <Intro />
        HELLO WORLD HELLO WORLD HELLO WORLD HELLO WORLD HELLO WORLD
      </div>
      <img src="/assets/images/Homepage/intro.jpeg" className="w-screen object-cover" alt="" />
    </div>
  )
}

// px-[15px] md:px-[130px] h-full w-full max-w-[1600px]
