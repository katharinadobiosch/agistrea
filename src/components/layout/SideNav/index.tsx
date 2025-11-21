"use client";

import Link from "next/link";

export function SideNav() {
  return (
    // <aside className="hidden lg:flex fixed inset-y-0 left-0 top-0 pt-[15px] pb-[15px] w-14 flex-col items-center justify-between  backdrop-blur border-r border-slate-200 z-10 h-[100vh] border-pink-900 border-[20px]">
    <aside className="flex absolute w-[100px] border-orange-900 border-[20px] z-100">
      {/* <aside className="hidden lg:flex absolute top-0 pt-[15px] pb-[15px] w-14 flex-col items-center justify-between  backdrop-blur border-r border-slate-200 z-10 h-[100vh]"></aside> */}
      {/* Top icons */}
      <div className="mt-4 flex flex-col items-center gap-4 text-slate-700">
        <button aria-label="Home">
          <i className="fa-solid fa-house text-lg text-white" />
        </button>
        {/* <button aria-label="Help">
          <i className="fa-regular fa-circle-question text-lg text-white" />
        </button> */}
        <button aria-label="Open menu">
          <i className="fa-solid fa-bars text-lg text-white" />
        </button>
        {/* <button aria-label="Ideas">
          <i className="fa-regular fa-lightbulb text-lg text-white" />
        </button> */}
      </div>

      {/* Bottom icons (z.B. Sprache, Chat, Favs) */}
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
