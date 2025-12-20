import { createSupabaseServer } from '@/lib/supabase/server'
import {
  publishPropertyAction,
  updatePropertyAction,
  uploadPropertyImageAction,
} from '../../../actions'
import { redirect } from 'next/navigation'

const PROPERTY_IMAGE_BUCKET = 'property-images'

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function OwnerPropertyEditPage({ params }: PageProps) {
  const { id } = await params

  const supabase = await createSupabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/host/login')
  const authedUser = user

  const { data: property, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .eq('host_id', user?.id)
    .single()

  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>
  if (!property) return <div>Nicht gefunden oder keine Berechtigung.</div>

  const { data: images } = await supabase
    .from('property_images')
    .select('id, storage_path, sort_order')
    .eq('property_id', id) // <-- wichtig: id, nicht params.id
    .order('sort_order', { ascending: true })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const buildImageUrl = (path: string) =>
    supabaseUrl ? `${supabaseUrl}/storage/v1/object/public/${PROPERTY_IMAGE_BUCKET}/${path}` : null

  return (
    <div>
      <div className="flex items-center gap-3">
        <h1>Unterkunft bearbeiten</h1>
        <span className="rounded-full bg-black/5 px-3 py-1 text-xs text-black/60 uppercase">
          {property.status ?? 'draft'}
        </span>
      </div>
      <p>ID: {property.id}</p>

      <section className="mt-4 space-y-3">
        <h2 className="text-lg font-semibold">Bilder</h2>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {(images ?? []).map(img => {
            const src = img?.storage_path ? buildImageUrl(img.storage_path) : null
            return (
              <div
                key={img.id}
                className="relative aspect-video overflow-hidden rounded-lg border border-black/10 bg-white"
              >
                {src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={src} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-black/40">
                    No image
                  </div>
                )}
                <div className="absolute top-2 left-2 rounded-full bg-black/70 px-2 py-[2px] text-[11px] text-white">
                  #{img.sort_order ?? 0}
                </div>
              </div>
            )
          })}
          {(images ?? []).length === 0 && (
            <div className="col-span-2 text-sm text-black/50 md:col-span-3">
              Noch keine Bilder hochgeladen.
            </div>
          )}
        </div>

        <form
          action={uploadPropertyImageAction}
          encType="multipart/form-data"
          className="space-y-2"
        >
          <input type="hidden" name="property_id" value={property.id} />
          <label className="block text-sm text-black/70">
            Neues Bild hochladen
            <input
              type="file"
              name="file"
              accept="image/*"
              className="mt-1 block w-full rounded border border-black/10 bg-white px-3 py-2 text-sm"
              required
            />
          </label>
          <button
            type="submit"
            className="inline-flex items-center rounded-full bg-[var(--btn-primary-bg)] px-4 py-2 text-sm font-medium text-[var(--btn-primary-text)] hover:bg-[var(--btn-primary-hover-bg)]"
          >
            Hochladen
          </button>
        </form>
      </section>

      <form action={updatePropertyAction}>
        <input type="hidden" name="property_id" value={property.id} />
        <label>
          Titel
          <input name="title" defaultValue={property.title ?? ''} />
        </label>

        <label>
          Beschreibung
          <textarea name="description" defaultValue={property.description ?? ''} rows={6} />
        </label>

        <label>
          Location (Text)
          <input name="location_text" defaultValue={property.location_text ?? ''} />
        </label>

        <div>
          <label>
            Personen
            <input name="guests" type="number" defaultValue={property.guests ?? 1} />
          </label>
          <label>
            Schlafzimmer
            <input name="bedrooms" type="number" defaultValue={property.bedrooms ?? 0} />
          </label>
          <label>
            Bäder
            <input name="bathrooms" type="number" defaultValue={property.bathrooms ?? 0} />
          </label>
        </div>

        <h3>Kontakt</h3>
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

        <button type="submit">Speichern</button>
      </form>

      {property.status !== 'published' && (
        <form action={publishPropertyAction} className="mt-4">
          <input type="hidden" name="property_id" value={property.id} />
          <button type="submit">Publish listing</button>
        </form>
      )}

      <div>
        <a href={`/stays/${property.slug}`} target="_blank" rel="noreferrer">
          Public Preview öffnen
        </a>
      </div>
    </div>
  )
}
