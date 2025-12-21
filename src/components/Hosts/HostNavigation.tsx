'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={[
        'rounded-full px-4 py-1.5 text-sm font-medium transition-all',
        active
          ? 'bg-[var(--color-tangerine)] text-white shadow-sm'
          : 'text-[var(--color-muted-ink)] hover:bg-[var(--color-linen)]/50 hover:text-[var(--color-ink)]',
      ].join(' ')}
    >
      {label}
    </Link>
  )
}

export default function HostNavigation() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/host/dashboard') {
      return pathname === '/host/dashboard'
    }
    return pathname?.startsWith(path) ?? false
  }

  return (
    <nav className="border-b border-(--border-light) bg-white/70 backdrop-blur-md">
      <div className="mx-auto max-w-[1200px] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="font-serif text-xl text-(--color-ink-strong)">
              Agistrea
            </Link>
            <div className="flex items-center gap-1 rounded-full bg-[color-mix(in_srgb,var(--color-sand)_25%,transparent)] p-1">
              <Link
                href="/host/dashboard"
                className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-(--color-ink-strong) shadow-sm"
              >
                Dashboard
              </Link>
              <Link
                href="/host/listings"
                className="rounded-full px-4 py-1.5 text-sm text-(--color-muted-ink) transition hover:text-(--color-ink)"
              >
                Listings
              </Link>
              <Link
                href="/host/create"
                className="rounded-full px-4 py-1.5 text-sm text-(--color-muted-ink) transition hover:text-(--color-ink)"
              >
                Create
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/help"
              className="text-sm text-(--color-muted-ink) transition hover:text-(--color-sea)"
            >
              Help
            </Link>
            <button className="text-sm text-(--color-muted-ink) transition hover:text-(--color-ink)">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
