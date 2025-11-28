// app/listings/[slug]/page.tsx
import { notFound } from "next/navigation";
import { db } from "@/lib/db";

type Props = { params: { slug: string } };

export default async function ListingPage({ params }: Props) {
  // EIN Listing anhand des Slugs laden
  const { data: listing, error } = await db
    .from("listings")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (error || !listing) {
    console.error("Listing not found:", error);
    return notFound();
  }

  return (
    <main className="mx-auto max-w-[960px] px-6 py-10">
      <h1 className="text-[32px] font-semibold text-[var(--text-main)]">
        {listing.title}
      </h1>

      <p className="mt-2 text-[14px] uppercase tracking-[0.16em] text-[var(--text-accent)]">
        {listing.location}
      </p>

      <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-muted-foreground)]">
        {listing.description}
      </p>

      {/* Hier später Bilder, Preise, Features */}
    </main>
  );
}
