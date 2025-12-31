import { redirect } from 'next/navigation'
import { createSupabaseServerReadOnly } from '@/lib/supabase/server'
import HostAuthForm from '@/components/Hosts/HostAuthForm'

type Props = {
  params: Promise<{ lang: 'en' | 'gr' }>
}

export default async function HostLoginPage({ params }: Props) {
  const { lang } = await params

  const supabase = await createSupabaseServerReadOnly()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect(`/${lang}/host/properties`)
  }

  return <HostAuthForm />
}
