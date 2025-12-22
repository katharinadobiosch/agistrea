'use client'

import Link from 'next/link'

type DesktopNavigationProps = {
  isOpen: boolean
  onClose: () => void
}

export default function DesktopNavigation({ isOpen, onClose }: DesktopNavigationProps) {
  return (
    <div
      className={`desktop-navigation fixed top-0 right-0 left-20 z-90 transform transition-transform duration-300 ease-out ${isOpen ? 'translate-y-0' : '-translate-y-full'} `}
    >
      <div className="border-b border-slate-800 bg-[#020617]/95 text-white shadow-xl">
        <div className="flex items-start justify-between px-16 py-10">
          {/* Links: Menüeinträge */}
          <nav className="space-y-4 text-xs tracking-[0.25em] text-sky-400 uppercase">
            <button className="block hover:text-white">Home desktop</button>
            <button className="block hover:text-white">About</button>
            <button className="block hover:text-white">Rooms</button>
            <button className="block hover:text-white">Location</button>
            <button className="block hover:text-white">Contact</button>
            <button className="block hover:text-white">
              {' '}
              <Link href="/host/login">Host Login</Link>
            </button>
          </nav>

          {/* Rechts: Close-Button */}
          <button onClick={onClose} aria-label="Close menu" className="text-2xl text-white">
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
      </div>
    </div>
  )
}
