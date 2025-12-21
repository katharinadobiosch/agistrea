import { redirect } from 'next/navigation'
import { createSupabaseServer } from '@/lib/supabase/server'
import HostsLoginPage from '../../../../hosts/login/page'

export default async function HostLoginPage() {
  const supabase = await createSupabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/host/dashboard')
  }

  return <HostsLoginPage />
}
