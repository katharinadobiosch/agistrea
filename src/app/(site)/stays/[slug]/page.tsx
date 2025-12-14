import { createSupabaseServer } from '@/lib/supabase/server'

export default async function StayPage({ params }: { params: { slug: string } }) {
  const supabase = await createSupabaseServer()

  const { data: property, error } = await supabase
    .from('properties')
    .select('*')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .maybeSingle()

  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>
  if (!property) return <div>Nicht gefunden / nicht veröffentlicht</div>

  return (
    <div>
      <h1>{property.title}</h1>
      <p>{property.location_text}</p>
      <p>{property.description}</p>

      <ul>
        <li>Gäste: {property.guests}</li>
        <li>Schlafzimmer: {property.bedrooms}</li>
        <li>Bäder: {property.bathrooms}</li>
      </ul>
    </div>
  )
}
