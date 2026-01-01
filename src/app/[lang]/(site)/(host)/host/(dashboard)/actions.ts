'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createSupabaseServer } from '@/lib/supabase/server' // NICHT read-only

export async function deletePropertyAction(formData: FormData) {
  const propertyId = String(formData.get('property_id') || '')

  if (!propertyId) {
    throw new Error('Missing property_id')
  }

  const supabase = await createSupabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/host/login')

  // Soft delete (passt zu deinem .is('deleted_at', null) Filter)
  const { error } = await supabase
    .from('properties')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', propertyId)
    .eq('host_id', user.id)

  if (error) {
    // Damit du den echten Grund siehst (RLS etc.)
    throw new Error(`Delete failed: ${error.message}`)
  }

  revalidatePath('/host/dashboard')
  redirect('/host/dashboard')
}
