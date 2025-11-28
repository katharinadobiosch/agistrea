// app/listings/[slug]/page.tsx
import { notFound } from "next/navigation";
import { db } from "@/lib/db";

type Props = { params: { slug: string } };

export default async function ListingPage({ params }: Props) {
  const listing = await db.listing.findUnique({
    where: { slug: params.slug },
    include: { images: true, host: true },
  });

  if (!listing) return notFound();

  return (
    <main className="mx-auto max-w-[960px] px-6 py-10">
      <h1 className="text-[32px] font-semibold text-[var(--text-main)]">
        {listing.title}
      </h1>
      <p className="mt-2 text-[14px] uppercase tracking-[0.16em] text-[var(--text-accent)]">
        {listing.location}
      </p>
      {/* Bilder, Beschreibung, Details */}
    </main>
  );
}
