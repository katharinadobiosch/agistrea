// ✅ HostNavigation.tsx (Mobile First + Responsive)
// - Active Pill: terracotta
// - Container-Pills: warm sand surface
// - Header: white/clean mit subtle sand tint + border warm
// - Mobile: Hamburger Menu mit Slide-in
// - Desktop: Original Pills Layout

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { logoutAction } from '@/app/(site)/(host)/host/actions'

function NavLink({
  href,
  label,
  active,
  onClick,
}: {
  href: string
  label: string
  active: boolean
  onClick?: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === '/host/dashboard') return pathname === '/host/dashboard'
    return pathname?.startsWith(path) ?? false
  }

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <>
      <nav
        className="host-navigation pointer-events-auto sticky top-0 z-50 border-b backdrop-blur-md"
        style={{
          borderColor: 'var(--border)',
          backgroundColor: 'rgba(255,255,255,0.82)',
        }}
      >
        <div className="relative mx-auto max-w-300 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Left - Logo */}
            <Link
              href="/"
              className="font-serif text-lg transition-colors sm:text-xl"
              style={{ color: 'var(--color-ink-strong)' }}
            >
              <span className="hover:opacity-80">Agistrea</span>
            </Link>

            {/* Desktop Navigation - Pills */}
            <div className="hidden items-center gap-8 lg:flex">
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

            {/* Right - Desktop Links */}
            <div className="hidden items-center gap-4 lg:flex">
              <Link
                href="/"
                className="text-sm transition-colors"
                style={{ color: 'var(--color-muted-ink)' }}
              >
                <span className="hover:text-(--color-ink)">Back to site</span>
              </Link>

              <div className="h-4 w-px" style={{ backgroundColor: 'var(--border)' }} />

              <Link
                href="/help"
                className="text-sm transition-colors"
                style={{ color: 'var(--color-muted-ink)' }}
              >
                <span className="hover:text-(--color-terracotta)">Help</span>
              </Link>

              <form action={logoutAction}>
                <button
                  type="submit"
                  className="text-sm transition-colors"
                  style={{ color: 'var(--color-muted-ink)' }}
                >
                  <span className="cursor-pointer hover:text-(--color-ink) hover:underline">
                    Logout
                  </span>
                </button>
              </form>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 transition-colors lg:hidden"
              style={{ color: 'var(--color-ink-strong)' }}
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu Slide-in */}
      <div
        className={[
          'fixed top-0 right-0 bottom-0 z-50 w-70 transform transition-transform duration-300 ease-in-out lg:hidden',
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
        style={{
          backgroundColor: '#ffffff',
          boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div className="flex h-full flex-col">
          {/* Mobile Header */}
          <div
            className="flex items-center justify-between border-b px-6 py-4"
            style={{ borderColor: 'var(--border)' }}
          >
            <span className="font-serif text-lg" style={{ color: 'var(--color-ink-strong)' }}>
              Menu
            </span>
            <button
              onClick={closeMobileMenu}
              className="rounded-lg p-2 transition-colors"
              style={{ color: 'var(--color-ink-strong)' }}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <div className="flex-1 space-y-1 px-6 py-6">
            <Link
              href="/host/dashboard"
              onClick={closeMobileMenu}
              className={[
                'block rounded-lg px-4 py-3 text-sm font-medium transition-all',
                isActive('/host/dashboard') ? 'text-white' : '',
              ].join(' ')}
              style={
                isActive('/host/dashboard')
                  ? {
                      backgroundColor: 'var(--color-terracotta)',
                      boxShadow: '0 4px 12px rgba(185, 122, 90, 0.15)',
                    }
                  : { color: 'var(--color-ink)' }
              }
            >
              Dashboard
            </Link>

            <Link
              href="/host/properties"
              onClick={closeMobileMenu}
              className={[
                'block rounded-lg px-4 py-3 text-sm font-medium transition-all',
                isActive('/host/properties') && !pathname?.includes('/new') ? 'text-white' : '',
              ].join(' ')}
              style={
                isActive('/host/properties') && !pathname?.includes('/new')
                  ? {
                      backgroundColor: 'var(--color-terracotta)',
                      boxShadow: '0 4px 12px rgba(185, 122, 90, 0.15)',
                    }
                  : { color: 'var(--color-ink)' }
              }
            >
              Listings
            </Link>

            <Link
              href="/host/properties/new"
              onClick={closeMobileMenu}
              className={[
                'block rounded-lg px-4 py-3 text-sm font-medium transition-all',
                pathname === '/host/properties/new' ? 'text-white' : '',
              ].join(' ')}
              style={
                pathname === '/host/properties/new'
                  ? {
                      backgroundColor: 'var(--color-terracotta)',
                      boxShadow: '0 4px 12px rgba(185, 122, 90, 0.15)',
                    }
                  : { color: 'var(--color-ink)' }
              }
            >
              Create Listing
            </Link>

            <div className="my-4 h-px" style={{ backgroundColor: 'var(--border)' }} />

            <Link
              href="/"
              onClick={closeMobileMenu}
              className="block rounded-lg px-4 py-3 text-sm font-medium transition-colors"
              style={{ color: 'var(--color-muted-ink)' }}
            >
              Back to site
            </Link>

            <Link
              href="/help"
              onClick={closeMobileMenu}
              className="block rounded-lg px-4 py-3 text-sm font-medium transition-colors"
              style={{ color: 'var(--color-muted-ink)' }}
            >
              Help
            </Link>
          </div>

          {/* Mobile Footer */}
          <div className="border-t px-6 py-4" style={{ borderColor: 'var(--border)' }}>
            <form action={logoutAction}>
              <button
                type="submit"
                className="w-full cursor-pointer rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors"
                style={{
                  color: 'var(--color-muted-ink)',
                  backgroundColor: 'color-mix(in srgb, #ffffff 72%, var(--color-sand) 28%)',
                }}
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
