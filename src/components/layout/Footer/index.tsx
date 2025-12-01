import Link from 'next/link'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer mt-auto bg-(--bg-section) md:pl-[85px]">
      {/* durchgehende Linie über die ganze Seite */}
      <div className="border-border/70 w-full border-t" />

      {/* alles, was eingerückt neben der Sidebar sein soll */}
      <div className="px-[15px] md:ml-20 md:w-[calc(100%-80px)]">
        <div className="max-w-(--page-max-width) py-10 md:w-full">
          {/* 4 Spalten */}
          <div className="text-muted-foreground grid gap-8 text-sm md:grid-cols-4">
            {/* Spalte 1 – Explore */}
            <div className="space-y-3">
              <h3 className="text-foreground/80 text-xs font-semibold tracking-[1.6px] uppercase">
                Explore
              </h3>
              <ul className="space-y-1.5">
                <li>
                  <Link
                    href="/stays/agistri"
                    className="hover:text(--color-ink-strong) text-(--color-ink) transition-colors"
                  >
                    Stays on Agistri
                  </Link>
                </li>
                <li>
                  <Link
                    href="/experiences"
                    className="text-(--color-ink) transition-colors hover:text-(--color-ink-strong)"
                  >
                    Experiences
                  </Link>
                </li>
                <li>
                  <Link
                    href="/journal"
                    className="text--color-ink) hover:text--color-ink-strong) transition-colors"
                  >
                    Journal
                  </Link>
                </li>
                <li>
                  <Link
                    href="/guides"
                    className="text-(--color-ink) transition-colors hover:text-(--color-ink-strong)"
                  >
                    Local Guides
                  </Link>
                </li>
              </ul>
            </div>

            {/* Spalte 2 – Plan your stay */}
            <div className="space-y-3">
              <h3 className="text-foreground/80 text-xs font-semibold tracking-[1.6px] uppercase">
                Plan your stay
              </h3>
              <ul className="space-y-1.5">
                <li>
                  <Link
                    href="/trip-planning"
                    className="text-(--color-ink) transition-colors hover:text-(--color-ink-strong)"
                  >
                    Personal travel advice
                  </Link>
                </li>
                <li>
                  <Link
                    href="/how-it-works"
                    className="text-(--color-ink) transition-colors hover:text-(--color-ink-strong)"
                  >
                    How booking works
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-(--color-ink) transition-colors hover:text-(--color-ink-strong)"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/policies"
                    className="text-(--color-ink) transition-colors hover:text-(--color-ink-strong)"
                  >
                    Policies &amp; terms
                  </Link>
                </li>
              </ul>
            </div>

            {/* Spalte 3 – Agistrea */}
            <div className="space-y-3">
              <h3 className="text-foreground/80 text-xs font-semibold tracking-[1.6px] uppercase">
                Agistrea
              </h3>
              <ul className="space-y-1.5">
                <li>
                  <Link
                    href="/about"
                    className="text-(--color-ink) transition-colors hover:text-(--color-ink-strong)"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sustainability"
                    className="text-(--color-ink) transition-colors hover:text-(--color-ink-strong)"
                  >
                    Sustainability
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-(--color-ink) transition-colors hover:text-(--color-ink-strong)"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/imprint"
                    className="text-(--color-ink) transition-colors hover:text-(--color-ink-strong)"
                  >
                    Imprint
                  </Link>
                </li>
              </ul>
            </div>

            {/* Spalte 4 – For hosts */}
            <div className="space-y-3">
              <h3 className="text-foreground/80 text-xs font-semibold tracking-[1.6px] uppercase">
                For hosts
              </h3>
              <ul className="space-y-1.5">
                <li>
                  <Link
                    href="/owners/register"
                    className="text-(--color-ink) transition-colors hover:text-(--color-ink-strong)"
                  >
                    List your place
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hosts/login"
                    className="text-(--color-ink) transition-colors hover:text-(--color-ink-strong)"
                  >
                    Host login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hosts/partnerships"
                    className="text-(--color-ink) transition-colors hover:text-(--color-ink-strong)"
                  >
                    Partnerships
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hosts/contact"
                    className="text-(--color-ink) transition-colors hover:text-(--color-ink-strong)"
                  >
                    Contact
                  </Link>
                </li>
              </ul>

              <div className="mt-4 space-y-1.5">
                <p className="text-foreground/80 text-xs font-semibold tracking-[1.6px] uppercase">
                  Contact for hosts
                </p>
                <div className="flex flex-wrap gap-3 text-(--color-sea)">
                  <Link
                    href="https://instagram.com"
                    className="transition-colors hover:text-(--text-accent-hover)"
                  >
                    <i className="fa-brands fa-square-instagram" />
                  </Link>
                  <Link
                    href="https://pinterest.com"
                    className="transition-colors hover:text-(--text-accent-hover)"
                  >
                    <i className="fa-brands fa-square-pinterest" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom-Bar */}
          <div className="bottom-bar text-muted-foreground mt-10 text-xs">
            <div className="flex flex-col items-center justify-center text-center md:flex-row md:justify-between md:gap-2 md:text-left">
              <p>© {year} Agistrea – small island stays.</p>
              <div className="flex flex-wrap items-center gap-3">
                <span>Made with ♥ for a tiny Greek island.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
