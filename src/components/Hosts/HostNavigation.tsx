'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logoutAction } from '@/app/(site)/(host)/host/actions'

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={[
        'rounded-full px-4 py-1.5 text-sm font-medium transition-all',
        active
          ? 'bg-(--color-tangerine) text-white shadow-sm'
          : 'text-(--color-muted-ink) hover:bg-(--color-linen)/50 hover:text-(--color-ink)',
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
    <nav className="pointer-events-auto sticky top-0 z-50 border-b border-(--border-light) bg-white/80 backdrop-blur-md">
      <div className="relative mx-auto max-w-[1200px] px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Logo + Navigation Pills */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="font-serif text-xl text-(--color-tangerine) transition-colors hover:text-(--text-accent-hover)"
            >
              Agistrea
            </Link>

            <div className="flex items-center gap-1 rounded-full bg-[color-mix(in_srgb,var(--color-linen)_40%,transparent)] p-1">
              <NavLink
                href="/host/dashboard"
                label="Dashboard"
                active={isActive('/host/dashboard')}
              />
              <NavLink
                href="/host/properties"
                label="Listings"
                active={isActive('/host/properties') && !pathname?.includes('/new')}
              />
              <NavLink
                href="/host/properties/new"
                label="Create"
                active={pathname === '/host/properties/new'}
              />
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-(--color-muted-ink) transition hover:text-(--color-ink)"
            >
              Back to site
            </Link>
            <div className="h-4 w-px bg-(--border-light)" />
            <Link
              href="/help"
              className="text-sm text-(--color-muted-ink) transition hover:text-(--color-tangerine)"
            >
              Help
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="text-sm text-(--color-muted-ink) transition hover:text-(--color-ink)"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  )
}
