"use client";

import { useState } from "react";
import MobileNavigation from "../../GlobalNavigation/MobileNavigation";
import HeaderBar from "../../GlobalNavigation/MobileNavigation/HeaderBar";

import { SideNav } from "../../../components/layout/SideNav";

export function Header(toggleLanguageMenu: () => void) {
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMainMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setIsLanguageMenuOpen(false);
  };

  return (
    <>
      {/* Desktop sidenav */}
      <SideNav onToggleMenu={toggleMainMenu} />

      {/* Mobile top navigation */}
      <HeaderBar
        isLanguageMenuOpen={isLanguageMenuOpen}
        toggleLanguageMenu={toggleLanguageMenu}
        isMenuOpen={isMenuOpen}
        onToggleMenu={toggleMainMenu}
      />

      {/* Shared menu drawer */}
      <MobileNavigation
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
}
