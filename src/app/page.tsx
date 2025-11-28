"use client";

import { useState } from "react";
import Intro from "@/components/Intro/Intro";
import { SideNav } from "@/components/layout/SideNav";
// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Agistrea – handpicked places on a tiny Greek island",
//   description:
//     "Curated apartments and rooms on Agistri, Greece. No mass tourism – just small, quiet places to stay.",
// };

export default function Home() {
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen((prev) => !prev);
  };

  const toggleMainMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setIsLanguageMenuOpen(false);
  };

  return (
    <>
      {/* <SideNav
        isLanguageMenuOpen={isLanguageMenuOpen}
        toggleLanguageMenu={toggleLanguageMenu}
        isMenuOpen={isMenuOpen}
        onToggleMenu={toggleMainMenu}
      />
      <div className="home pl-[24px] pr-[24px] pt-[100vh] lg:pl-[130px] pr-[50px]">
        <Intro />
        <div>HELLO WORLD</div>
        <div>HELLO WORLD</div> <div>HELLO WORLD</div> <div>HELLO WORLD</div>{" "}
        <div>HELLO WORLD</div> <div>HELLO WORLD</div> <div>HELLO WORLD</div>{" "}
        <div>HELLO WORLD</div> <div>HELLO WORLD</div> <div>HELLO WORLD</div>{" "}
        <div>HELLO WORLD</div> <div>HELLO WORLD</div> <div>HELLO WORLD</div>{" "}
        <div>HELLO WORLD</div> <div>HELLO WORLD</div> <div>HELLO WORLD</div>{" "}
        <div>HELLO WORLD</div> <div>HELLO WORLD</div> <div>HELLO WORLD</div>{" "}
        <div>HELLO WORLD</div> <div>HELLO WORLD</div> <div>HELLO WORLD</div>
      </div> */}
    </>
  );
}
