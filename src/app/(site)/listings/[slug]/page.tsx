import { notFound } from 'next/navigation'
import { db } from '@/lib/db'

type Props = { params: { slug: string } }

export default async function ListingPage({ params }: Props) {
  const { data: listing, error } = await db
    .from('listings')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (error || !listing) {
    console.error('Listing not found:', error)
    return notFound()
  }

  return (
    <main className="listing-page mx-auto max-w-240 px-6 py-10">
      <h1 className="text-[32px] font-semibold text-(--text-main)">{listing.title}</h1>

      <p className="mt-2 text-[14px] tracking-[0.16em] text-(--text-accent) uppercase">
        {listing.location}
      </p>

      <p className="text-muted-foreground mt-4 text-[15px] leading-relaxed">
        {listing.description}
      </p>
    </main>
  )
}
