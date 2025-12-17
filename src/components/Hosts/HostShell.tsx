'use client'

import { useState } from 'react'
import HostTopbar from './HostTopbar'
import HostSidebar from './HostSidebar'

export default function HostShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[var(--bg-base)]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <button
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={[
          'fixed top-0 left-0 z-50 h-full w-[280px] border-r border-black/10 bg-white',
          'transition-transform md:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        <HostSidebar onNavigate={() => setSidebarOpen(false)} />
      </div>

      {/* Content */}
      <div className="md:pl-[280px]">
        <HostTopbar onOpenSidebar={() => setSidebarOpen(true)} />

        <main className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8">{children}</main>
      </div>
    </div>
  )
}
