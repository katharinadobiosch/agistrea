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
      <div className="ml-[80px] w-[calc(100%_-_80px)] border border-red-500 pt-[97vh] pr-[15px] pl-[15px] md:pt-[50px] md:pt-[97vh]">
        <Intro />
      </div>
      <div className="home">
        <img src="/assets/images/Homepage/intro.jpeg" className="w-screen object-cover" alt="" />
      </div>
    </>
  )
}
