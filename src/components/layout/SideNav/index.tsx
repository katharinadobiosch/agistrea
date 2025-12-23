'use client'

import { useState, useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import DesktopNavigation from '../../GlobalNavigation/DesktopNavigation'

/* ---------------- language helpers ---------------- */

const LANGS = ['en', 'gr'] as const
type Lang = (typeof LANGS)[number]

function getLangFromPath(pathname: string): Lang {
  const first = pathname.split('/')[1] as Lang | undefined
  return (LANGS as readonly string[]).includes(first ?? '') ? (first as Lang) : 'en'
}

function swapLangInPath(pathname: string, nextLang: Lang) {
  const rest = pathname.replace(/^\/(en|gr)(?=\/|$)/, '')
  return `/${nextLang}${rest || ''}`
}

/* ---------------- component ---------------- */

type SideNavProps = {
  isMenuOpen: boolean
  onToggleMenu: () => void
}

export function SideNav({ isMenuOpen, onToggleMenu }: SideNavProps) {
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false)

  const pathname = usePathname()
  const router = useRouter()

  const lang = useMemo(() => getLangFromPath(pathname), [pathname])

  const toggleDesktopMenu = () => {
    setIsDesktopMenuOpen(prev => !prev)
    onToggleMenu()
  }

  const closeDesktopMenu = () => {
    setIsDesktopMenuOpen(false)
  }

  const toggleLanguage = () => {
    const nextLang: Lang = lang === 'en' ? 'gr' : 'en'
    router.push(swapLangInPath(pathname, nextLang))
  }

  /* ---------------- render ---------------- */

  return (
    <>
      <aside className="side-nav fixed z-100 hidden h-screen w-15 flex-col items-center justify-between border-r border-slate-200 pt-6 pb-6 backdrop-blur md:flex">
        {/* Top icons */}
        <div className="mt-4 flex flex-col items-center gap-4 text-slate-700">
          <button aria-label="Home">
            <i className="fa-solid fa-house text-lg text-white" />
          </button>

          {/* Menu button */}
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
            <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>

        {/* Bottom icons */}
        <div className="mb-4 flex flex-col items-center gap-4 text-slate-700">
          {/* Language toggle */}
          <button
            type="button"
            aria-label="Toggle language"
            onClick={toggleLanguage}
            className="text-sm"
          >
            {lang === 'en' ? '🇬🇧' : '🇬🇷'}
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
