"use client";

import Link from "next/link";

type SideNavProps = {
  onToggleMenu: () => void;
};

export function SideNav({ onToggleMenu }: SideNavProps) {
  return (
    <aside className="hidden lg:flex fixed w-[80px] z-50 pt-[24px] pb-[24px] h-[100vh] flex-col items-center justify-between backdrop-blur border-r border-slate-200">
      {/* Top icons */}
      <div className="mt-4 flex flex-col items-center gap-4 text-slate-700">
        <button aria-label="Home">
          <i className="fa-solid fa-house text-lg text-white" />
        </button>

        {/* 👉 Menü-Button löst jetzt das Overlay-Menü aus */}
        <button aria-label="Open menu" onClick={onToggleMenu}>
          <i className="fa-solid fa-bars text-lg text-white" />
        </button>
      </div>

      {/* Bottom icons */}
      <div className="mb-4 flex flex-col items-center gap-4 text-slate-700">
        <button aria-label="Language">
          <span className="text-sm">🇬🇧</span>
        </button>
        <button aria-label="Messages">
          <i className="fa-regular fa-comment text-lg text-white" />
        </button>
        <button aria-label="Favourites">
          <i className="fa-regular fa-heart text-lg text-white" />
        </button>
        <button aria-label="Profile">
          <i className="fa-regular fa-user text-lg text-white" />
        </button>
      </div>
    </aside>
  );
}
