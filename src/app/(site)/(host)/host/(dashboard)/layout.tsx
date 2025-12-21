import HostShell from '@/components/Hosts/HostShell'
import { createSupabaseServer } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function HostDashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/host/login')
  }

  return <HostShell>{children}</HostShell>
}
