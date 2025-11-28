// app/listings/page.tsx
import { db } from "@/lib/db";

export default async function ListingsPage() {
  const { data: listings, error } = await db.from("listings").select("*");

  return (
    <main className="mx-auto max-w-[960px] px-6 py-10">
      <h1 className="mb-6 text-[28px] font-semibold text-[var(--text-main)]">
        Stays on Agistri
      </h1>

      <div className="grid gap-[24px] sm:grid-cols-2 lg:grid-cols-3">
        {listings?.map((listing) => (
          <a
            key={listing.id}
            href={`/listings/${listing.slug}`}
            className="rounded-[16px] border border-[var(--border-light)] bg-[var(--color-soft-white)] p-4 hover:shadow-md transition-shadow"
          >
            <h2 className="text-[16px] font-semibold text-[var(--text-main)]">
              {listing.title}
            </h2>
            <p className="mt-1 text-[14px] text-[var(--color-muted-foreground)]">
              {listing.location}
            </p>
          </a>
        ))}
      </div>
    </main>
  );
}
