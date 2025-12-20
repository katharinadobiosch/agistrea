import { createSupabaseServer } from '@/lib/supabase/server'
import {
  publishPropertyAction,
  updatePropertyAction,
  uploadPropertyImageAction,
} from '../../../actions'
import { redirect } from 'next/navigation'

const PROPERTY_IMAGE_BUCKET = 'property-images'

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">{children}</div>
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm font-medium text-black/70">{children}</label>
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm focus:border-black/30 focus:outline-none"
    />
  )
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm focus:border-black/30 focus:outline-none"
    />
  )
}

function Button({
  children,
  variant = 'primary',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
}) {
  const base = 'inline-flex items-center rounded-full px-5 py-2 text-sm font-medium transition'
  const styles =
    variant === 'primary'
      ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:bg-[var(--btn-primary-hover-bg)]'
      : 'border border-black/10 bg-white text-black/70 hover:bg-black/5'

  return (
    <button {...props} className={`${base} ${styles}`}>
      {children}
    </button>
  )
}

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
    .eq('host_id', authedUser.id)
    .single()

  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>
  if (!property) return <div>Not found or not allowed.</div>

  const { data: images } = await supabase
    .from('property_images')
    .select('id, storage_path, sort_order')
    .eq('property_id', id)
    .order('sort_order', { ascending: true })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const buildImageUrl = (path: string) =>
    supabaseUrl ? `${supabaseUrl}/storage/v1/object/public/${PROPERTY_IMAGE_BUCKET}/${path}` : null

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-black/85">Edit listing</h1>
            <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-black/60 uppercase">
              {property.status ?? 'draft'}
            </span>
          </div>
          <p className="mt-1 text-xs text-black/40">ID: {property.id}</p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`/stays/${property.slug}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-black/70 hover:bg-black/5"
          >
            Public Preview
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
        {/* Images */}
        <div className="md:col-span-3">
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-black/80">Images</h2>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {(images ?? []).map(img => {
                const src = img?.storage_path ? buildImageUrl(img.storage_path) : null
                return (
                  <div
                    key={img.id}
                    className="relative aspect-video overflow-hidden rounded-xl border border-black/10 bg-black/[0.02]"
                  >
                    {src ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={src} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-black/40">
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
                <div className="col-span-2 rounded-xl border border-dashed border-black/15 bg-black/[0.02] p-6 text-sm text-black/50 md:col-span-3">
                  No images uploaded yet.
                </div>
              )}
            </div>

            <div className="mt-5 rounded-xl border border-black/10 bg-black/[0.02] p-4">
              <form
                action={uploadPropertyImageAction}
                className="flex flex-col gap-3 md:flex-row md:items-end"
              >
                <input type="hidden" name="property_id" value={property.id} />

                <div className="w-full">
                  <Label>New image</Label>
                  <Input type="file" name="file" accept="image/*" required />
                </div>

                <Button type="submit" className="md:w-[180px]">
                  Upload
                </Button>
              </form>
            </div>
          </Card>
        </div>

        {/* Details */}
        <div className="space-y-6 md:col-span-2">
          <Card>
            <h2 className="mb-4 text-base font-semibold text-black/80">Basics</h2>

            <form action={updatePropertyAction} className="space-y-4">
              <input type="hidden" name="property_id" value={property.id} />

              <div>
                <Label>Title</Label>
                <Input name="title" defaultValue={property.title ?? ''} />
              </div>

              <div>
                <Label>Location (text)</Label>
                <Input name="location_text" defaultValue={property.location_text ?? ''} />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label>Guests</Label>
                  <Input name="guests" type="number" defaultValue={property.guests ?? 1} min={1} />
                </div>
                <div>
                  <Label>Bedrooms</Label>
                  <Input
                    name="bedrooms"
                    type="number"
                    defaultValue={property.bedrooms ?? 0}
                    min={0}
                  />
                </div>
                <div>
                  <Label>Bathrooms</Label>
                  <Input
                    name="bathrooms"
                    type="number"
                    defaultValue={property.bathrooms ?? 0}
                    min={0}
                  />
                </div>
              </div>

              <div>
                <Label>Description</Label>
                <Textarea name="description" defaultValue={property.description ?? ''} rows={6} />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button type="submit">Save</Button>
              </div>
            </form>
          </Card>

          <Card>
            <h2 className="mb-4 text-base font-semibold text-black/80">Contact</h2>

            <form action={updatePropertyAction} className="space-y-4">
              <input type="hidden" name="property_id" value={property.id} />

              <div>
                <Label>Name</Label>
                <Input name="contact_name" defaultValue={property.contact_name ?? ''} />
              </div>

              <div>
                <Label>Email</Label>
                <Input name="contact_email" defaultValue={property.contact_email ?? ''} />
              </div>

              <div>
                <Label>Phone</Label>
                <Input name="contact_phone" defaultValue={property.contact_phone ?? ''} />
              </div>

              <div className="flex items-center justify-end pt-2">
                <Button type="submit">Save</Button>
              </div>
            </form>
          </Card>

          <Card>
            <h2 className="mb-4 text-base font-semibold text-black/80">Publish</h2>
            {property.status !== 'published' && (
              <form action={publishPropertyAction} className="space-y-3">
                <input type="hidden" name="property_id" value={property.id} />
                <Button type="submit" variant="secondary" className="w-full">
                  Publish listing
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
