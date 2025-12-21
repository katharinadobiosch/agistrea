import { createSupabaseServer } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function HostAuthLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // already logged in -> keep them out of auth pages
  if (user) {
    redirect('/host/properties')
  }

  return <>{children}</>
}
