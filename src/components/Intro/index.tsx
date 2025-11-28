import Link from "next/link";

export default function Intro() {
  return (
    <section className="intro pb-[64px] pt-[64px]">
      <section className="space-y-[12px]">
        <p className="text-[14px] font-semibold uppercase tracking-[2.5px] text-sky-700">
          Agistri, Greece
        </p>
        <h1 className="text-[32px] font-semibold leading-tight text-slate-900 sm:text-[32px]">
          Handpicked stays on a small pine-covered island.
        </h1>
        <p className="max-w-[100%] text-[14px] leading-relaxed text-[var(--color-muted-foreground)]">
          Agistrea is a small, curated directory of apartments and rooms on
          Agistri – from Skala and Megalochori to quiet corners near the pine
          forests and rocky coves. No mass tourism, just places we’d stay in
          ourselves.
        </p>

        <div className="mt-[8px] flex flex-col gap-[8px]">
          <Link
            href="/listings"
            className="text-[16px] font-medium text-[var(--color-accent)]"
          >
            Browse stays
            <i className="fa-solid fa-arrow-right pl-[8px]" />
          </Link>
          <Link
            href="/owners/register"
            className="text-[16px] font-medium text-[var(--color-accent)]"
          >
            List your place
            <i className="fa-solid fa-arrow-right pl-[8px]" />
          </Link>
        </div>
      </section>

      {/* Drei kleine Cards */}
      <section className="grid gap-[32px] pt-[24px] sm:grid-cols-3">
        <div className="bg-[var(--color-surface)] p-[18px] shadow-sm">
          <h2 className="text-[14px] font-semibold text-slate-900">
            Tiny island, short distance
          </h2>
          <p className="mt-[6px] text-[14px] text-[var(--color-muted-foreground)]">
            Just an hour from Athens by boat: pine forests, clear water and
            small tavernas.
          </p>
        </div>
        <div className="bg-[var(--color-surface)] p-[18px] shadow-sm">
          <h2 className="text-[14px] font-semibold text-slate-900">
            Curated, not crowded
          </h2>
          <p className="mt-[6px] text-[14px] text-[var(--color-muted-foreground)]">
            A small list of places instead of endless scrolling. Every stay is
            reviewed before it goes live.
          </p>
        </div>
        <div className="bg-[var(--color-surface)] p-[18px] shadow-sm">
          <h2 className="text-[14px] font-semibold text-slate-900">
            Direct contact with owners
          </h2>
          <p className="mt-[6px] text-[14px] text-[var(--color-muted-foreground)]">
            Guests book directly with hosts. No opaque platform fees, no
            middleman.
          </p>
        </div>
      </section>
    </section>
  );
}

