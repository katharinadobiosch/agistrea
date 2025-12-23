'use server'

import { createSupabaseServer } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { randomUUID } from 'crypto'

const PROPERTY_IMAGE_BUCKET = 'property-images'

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

export async function createPropertyAction(): Promise<void> {
  const supabase = await createSupabaseServer()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user) redirect('/host/login')

  const title = 'New listing'
  const baseSlug = slugify(title)
  const slug = await ensureUniqueSlug(supabase, baseSlug)

  // ✅ EINMAL properties anlegen (mit defaults)
  const { data: inserted, error: insertError } = await supabase
    .from('properties')
    .insert({
      host_id: user.id,
      title,
      status: 'draft',
      slug,
      location_text: 'Agistri',
      guests: 2,
      bedrooms: 1,
      bathrooms: 1,

      // ✅ defaults (DB: properties.*)
      // default_price_per_night: 100,
      // default_min_nights: 2,
      currency: 'EUR',
    })
    .select('id, slug')
    .single()

  if (insertError || !inserted?.id) {
    console.error('createPropertyAction insert/return failed', { insertError, inserted })
    throw new Error('Could not create the listing. Please try again later.')
  }

  const propertyId = inserted.id

  // ✅ property_features anlegen
  const { error: featuresError } = await supabase.from('property_features').insert({
    property_id: propertyId,
    features: {},
  })
  if (featuresError) {
    console.error('property_features insert failed', featuresError)
    throw new Error('Could not create the listing. Please try again later.')
  }

  // ❌ property_prices block komplett entfernen (Tabelle gibt’s nicht mehr)

  revalidatePath('/host/properties')
  revalidatePath('/host/dashboard')

  redirect(`/host/properties/${propertyId}/edit`)
}

export async function updatePropertyAction(formData: FormData) {
  const supabase = await createSupabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const propertyId = String(formData.get('property_id') ?? '')
  if (!user || !propertyId) redirect('/host/login')

  const { data: ownership } = await supabase
    .from('properties')
    .select('host_id')
    .eq('id', propertyId)
    .maybeSingle()

  if (!ownership || ownership.host_id !== user.id) {
    throw new Error('Not allowed to edit this property.')
  }

  // helper: empty string => null
  const toNullableNumber = (v: FormDataEntryValue | null) => {
    const s = String(v ?? '').trim()
    if (!s) return null
    const n = Number(s)
    return Number.isFinite(n) ? n : null
  }

  const toIntOrNull = (v: FormDataEntryValue | null) => {
    const s = String(v ?? '').trim()
    if (!s) return null
    const n = Number.parseInt(s, 10)
    return Number.isFinite(n) ? n : null
  }

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

    // ✅ NEW: pricing defaults
    default_price_per_night: toNullableNumber(formData.get('default_price_per_night')),
    default_min_nights: toIntOrNull(formData.get('default_min_nights')) ?? 1,
    currency: String(formData.get('currency') ?? 'EUR'),

    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase.from('properties').update(payload).eq('id', propertyId)

  if (error) {
    console.error(error)
    throw new Error('Update failed. Please try again later.')
  }

  revalidatePath(`/host/properties/${propertyId}/edit`)
  revalidatePath('/host/dashboard')
  revalidatePath('/host/properties')

  redirect(`/host/properties/${propertyId}/edit`)
}

export async function publishPropertyAction(formData: FormData) {
  const supabase = await createSupabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const propertyId = String(formData.get('property_id') ?? '')

  if (!user || !propertyId) {
    redirect('/host/login')
  }

  const { data: ownership } = await supabase
    .from('properties')
    .select('host_id, status, slug')
    .eq('id', propertyId)
    .maybeSingle()

  if (!ownership || ownership.host_id !== user!.id) {
    throw new Error('Not allowed to publish this property.')
  }

  const { error } = await supabase
    .from('properties')
    .update({ status: 'published', updated_at: new Date().toISOString() })
    .eq('id', propertyId)

  if (error) {
    console.error(error)
    throw new Error('Publishing failed. Please try again later.')
  }

  revalidatePath(`/host/properties/${propertyId}/edit`)
  revalidatePath('/host/dashboard')
  revalidatePath('/host/properties')
  if (ownership.slug) {
    revalidatePath(`/stays/${ownership.slug}`)
  }

  redirect(`/host/properties/${propertyId}/edit`)
}

export async function uploadPropertyImageAction(formData: FormData) {
  const supabase = await createSupabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const propertyId = String(formData.get('property_id') ?? '')
  const file = formData.get('file') as File | null

  if (!user || !propertyId) {
    redirect('/host/login')
  }

  if (!file) {
    throw new Error('Please choose an image.')
  }

  if (file.size > 8 * 1024 * 1024) {
    throw new Error('Image too large. Please choose a file smaller than 8 MB.')
  }

  const { data: ownership } = await supabase
    .from('properties')
    .select('host_id, slug')
    .eq('id', propertyId)
    .maybeSingle()

  if (!ownership || ownership.host_id !== user!.id) {
    throw new Error('Not allowed to add images to this property.')
  }

  const fileExt = file.name.split('.').pop()
  const path = `${propertyId}/${randomUUID()}${fileExt ? `.${fileExt}` : ''}`

  const { error: uploadError } = await supabase.storage
    .from(PROPERTY_IMAGE_BUCKET)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type || undefined,
    })

  if (uploadError) {
    console.error('STORAGE UPLOAD ERROR', {
      name: uploadError.name,
      message: uploadError.message,
      statusCode: (uploadError as any).statusCode,
      error: uploadError,
      bucket: PROPERTY_IMAGE_BUCKET,
      path,
      contentType: file.type,
      size: file.size,
    })
    throw new Error(uploadError.message || 'Upload failed. Please try again later.')
  }

  const { data: last } = await supabase
    .from('property_images')
    .select('sort_order')
    .eq('property_id', propertyId)
    .order('sort_order', { ascending: false })
    .limit(1)
    .maybeSingle()

  const sortOrder = (last?.sort_order ?? 0) + 1

  const { error: insertError } = await supabase.from('property_images').insert({
    property_id: propertyId,
    storage_path: path,
    sort_order: sortOrder,
  })

  if (insertError) {
    console.error(insertError)
    throw new Error('Could not save image reference.')
  }

  revalidatePath(`/host/properties/${propertyId}/edit`)
  revalidatePath('/host/dashboard')
  revalidatePath('/host/properties')
  if (ownership.slug) {
    revalidatePath(`/stays/${ownership.slug}`)
  }

  redirect(`/host/properties/${propertyId}/edit`)
}

export async function logoutAction() {
  console.log('button clicked')

  const supabase = await createSupabaseServer()
  await supabase.auth.signOut()
  redirect('/host/login')
}
