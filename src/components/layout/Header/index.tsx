"use client";

import { useState } from "react";
import MobileMenu from "../../GlobalNavigation/MobileNavigation";
import HeaderBar from "../../GlobalNavigation/MobileNavigation/HeaderBar";

export function Header() {
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen((prev) => !prev);
  };

  const toggleMainMenu = () => {
    setIsMenuOpen((prev) => !prev);
    // optional: Sprachmenü schließen, wenn Hauptmenü aufgeht
    setIsLanguageMenuOpen(false);
  };

  const closeMainMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <HeaderBar
        isLanguageMenuOpen={isLanguageMenuOpen}
        toggleLanguageMenu={toggleLanguageMenu}
        isMenuOpen={isMenuOpen}
        onToggleMenu={toggleMainMenu}
      />
      <MobileMenu isOpen={isMenuOpen} onClose={closeMainMenu} />
    </>
  );
}
