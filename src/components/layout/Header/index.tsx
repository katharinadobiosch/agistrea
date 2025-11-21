"use client";

import { useState } from "react";
import MobileNavigation from "../../GlobalNavigation/MobileNavigation";
import HeaderBar from "../../GlobalNavigation/MobileNavigation/HeaderBar";
import { SideNav } from "../../../components/layout/SideNav";

export function Header() {
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen((prev) => !prev);
  };

  const toggleMainMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setIsLanguageMenuOpen(false);
    console.log("Toggling main menu, is now:", !isMenuOpen);
    console.log("menu klicked");
  };

  const closeMainMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Desktop-SideNav hängt jetzt am gleichen State */}
      <SideNav onToggleMenu={toggleMainMenu} />

      {/* Mobile Header (lg:hidden bleibt in HeaderBar) */}
      <HeaderBar
        isLanguageMenuOpen={isLanguageMenuOpen}
        toggleLanguageMenu={toggleLanguageMenu}
        isMenuOpen={isMenuOpen}
        onToggleMenu={toggleMainMenu}
      />

      {/* Gemeinsamer Drawer für mobile & desktop */}
      <MobileNavigation isOpen={isMenuOpen} onClose={closeMainMenu} />
    </>
  );
}
