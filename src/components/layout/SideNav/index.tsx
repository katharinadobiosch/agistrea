'use client'

import { useState } from 'react'
import DesktopNavigation from '../../GlobalNavigation/DesktopNavigation'

type SideNavProps = {
  isLanguageMenuOpen: boolean
  toggleLanguageMenu: () => void
  isMenuOpen: boolean
  onToggleMenu: () => void
}

export function SideNav({ isMenuOpen, onToggleMenu }: SideNavProps) {
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false)

  const toggleDesktopMenu = () => {
    setIsDesktopMenuOpen(prev => !prev)
    onToggleMenu()
  }

  const closeDesktopMenu = () => {
    setIsDesktopMenuOpen(false)
  }

  return (
    <>
      <aside className="fixed z-100 hidden h-screen w-[60px] flex-col items-center justify-between border-r border-slate-200 pt-6 pb-6 backdrop-blur md:flex">
        {/* Top icons */}
        <div className="mt-4 flex flex-col items-center gap-4 text-slate-700">
          <button aria-label="Home">
            <i className="fa-solid fa-house text-lg text-white" />
          </button>

          {/* ⭐ Menü-Button: öffnet jetzt den Desktop-Drawer ⭐ */}
          <button
            onClick={toggleDesktopMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <i className="fa-solid fa-xmark text-2xl text-white" />
            ) : (
              <i className="fa-solid fa-bars text-xl text-white" />
            )}
            <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>{' '}
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

      <DesktopNavigation isOpen={isDesktopMenuOpen} onClose={closeDesktopMenu} />
    </>
  )
}
