'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

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

type HeaderBarProps = {
  isLanguageMenuOpen: boolean
  toggleLanguageMenu: () => void
  isMenuOpen: boolean
  onToggleMenu: () => void
}

const HeaderBar: React.FC<HeaderBarProps> = ({
  isLanguageMenuOpen,
  toggleLanguageMenu,
  isMenuOpen,
  onToggleMenu,
}) => {
  const pathname = usePathname()
  const router = useRouter()

  const lang = useMemo(() => getLangFromPath(pathname), [pathname])
  const [onHero, setOnHero] = useState(true)

  /* ---------- hero observer ---------- */

  useEffect(() => {
    const hero = document.querySelector('.hero')
    if (!hero) return

    const obs = new IntersectionObserver(([entry]) => setOnHero(entry.isIntersecting), {
      rootMargin: '-90px 0px 0px 0px',
      threshold: 0.05,
    })

    obs.observe(hero)
    return () => obs.disconnect()
  }, [])

  /* ---------- styles ---------- */

  const fg = onHero ? 'text-white/90' : 'text-[var(--color-ink-strong)]'
  const headerBg = onHero
    ? 'bg-transparent'
    : 'bg-[var(--color-soft-white)]/85 backdrop-blur-md border-b border-black/5'

  /* ---------- language ---------- */

  const flagSrc =
    lang === 'gr' ? '/assets/images/Homepage/lang_gr.jpg' : '/assets/images/Homepage/lang_en.png'

  const flagAlt = lang === 'gr' ? 'greek' : 'english'

  const goLang = (next: Lang) => {
    router.push(swapLangInPath(pathname, next))
    if (isLanguageMenuOpen) toggleLanguageMenu()
  }

  /* ---------------- render ---------------- */

  return (
    <>
      <header
        id="header"
        className={`mobile-header fixed z-50 w-full max-w-[100vw] px-6 py-3 transition-colors duration-300 md:hidden ${headerBg}`}
      >
        <div className="header-bar z-50 flex items-center">
          {/* Left */}
          <div className="flex flex-1 items-center gap-2 md:hidden">
            {/* Menu */}
            <button
              type="button"
              className="pt-1.25 pr-3.75"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              onClick={onToggleMenu}
            >
              {isMenuOpen ? (
                <i className={`fa-solid fa-xmark text-2xl ${fg}`} />
              ) : (
                <i className={`fa-solid fa-bars text-xl ${fg}`} />
              )}
            </button>

            {/* FAQ */}
            <button type="button" className="pt-1.25 pr-3.75" aria-label="Open FAQ">
              <i className={`fa-regular fa-circle-question ${fg}`} />
            </button>

            {/* Language */}
            <div className="relative pt-1">
              <button
                type="button"
                className="pt-1 pb-1"
                aria-haspopup="menu"
                aria-expanded={isLanguageMenuOpen}
                onClick={toggleLanguageMenu}
              >
                <Image src={flagSrc} alt={flagAlt} width={13} height={13} />
              </button>

              {isLanguageMenuOpen && (
                <ul className="absolute left-0 mt-2 w-32 rounded-md bg-white text-sm shadow-lg">
                  <li>
                    <button
                      type="button"
                      onClick={() => goLang('en')}
                      className="flex w-full items-center px-3 py-2 hover:bg-slate-50"
                    >
                      <Image
                        src="/assets/images/Homepage/lang_en.png"
                        alt="english"
                        width={13}
                        height={13}
                      />
                      <span className="pl-2">English</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => goLang('gr')}
                      className="flex w-full items-center px-3 py-2 hover:bg-slate-50"
                    >
                      <Image
                        src="/assets/images/Homepage/lang_gr.jpg"
                        alt="greek"
                        width={13}
                        height={13}
                      />
                      <span className="pl-2">Greek</span>
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>

          {/* Center logo */}
          <div className="flex flex-1 justify-center">
            <Link href={`/${lang}`}>
              <div className={`font-serif text-3xl font-semibold ${fg}`}>Agistrea</div>
            </Link>
          </div>

          {/* Right */}
          <div className="flex flex-1 items-center justify-end gap-2 md:hidden">
            <button type="button" className="pt-1.25 pr-3.75">
              <i className={`fa-regular fa-heart ${fg}`} />
            </button>
            <button type="button" className="pt-1.25 pr-3.75">
              <i className={`fa-regular fa-user ${fg}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Desktop logo */}
      <div className={`fixed top-0 z-50 hidden w-full justify-center py-4 md:flex ${headerBg}`}>
        <Link href={`/${lang}`}>
          <div className={`font-serif text-3xl font-semibold ${fg}`}>Agistrea</div>
        </Link>
      </div>
    </>
  )
}

export default HeaderBar
