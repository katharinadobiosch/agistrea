'use client'

import Link from 'next/link'
import Image from 'next/image'

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
  return (
    <>
      <header id="header" className="z-50 max-w-[1600px] px-6 py-3 md:hidden">
        <div className="header-bar z-50 flex items-center">
          {/* Left: Menu, FAQ, Language */}
          <div className="flex flex-1 items-center gap-2 md:hidden">
            {/* Menu Button */}
            <button
              type="button"
              className="pt-[5px] pr-[15px]"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              onClick={onToggleMenu}
            >
              {isMenuOpen ? (
                <i className="fa-solid fa-xmark text-2xl text-white" />
              ) : (
                <i className="fa-solid fa-bars text-xl text-white" />
              )}
              <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
            </button>

            <button type="button" className="pt-[5px] pr-[15px]" aria-label="Open FAQ">
              <i className="fa-regular fa-circle-question text-white" />
              <span className="sr-only">Open FAQ</span>
            </button>

            {/* Language selector */}
            <div className="relative pt-1">
              <button
                type="button"
                className="pt-1 pb-1"
                aria-haspopup="menu"
                aria-expanded={isLanguageMenuOpen}
                onClick={toggleLanguageMenu}
              >
                <Image
                  src="/assets/images/Homepage/lang_en.png"
                  alt="english"
                  width={13}
                  height={13}
                  className="object-contain"
                />
              </button>

              {isLanguageMenuOpen && (
                <ul className="absolute left-0 mt-2 w-32 rounded-md bg-white text-sm shadow-lg ring-1 ring-white/5">
                  <li>
                    <Link
                      href="/en"
                      className="flex items-center px-3 py-2 text-slate-900 hover:bg-slate-50"
                    >
                      <Image
                        src="/assets/images/Homepage/lang_en.png"
                        alt="english"
                        width={13}
                        height={13}
                        className="object-contain"
                      />
                      <span className="pl-2" id="english">
                        English
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/nl"
                      className="flex items-center px-3 py-2 text-slate-900 hover:bg-slate-50"
                    >
                      <Image
                        src="/assets/images/Homepage/lang_gr.jpg"
                        alt="greek"
                        width={13}
                        height={13}
                        className="object-contain"
                      />
                      <span className="pl-2" id="greek">
                        Greek
                      </span>
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>

          {/* Center: Logo (Mobile) */}
          <div className="flex flex-1 justify-center">
            <Link href="/en">
              <div className="font-serif text-3xl font-semibold text-white">Agistrea</div>
            </Link>
          </div>

          {/* Right: Cart, Favs, User */}
          <div className="flex flex-1 items-center justify-end gap-2 md:hidden">
            <button type="button" className="pt-[5px] pr-[15px]" aria-label="Open login fav">
              <i className="fa-regular fa-heart text-white" />
              <span className="sr-only">Open Login Favorite</span>
            </button>

            <button type="button" className="pt-[5px] pr-[15px]" aria-label="Open login">
              <i className="fa-regular fa-user text-white" />
              <span className="sr-only">Open Login</span>
            </button>
          </div>
        </div>
      </header>

      {/* Desktop Logo: sichtbar ab 768px */}
      <div className="hidden justify-center py-4 md:flex">
        <Link href="/en">
          <div className="font-serif text-3xl font-semibold text-white">Agistrea</div>
        </Link>
      </div>
    </>
  )
}

export default HeaderBar
