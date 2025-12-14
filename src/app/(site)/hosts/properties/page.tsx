import Link from 'next/link'
import { createSupabaseServer } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/(^-|-$)/g, '')
}

async function ensureUniqueSlug(supabase: any, base: string) {
  const slug = base || 'property'
  for (let i = 0; i < 50; i++) {
    const candidate = i === 0 ? slug : `${slug}-${i + 1}`
    const { data } = await supabase
      .from('properties')
      .select('id')
      .eq('slug', candidate)
      .maybeSingle()
    if (!data) return candidate
  }
  return `${slug}-${Date.now()}`
}

export default async function OwnerPropertiesPage() {
  const supabase = await createSupabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return (
      <div>
        <p>Bitte einloggen.</p>
        <Link href="/hosts/login">Zum Login</Link>
      </div>
    )
  }

  async function createPropertyAction() {
    'use server'
    const supabase = await createSupabaseServer()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    const title = 'Neue Unterkunft'
    const baseSlug = slugify(title)
    const slug = await ensureUniqueSlug(supabase, baseSlug)

    const { data: inserted, error } = await supabase
      .from('properties')
      .insert({
        host_id: user.id,
        title,
        slug,
        location_text: 'Agistri',
        guests: 2,
        bedrooms: 1,
        bathrooms: 1,
      })
      .select('id')
      .single()

    if (error) throw error

    await supabase.from('property_features').insert({
      property_id: inserted.id,
      features: {},
    })
    await supabase.from('property_prices').insert({
      property_id: inserted.id,
      base_per_night: 0,
      min_nights: 1,
    })

    revalidatePath('/hosts/properties')
  }

  const { data: properties, error } = await supabase
    .from('properties')
    .select('id,title,slug,status,updated_at')
    .eq('host_id', user.id)
    .order('updated_at', { ascending: false })

  return (
    <div>
      <h1>Meine Unterkünfte</h1>

      <form action={createPropertyAction}>
        <button type="submit">+ Neue Unterkunft</button>
      </form>

      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}

      <ul>
        {(properties ?? []).map(p => (
          <li key={p.id}>
            <Link href={`/hosts/properties/${p.id}/edit`}>
              {p.title} ({p.status})
            </Link>
            <span>/stays/{p.slug}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
