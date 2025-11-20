import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="relative z-10">
      <div className="flex items-center p-[16px]">
        {/* Left: Menu, FAQ, Language */}
        <div className="flex items-center flex-1 gap-2">
          <button
            type="button"
            className="flex items-center pt-1 pr-3 bg-transparent border-0 text-slate-900"
            aria-label="Open menu"
          >
            <i className="fa-solid fa-bars text-white w-[16px] h-[16px]" />
            <span className="sr-only">Open menu</span>
          </button>

          <button
            type="button"
            className="flex items-center pt-1 pr-3 bg-transparent border-0 text-slate-900"
            aria-label="Open FAQ"
          >
            <i className="fa-regular fa-circle-question text-white w-[16px] h-[16px]" />
            <span className="sr-only">Open FAQ</span>
          </button>

          <div className="relative pt-1">
            {/* Language trigger */}
            <button
              type="button"
              className="flex items-center bg-transparent border-0"
              aria-haspopup="menu"
              aria-expanded="false"
            >
              <Image
                src="/assets/images/Homepage/lang_en.png"
                alt="english"
                width={13}
                height={13}
                className="object-contain"
              />
            </button>

            {/* Dropdown (nur statisch, Logik kannst du später mit State machen) */}
            <ul className="absolute left-0 mt-2 w-32 rounded-md bg-white shadow-lg ring-1 ring-black/5 text-sm">
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
          </div>
        </div>

        {/* Center: Logo */}
        <div className="flex justify-center flex-shrink-0">
          <Link href="/en">
            <div className="text-2xl text-white">Agistrea</div>
          </Link>
        </div>

        {/* Right: Cart, Favs, User */}
        <div className="flex items-center justify-end flex-1 gap-2">
          {/* <button
            type="button"
            className="relative flex items-center pt-1 pr-3 bg-transparent border-0 text-slate-900"
            aria-label="Open cart"
          >
            <i id="cart-icon" className="bx bx-shopping-bag bx-xs" />
            <span className="absolute -top-1 -left-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600 px-1 text-[10px] leading-none text-white">
              0
            </span>
          </button> */}

          <button
            type="button"
            className="flex items-center pt-1 pr-3 bg-transparent border-0 text-slate-900"
            aria-label="Open login fav"
          >
            <i className="fa-regular fa-heart text-white w-[16px] h-[16px]" />
            <span className="sr-only">Open Login Favorite</span>
          </button>

          <button
            type="button"
            className="flex items-center pt-1 bg-transparent border-0 text-slate-900"
            aria-label="Open login"
          >
            <i className="fa-regular fa-user text-white w-[16px] h-[16px]" />
            <span className="sr-only">Open Login</span>
          </button>
        </div>
      </div>
    </header>
  );
}
