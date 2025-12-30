import { redirect } from 'next/navigation'
import { createSupabaseServer } from '@/lib/supabase/server'
import HostAuthForm from '@/components/Hosts/HostAuthForm'

export default async function HostLoginPage({ params }: { params: { lang: 'en' | 'gr' } }) {
  const supabase = await createSupabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect(`/${params.lang}/host/properties`)
  }

  return <HostAuthForm />
}
