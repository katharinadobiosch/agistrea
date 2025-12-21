import { redirect } from 'next/navigation'
import { createSupabaseServer } from '@/lib/supabase/server'
import HostsLoginPage from '../login/page'

export default async function HostRegisterPage() {
  const supabase = await createSupabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/host/dashboard')
  }

  // Reuse the login component in register mode (handled client-side via query)
  return <HostsLoginPage />
}
