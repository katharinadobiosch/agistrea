import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto pl-[24px] border-t border-border bg-background/90 md:pl-[130px]">
      <div className="w-full max-w-[var(--page-max-width)]  py-10">
        {/* 3 Spalten auf Desktop, 1 Spalte auf Mobile */}
        <div className="grid gap-8 text-sm text-muted-foreground md:grid-cols-3">
          {/* Spalte 1 – Explore */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[1.6px] text-foreground">
              Explore
            </h3>
            <ul className="space-y-1.5">
              <li>
                <Link href="/stays/agistri" className="hover:text-accent">
                  Stays on Agistri
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="hover:text-accent">
                  Experiences
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-accent">
                  Journal
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:text-accent">
                  Local Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Spalte 2 – Plan your stay */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[1.6px] text-foreground">
              Plan your stay
            </h3>
            <ul className="space-y-1.5">
              <li>
                <Link href="/trip-planning" className="hover:text-accent">
                  Personal travel advice
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-accent">
                  How booking works
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-accent">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/policies" className="hover:text-accent">
                  Policies &amp; terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Spalte 3 – About & Connect */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[1.6px] text-foreground">
              Agistrea
            </h3>
            <ul className="space-y-1.5">
              <li>
                <Link href="/about" className="hover:text-accent">
                  About
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="hover:text-accent">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/partners" className="hover:text-accent">
                  Hosts &amp; partnerships
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent">
                  Contact
                </Link>
              </li>
            </ul>

            <div className="mt-4 space-y-1.5">
              <p className="text-xs font-semibold uppercase tracking-[1.6px] text-foreground">
                Connect
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="https://instagram.com"
                  className="hover:text-accent"
                >
                  <i className="fa-brands fa-square-instagram" />
                </Link>
                <Link
                  href="https://pinterest.com"
                  className="hover:text-accent"
                >
                  <i className="fa-brands fa-square-pinterest" />
                </Link>
                {/* ggf. später weitere Channels */}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom-Bar wie bisher, nur typografisch eingebettet */}
        <div className="bottom-bar mt-10 border-t border-border/70 pt-4 text-xs text-muted-foreground">
          <div
            className="flex flex-col items-center justify-center text-center
                md:flex-row md:justify-between md:gap-2 md:text-left"
          >
            <p>© {year} Agistrea – small island stays.</p>
            <div className="flex flex-wrap items-center gap-3">
              <span>Made with ♥ for a tiny Greek island.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
