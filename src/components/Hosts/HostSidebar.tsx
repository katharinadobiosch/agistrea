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
        'flex items-center gap-2 rounded-md px-3 py-2 text-sm',
        active ? 'bg-black text-white' : 'text-black/80 hover:bg-black/5',
      ].join(' ')}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {label}
    </Link>
  )
}

export default function HostSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <aside className="host-sidebar flex h-full flex-col pl-[60px]">
      <div className="flex h-14 items-center justify-between border-b border-black/10 px-4">
        <div className="font-semibold">Agistrea</div>
        <div className="text-xs text-black/50">Hosts</div>
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
        <div>v0 Dashboard</div>
      </div>
    </aside>
  )
}
