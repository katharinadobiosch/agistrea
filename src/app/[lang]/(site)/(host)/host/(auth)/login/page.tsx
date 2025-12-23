import { redirect } from 'next/navigation'
import { createSupabaseServer } from '@/lib/supabase/server'
import HostAuthForm from '@/components/Hosts/HostAuthForm'

export default async function HostLoginPage() {
  const supabase = await createSupabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/host/properties')
  }

  return <HostAuthForm />
}
