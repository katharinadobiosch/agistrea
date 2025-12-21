'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

export default function HostTopbar({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  const router = useRouter()

  async function onLogout() {
    console.log('Logout button clicked')
    await supabase.auth.signOut()
    router.push('/host/login')
    router.refresh()
  }

  return (
    <header className="border-border sticky top-0 z-[9999] border-b bg-[var(--bg-base)]/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenSidebar}
            className="border-border bg-card inline-flex h-9 w-9 items-center justify-center rounded-md border text-[var(--color-ink-strong)] md:hidden"
            aria-label="Open sidebar"
          >
            <span className="block h-[2px] w-4 bg-[var(--color-ink-strong)]" />
            <span className="sr-only">Menu</span>
          </button>
          <div className="flex items-baseline gap-2">
            <div className="font-serif text-lg text-[var(--color-ink-strong)]">New stay</div>
            <span className="text-muted-foreground text-xs">Draft</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button type="button" className="text-sm text-[var(--text-accent)] hover:underline">
            Help
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="border-border hover:bg-secondary rounded-full border px-4 py-2 text-sm text-[var(--color-ink-strong)]"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
