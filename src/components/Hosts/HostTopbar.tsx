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
    <header
      onClickCapture={() => console.log('HEADER CLICK CAPTURE')}
      className="sticky top-0 z-[9999] border-b border-black/10 bg-white/80 backdrop-blur"
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenSidebar}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-black/10 md:hidden"
            aria-label="Open sidebar"
          >
            <span className="block h-[2px] w-4 bg-black/70" />
            <span className="sr-only">Menu</span>
          </button>

          <div className="font-medium">Host Dashboard</div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-md border border-black/10 px-3 py-1.5 text-sm hover:bg-black/5"
          >
            Help
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="rounded-md bg-black px-3 py-1.5 text-sm text-white hover:bg-black/80"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
