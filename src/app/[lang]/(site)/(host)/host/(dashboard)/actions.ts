export async function deletePropertyAction(formData: FormData) {
  const supabase = await createSupabaseServerAction()

  const propertyId = String(formData.get('property_id') ?? '')
  if (!propertyId) {
    throw new Error('Missing property_id')
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) redirect('/host/login')

  const now = new Date().toISOString()

  const { error } = await supabase
    .from('properties')
    .update({ deleted_at: now, updated_at: now })
    .eq('id', propertyId)
    .eq('host_id', user.id)

  if (error) {
    console.error(error)
    throw new Error('Delete failed. Please try again later.')
  }

  revalidatePath('/host/dashboard')
  revalidatePath('/host/properties')

  redirect('/host/properties')
}
