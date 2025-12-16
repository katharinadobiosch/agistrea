'use client'

export default function HostTopbar({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  return (
    <header className="sticky top-0 z-30 border-b border-black/10 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenSidebar}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-black/10 md:hidden"
            aria-label="Open sidebar"
          >
            {/* simple hamburger */}
            <span className="block h-[2px] w-4 bg-black/70" />
            <span className="sr-only">Menu</span>
          </button>

          <div className="font-medium">Host Dashboard</div>
        </div>

        <div className="flex items-center gap-2">
          {/* placeholder actions */}
          <button
            type="button"
            className="rounded-md border border-black/10 px-3 py-1.5 text-sm hover:bg-black/5"
          >
            Help
          </button>

          <button
            type="button"
            className="rounded-md bg-black px-3 py-1.5 text-sm text-white hover:opacity-90"
            onClick={() => {
              // später: supabase.auth.signOut()
              window.location.href = '/hosts/login'
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
