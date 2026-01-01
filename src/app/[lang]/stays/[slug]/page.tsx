import type { Metadata } from 'next'
import PublicPropertyPage from '@/components/Property/PublicPropertyPage'
import { createSupabaseServerReadOnly } from '@/lib/supabase/server'

type PageProps = {
  params: Promise<{ slug: string }>
}
export async function generateMetadata({ params }: PageProps) {
  const supabase = await createSupabaseServerReadOnly()
  const { slug } = await params

  const { data: property } = await supabase
    .from('properties')
    .select('title, description, location_text, slug, status')
    .eq('slug', slug)
    .is('deleted_at', null)
    .single()

  if (!property) return { title: 'Stay not found | Agistrea' }

  const title = `${property.title} – ${property.location_text ?? 'Agistri'} | Agistrea`
  const description =
    property.description?.slice(0, 155) ??
    `Book ${property.title} in ${property.location_text ?? 'Agistri'} with Agistrea.`

  const isPublished = property.status === 'published'

  return {
    title,
    description,
    alternates: { canonical: `/stays/${property.slug}` },
    robots: isPublished ? undefined : { index: false, follow: false },
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  return <PublicPropertyPage slug={slug} />
}
