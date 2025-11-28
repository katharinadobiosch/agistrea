"use client";

import Link from "next/link";
import Image from "next/image";

type HeaderBarProps = {
  isLanguageMenuOpen: boolean;
  toggleLanguageMenu: () => void;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
};

const HeaderBar: React.FC<HeaderBarProps> = ({
  isLanguageMenuOpen,
  toggleLanguageMenu,
  isMenuOpen,
  onToggleMenu,
}) => {
  return (
    <header id="header" className="max-w-[1600px] py-[12px] px-[24px]">
      <div className="header-bar flex items-center">
        {/* Left: Menu, FAQ, Language */}
        <div className="flex items-center flex-1 gap-2 lg:hidden">
          {/* Menu Button */}
          {/* Menu Button */}
          <button
            type="button"
            className="pt-[5px] pr-[15px]"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={onToggleMenu}
          >
            {isMenuOpen ? (
              <i className="fa-solid fa-xmark text-white text-2xl" />
            ) : (
              <i className="fa-solid fa-bars text-white text-xl" />
            )}
            <span className="sr-only">
              {isMenuOpen ? "Close menu" : "Open menu"}
            </span>
          </button>

          <button
            type="button"
            className="pt-[5px] pr-[15px]"
            aria-label="Open FAQ"
          >
            <i className="fa-regular fa-circle-question text-white" />
            <span className="sr-only">Open FAQ</span>
          </button>

          {/* Language selector */}
          <div className="relative pt-1">
            <button
              type="button"
              className="pt-[4px] pb-[4px]"
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
              <ul className="absolute left-0 mt-2 w-32 rounded-md bg-white shadow-lg ring-1 ring-white/5 text-sm">
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

        {/* Center: Logo */}
        <div className="flex justify-center flex-1">
          <Link href="/en">
            <div className="text-3xl font-serif font-semibold text-white">
              Agistrea
            </div>
          </Link>
        </div>

        {/* Right: Cart, Favs, User */}
        <div className="flex items-center justify-end flex-1 gap-2 lg:hidden">
          <button
            type="button"
            className="pt-[5px] pr-[15px]"
            aria-label="Open login fav"
          >
            <i className="fa-regular fa-heart text-white" />
            <span className="sr-only">Open Login Favorite</span>
          </button>

          <button
            type="button"
            className="pt-[5px] pr-[15px]"
            aria-label="Open login"
          >
            <i className="fa-regular fa-user text-white" />
            <span className="sr-only">Open Login</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
