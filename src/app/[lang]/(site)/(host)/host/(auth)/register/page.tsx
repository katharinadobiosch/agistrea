import { redirect } from 'next/navigation'
import { createSupabaseServer } from '@/lib/supabase/server'
import HostAuthForm from '@/components/Hosts/HostAuthForm'

export default async function HostRegisterPage() {
  const supabase = await createSupabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/host/properties')
  }

  // The form can switch to register mode via query (?mode=register) if supported
  return <HostAuthForm />
}
