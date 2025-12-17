'use server'

import { createSupabaseServer } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function logoutAction() {
  console.log('button clicked')

  const supabase = await createSupabaseServer()
  await supabase.auth.signOut()
  redirect('/hosts/login')
}
