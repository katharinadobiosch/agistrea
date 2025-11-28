"use client";

import { useState } from "react";
import MobileNavigation from "../../GlobalNavigation/MobileNavigation";
import HeaderBar from "../../GlobalNavigation/MobileNavigation/HeaderBar";
import { SideNav } from "../SideNav";

export function Header() {
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen((prev) => !prev);
  };

  const toggleMainMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setIsLanguageMenuOpen(false);
  };

  const closeMainMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <SideNav
        isLanguageMenuOpen={isLanguageMenuOpen}
        toggleLanguageMenu={toggleLanguageMenu}
        isMenuOpen={isMenuOpen}
        onToggleMenu={toggleMainMenu}
      />
      <HeaderBar
        isLanguageMenuOpen={isLanguageMenuOpen}
        toggleLanguageMenu={toggleLanguageMenu}
        isMenuOpen={isMenuOpen}
        onToggleMenu={toggleMainMenu}
      />
      <MobileNavigation isOpen={isMenuOpen} onClose={closeMainMenu} />
    </>
  );
}
