import { createSupabaseServer } from '@/lib/supabase/server'

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function StayPage({ params }: PageProps) {
  const { slug } = await params

  const supabase = await createSupabaseServer()

  const { data: property, error } = await supabase
    .from('properties')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle()

  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>
  if (!property) return <div>Not found / not published</div>

  const { data: images } = await supabase
    .from('property_images')
    .select('id, path, sort_order')
    .eq('property_id', property.id)
    .order('sort_order', { ascending: true })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const buildImageUrl = (path: string) =>
    supabaseUrl ? `${supabaseUrl}/storage/v1/object/public/property-images/${path}` : null

  return (
    <div>
      <h1>{property.title}</h1>
      <p>{property.location_text}</p>
      <p>{property.description}</p>

      {(images?.length ?? 0) > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
          {images?.map(img => {
            const src = img.path ? buildImageUrl(img.path) : null
            return (
              <div key={img.id} className="relative aspect-video overflow-hidden rounded-lg">
                {src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={src} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-black/40">
                    Image unavailable
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      <ul>
        <li>Guests: {property.guests}</li>
        <li>Bedrooms: {property.bedrooms}</li>
        <li>Bathrooms: {property.bathrooms}</li>
      </ul>
    </div>
  )
}
