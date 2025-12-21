import { createSupabaseServer } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import HostNavigation from '@/components/Hosts/HostNavigation'

export default async function HostDashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/host/login')
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-(--color-cream) via-(--color-cream) to-[color-mix(in_srgb,var(--color-linen)_25%,var(--color-cream))] pl-[60px]">
      <HostNavigation />
      <main>{children}</main>
    </div>
  )
}
