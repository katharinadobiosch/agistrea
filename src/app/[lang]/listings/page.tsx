import { db } from '@/lib/db'

export default async function ListingsPage() {
  const { data: listings, error } = await db.from('listings').select('*')

  return (
    <main className="listing-page mx-auto max-w-240 px-6 py-10">
      <h1 className="mb-6 text-[28px] font-semibold text-(--text-main)">Stays on Agistri</h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {listings?.map(listing => (
          <a
            key={listing.id}
            href={`/listings/${listing.slug}`}
            className="rounded-2xl border border-(--border-light) bg-(--color-soft-white) p-4 transition-shadow hover:shadow-md"
          >
            <h2 className="text-[16px] font-semibold text-(--text-main)">{listing.title}</h2>
            <p className="mt-1 text-[14px] text-muted-foreground">
              {listing.location}
            </p>
          </a>
        ))}
      </div>
    </main>
  )
}
