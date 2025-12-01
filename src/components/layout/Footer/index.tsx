import Link from 'next/link'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto bg-[var(--bg-section)]">
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
                  <Link href="/stays/agistri" className="transition-colors">
                    Stays on Agistri
                  </Link>
                </li>
                <li>
                  <Link href="/experiences" className="transition-colors">
                    Experiences
                  </Link>
                </li>
                <li>
                  <Link href="/journal" className="transition-colors">
                    Journal
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="transition-colors">
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
                  <Link href="/trip-planning" className="transition-colors">
                    Personal travel advice
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="transition-colors">
                    How booking works
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/policies" className="transition-colors">
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
                  <Link href="/about" className="transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/sustainability" className="transition-colors">
                    Sustainability
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/imprint" className="transition-colors">
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
                  <Link href="/owners/register" className="transition-colors">
                    List your place
                  </Link>
                </li>
                <li>
                  <Link href="/hosts/login" className="transition-colors">
                    Host login
                  </Link>
                </li>
                <li>
                  <Link href="/hosts/partnerships" className="transition-colors">
                    Partnerships
                  </Link>
                </li>
                <li>
                  <Link href="/hosts/contact" className="transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>

              <div className="mt-4 space-y-1.5">
                <p className="text-foreground/80 text-xs font-semibold tracking-[1.6px] uppercase">
                  Contact for hosts
                </p>
                <div className="flex flex-wrap gap-3 text-[var(--color-sea)]">
                  <Link
                    href="https://instagram.com"
                    className="transition-colors hover:text-[var(--text-accent-hover)]"
                  >
                    <i className="fa-brands fa-square-instagram" />
                  </Link>
                  <Link
                    href="https://pinterest.com"
                    className="transition-colors hover:text-[var(--text-accent-hover)]"
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
