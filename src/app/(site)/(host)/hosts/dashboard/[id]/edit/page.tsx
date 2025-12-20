import { createSupabaseServer } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export default async function OwnerPropertyEditPage({ params }: { params: { id: string } }) {
  const supabase = await createSupabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return <div>Please log in.</div>
  }

  const { data: property, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .eq('host_id', user.id)
    .single()

  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>
  if (!property) return <div>Not found or not allowed.</div>

  async function updateBasicsAction(formData: FormData) {
    'use server'
    const supabase = await createSupabaseServer()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    const { data: ownership } = await supabase
      .from('properties')
      .select('host_id')
      .eq('id', id)
      .maybeSingle()

    if (!ownership || ownership.host_id !== user.id) return

    const payload = {
      title: String(formData.get('title') ?? ''),
      description: String(formData.get('description') ?? ''),
      location_text: String(formData.get('location_text') ?? ''),
      guests: Number(formData.get('guests') ?? 1),
      bedrooms: Number(formData.get('bedrooms') ?? 0),
      bathrooms: Number(formData.get('bathrooms') ?? 0),
      contact_name: String(formData.get('contact_name') ?? ''),
      contact_email: String(formData.get('contact_email') ?? ''),
      contact_phone: String(formData.get('contact_phone') ?? ''),
      updated_at: new Date().toISOString(),
    }

    const { error } = await supabase
      .from('properties')
      .update(payload)
      .eq('id', id)
      .eq('host_id', user.id)

    if (error) {
      console.error(error)
      throw new Error('Update failed. Please try again later.')
    }

    revalidatePath(`/hosts/dashboard/${id}/edit`)
    revalidatePath('/hosts/dashboard')
  }

  return (
    <div>
      <h1>Edit listing</h1>
      <p>ID: {property.id}</p>

      <form action={updateBasicsAction}>
        <label>
          Title
          <input name="title" defaultValue={property.title ?? ''} />
        </label>

        <label>
          Description
          <textarea name="description" defaultValue={property.description ?? ''} rows={6} />
        </label>

        <label>
          Location (text)
          <input name="location_text" defaultValue={property.location_text ?? ''} />
        </label>

        <div>
          <label>
            Guests
            <input name="guests" type="number" defaultValue={property.guests ?? 1} />
          </label>
          <label>
            Bedrooms
            <input name="bedrooms" type="number" defaultValue={property.bedrooms ?? 0} />
          </label>
          <label>
            Bathrooms
            <input name="bathrooms" type="number" defaultValue={property.bathrooms ?? 0} />
          </label>
        </div>

        <h3>Contact</h3>
        <label>
          Name
          <input name="contact_name" defaultValue={property.contact_name ?? ''} />
        </label>
        <label>
          Email
          <input name="contact_email" defaultValue={property.contact_email ?? ''} />
        </label>
        <label>
          Phone
          <input name="contact_phone" defaultValue={property.contact_phone ?? ''} />
        </label>

        <button type="submit">Save</button>
      </form>

      <div>
        <a href={`/stays/${property.slug}`} target="_blank" rel="noreferrer">
          Open public preview
        </a>
      </div>
    </div>
  )
}
