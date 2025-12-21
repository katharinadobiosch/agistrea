'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

function NavItem({
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
        'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-[var(--color-ink)] transition',
        active ? 'bg-[var(--bg-section)] font-medium' : 'hover:bg-[var(--bg-section)]/60',
      ].join(' ')}
    >
      <span
        className={[
          'h-6 w-1 rounded-full transition',
          active ? 'bg-[var(--primary)]' : 'bg-transparent group-hover:bg-[var(--primary)]/30',
        ].join(' ')}
      />
      <span className="text-[var(--color-ink-strong)]">{label}</span>
    </Link>
  )
}

export default function HostSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <aside className="host-sidebar flex h-full flex-col bg-[var(--bg-section)]/60 pl-[60px] text-[var(--color-ink)]">
      <div className="flex h-14 items-center justify-between border-b border-border px-4">
        <div className="font-serif text-lg text-[var(--color-ink-strong)]">Agistrea</div>
        <div className="text-xs text-[var(--color-muted-ink)]">Hosts</div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        <NavItem
          href="/host/dashboard"
          label="Dashboard"
          active={pathname?.startsWith('/host/dashboard') ?? false}
          onClick={onNavigate}
        />
        <NavItem
          href="/host/properties"
          label="Listings"
          active={pathname?.startsWith('/host/properties') ?? false}
          onClick={onNavigate}
        />
        <NavItem
          href="/host/properties/new"
          label="Create listing"
          active={pathname === '/host/properties/new'}
          onClick={onNavigate}
        />

        <div className="my-2 border-t border-black/10" />

        <NavItem href="/" label="Back to site" active={false} onClick={onNavigate} />
      </nav>

      <div className="border-t border-black/10 p-4 text-xs text-black/50">
        <div className="text-[var(--color-muted-ink)]">v0 Dashboard</div>
      </div>
    </aside>
  )
}
