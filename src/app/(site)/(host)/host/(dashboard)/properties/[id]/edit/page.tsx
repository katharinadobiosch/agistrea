import { redirect } from 'next/navigation'
import { createSupabaseServer } from '@/lib/supabase/server'
import {
  publishPropertyAction,
  updatePropertyAction,
  uploadPropertyImageAction,
} from '../../../actions'

const PROPERTY_IMAGE_BUCKET = 'property-images'

type PageProps = {
  params: { id: string }
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
      {children}
    </div>
  )
}

function Label({
  children,
  hint,
}: {
  children: React.ReactNode
  hint?: React.ReactNode
}) {
  return (
    <div className="flex items-start justify-between">
      <label className="text-sm font-medium text-[var(--color-ink-strong)]">{children}</label>
      {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
    </div>
  )
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="mt-1 w-full rounded-lg border border-border bg-[var(--bg-base)]/80 px-3 py-2 text-sm text-[var(--color-ink)] ring-offset-background transition focus:border-[var(--ring)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/60"
    />
  )
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className="mt-1 w-full rounded-lg border border-border bg-[var(--bg-base)]/80 px-3 py-2 text-sm text-[var(--color-ink)] ring-offset-background transition focus:border-[var(--ring)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/60"
    />
  )
}

function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' }) {
  const base = 'inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-medium transition'
  const styles =
    variant === 'primary'
      ? 'bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--btn-primary-hover-bg)]'
      : 'border border-border bg-secondary text-secondary-foreground hover:opacity-90'

  return (
    <button {...props} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  )
}

function ChapterHeader({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) {
  return (
    <div className="mb-4">
      <div className="font-serif text-2xl text-[var(--color-ink-strong)]">{title}</div>
      {subtitle ? <p className="text-sm text-muted-foreground">{subtitle}</p> : null}
      <div className="mt-4 border-t border-border" />
    </div>
  )
}

export default async function OwnerPropertyEditPage({ params }: PageProps) {
  const { id } = params

  const supabase = await createSupabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/host/login')

  const { data: property, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .eq('host_id', user.id)
    .single()

  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>
  if (!property) return <div>Not found or not allowed.</div>

  const { data: images } = await supabase
    .from('property_images')
    .select('id, path, sort_order')
    .eq('property_id', id)
    .order('sort_order', { ascending: true })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const buildImageUrl = (path: string) =>
    supabaseUrl ? `${supabaseUrl}/storage/v1/object/public/${PROPERTY_IMAGE_BUCKET}/${path}` : null

  const checklist = [
    { label: 'Title added', done: Boolean(property.title) },
    { label: 'Where is this stay?', done: Boolean(property.location_text) },
    { label: 'At least 5 photos', done: (images?.length ?? 0) >= 5 },
    { label: 'Sleeps set', done: Boolean(property.guests) },
    { label: 'Contact email set', done: Boolean(property.contact_email) },
  ]

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-6">
        {/* Top bar */}
        <div className="flex flex-col gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-[var(--shadow-soft)] md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Host Dashboard</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]/70" />
            <span className="font-serif text-lg text-[var(--color-ink-strong)]">Edit listing</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground uppercase">
              {property.status ?? 'draft'}
            </span>
            <a
              href={`/stays/${property.slug}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-border bg-secondary px-4 py-2 text-sm text-secondary-foreground hover:opacity-90"
            >
              Public preview
            </a>
            <Button type="submit" form="edit-form">
              Save changes
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            <Card>
              <ChapterHeader
                title="Basics"
                subtitle="Set the essentials so guests understand what this stay offers."
              />
              <form id="edit-form" action={updatePropertyAction} className="space-y-5">
                <input type="hidden" name="property_id" value={property.id} />

                <div className="space-y-2">
                  <Label hint="A warm, inviting title">Title</Label>
                  <Input name="title" defaultValue={property.title ?? ''} placeholder="Seaside apartment in Skala" />
                </div>

                <div className="space-y-2">
                  <Label hint="Neighborhood or island">Where is this stay?</Label>
                  <Input
                    name="location_text"
                    defaultValue={property.location_text ?? ''}
                    placeholder="Skala, Agistri"
                  />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Sleeps</Label>
                    <Input name="guests" type="number" defaultValue={property.guests ?? 1} min={1} />
                  </div>
                  <div className="space-y-2">
                    <Label>Bedrooms</Label>
                    <Input
                      name="bedrooms"
                      type="number"
                      defaultValue={property.bedrooms ?? 0}
                      min={0}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Bathrooms</Label>
                    <Input
                      name="bathrooms"
                      type="number"
                      defaultValue={property.bathrooms ?? 0}
                      min={0}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label hint="Share the mood, not just facts">Tell the story</Label>
                  <Textarea
                    name="description"
                    defaultValue={property.description ?? ''}
                    rows={6}
                    placeholder="Sun-soaked mornings, pine-scented breeze, a short walk to the beach..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Contact name</Label>
                  <Input name="contact_name" defaultValue={property.contact_name ?? ''} placeholder="Your name" />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      name="contact_email"
                      type="email"
                      defaultValue={property.contact_email ?? ''}
                      placeholder="host@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input
                      name="contact_phone"
                      defaultValue={property.contact_phone ?? ''}
                      placeholder="+30 ..."
                    />
                  </div>
                </div>
              </form>
            </Card>

            <Card>
              <ChapterHeader
                title="Photos"
                subtitle="A quick filmstrip to set the tone. Reorder coming soon."
              />

              {images && images.length > 0 ? (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map(img => {
                    const src = img?.path ? buildImageUrl(img.path) : null
                    return (
                      <div
                        key={img.id}
                        className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-secondary"
                      >
                        {src ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={src} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                            No image
                          </div>
                        )}
                        <div className="absolute left-1.5 top-1.5 rounded-full bg-black/70 px-2 py-[1px] text-[10px] text-white">
                          #{img.sort_order ?? 0}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-border bg-[var(--bg-section)]/60 p-4">
                  <div className="font-serif text-lg text-[var(--color-ink-strong)]">Add your first photo</div>
                  <p className="text-sm text-muted-foreground">It sets the tone for the stay.</p>
                </div>
              )}

              <form
                action={uploadPropertyImageAction}
                className="mt-4 flex flex-col gap-3 rounded-lg border border-border bg-[var(--bg-section)]/50 p-4 sm:flex-row sm:items-end"
              >
                <input type="hidden" name="property_id" value={property.id} />
                <div className="w-full">
                  <Label>New image</Label>
                  <Input type="file" name="file" accept="image/*" required />
                </div>
                <Button type="submit" className="sm:w-[160px]">
                  Upload photo
                </Button>
              </form>
            </Card>
          </div>

          <div className="space-y-6 lg:col-span-4">
            <Card>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Status</div>
              <div className="mt-2 flex items-center justify-between">
                <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground uppercase">
                  {property.status ?? 'draft'}
                </span>
                {property.status !== 'published' && (
                  <form action={publishPropertyAction}>
                    <input type="hidden" name="property_id" value={property.id} />
                    <Button type="submit" variant="secondary">
                      Publish listing
                    </Button>
                  </form>
                )}
              </div>
            </Card>

            <Card>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Ready to publish</div>
              <ul className="mt-3 space-y-2">
                {checklist.map(item => (
                  <li key={item.label} className="flex items-center gap-2 text-sm text-[var(--color-ink)]">
                    <span
                      className={[
                        'flex h-5 w-5 items-center justify-center rounded-full border',
                        item.done
                          ? 'border-[var(--color-olive)] bg-[var(--color-olive)] text-white'
                          : 'border-border text-muted-foreground',
                      ].join(' ')}
                    >
                      {item.done ? '✓' : '•'}
                    </span>
                    {item.label}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex gap-2">
                <Button type="submit" form="edit-form" variant="secondary" className="flex-1">
                  Save draft
                </Button>
                <Button type="button" className="flex-1" disabled>
                  Request review
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
