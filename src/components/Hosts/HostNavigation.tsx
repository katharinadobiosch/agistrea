// ✅ HostNavigation.tsx (angepasst auf neue Tokens; kein tangerine/linen mehr)
// - Active Pill: terracotta
// - Container-Pills: warm sand surface
// - Header: white/clean mit subtle sand tint + border warm

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
        active ? 'text-white shadow-sm' : 'transition-colors',
      ].join(' ')}
      style={
        active
          ? {
              backgroundColor: 'var(--color-terracotta)',
              boxShadow: '0 8px 20px rgba(185, 122, 90, 0.20)',
            }
          : {
              color: 'var(--color-muted-ink)',
            }
      }
    >
      {label}
    </Link>
  )
}

export default function HostNavigation() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/host/dashboard') return pathname === '/host/dashboard'
    return pathname?.startsWith(path) ?? false
  }

  return (
    <nav
      className="pointer-events-auto sticky top-0 z-50 border-b backdrop-blur-md"
      style={{
        borderColor: 'var(--border)',
        backgroundColor: 'rgba(255,255,255,0.82)',
      }}
    >
      <div className="relative mx-auto max-w-[1200px] px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="font-serif text-xl transition-colors"
              style={{ color: 'var(--color-ink-strong)' }}
            >
              <span className="hover:opacity-80">Agistrea</span>
            </Link>

            {/* pills container */}
            <div
              className="flex items-center gap-1 rounded-full p-1"
              style={{
                backgroundColor: 'color-mix(in srgb, #ffffff 72%, var(--color-sand) 28%)',
                border: '1px solid var(--border)',
              }}
            >
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

          {/* Right */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm transition-colors"
              style={{ color: 'var(--color-muted-ink)' }}
            >
              <span className="hover:text-[color:var(--color-ink)]">Back to site</span>
            </Link>

            <div className="h-4 w-px" style={{ backgroundColor: 'var(--border)' }} />

            <Link
              href="/help"
              className="text-sm transition-colors"
              style={{ color: 'var(--color-muted-ink)' }}
            >
              <span className="hover:text-[color:var(--color-terracotta)]">Help</span>
            </Link>

            <form action={logoutAction}>
              <button
                type="submit"
                className="text-sm transition-colors"
                style={{ color: 'var(--color-muted-ink)' }}
              >
                <span className="hover:text-[color:var(--color-ink)]">Logout</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  )
}
