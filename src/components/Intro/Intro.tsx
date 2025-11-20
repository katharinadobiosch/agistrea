import Link from "next/link";

export default function Intro() {
  return (
    <section className="intro pt-[95vh]">
      <section className="space-y-[1.2rem]">
        <p className="text-[1.1rem] font-semibold uppercase tracking-[0.25em] text-sky-700">
          Agistri, Greece
        </p>
        <h1 className="text-[2.4rem] font-semibold leading-tight text-slate-900 sm:text-[3.2rem]">
          Handpicked stays on a small pine-covered island.
        </h1>
        <p className="max-w-[52rem] text-[1.4rem] leading-relaxed text-[var(--color-muted-foreground)]">
          Agistrea is a small, curated directory of apartments and rooms on
          Agistri – from Skala and Megalochori to quiet corners near the pine
          forests and rocky coves. No mass tourism, just places we’d stay in
          ourselves.
        </p>

        <div className="mt-[0.8rem] flex flex-wrap gap-[0.8rem]">
          <Link
            href="/listings"
            className="rounded-full bg-[var(--color-accent)] px-[1.8rem] py-[0.9rem] text-[1.3rem] font-medium text-white shadow-sm hover:bg-sky-600"
          >
            Browse stays
          </Link>
          <Link
            href="/owners/register"
            className="rounded-full border border-[var(--color-accent)] px-[1.8rem] py-[0.9rem] text-[1.3rem] font-medium text-[var(--color-accent)] hover:bg-[var(--color-accent-soft)]"
          >
            List your place
          </Link>
        </div>
      </section>

      {/* Drei kleine Cards */}
      <section className="grid gap-[2.4rem] sm:grid-cols-3">
        <div className="rounded-2xl bg-[var(--color-surface)] p-[1.8rem] shadow-sm">
          <h2 className="text-[1.4rem] font-semibold text-slate-900">
            Tiny island, short distance
          </h2>
          <p className="mt-[0.6rem] text-[1.3rem] text-[var(--color-muted-foreground)]">
            Just an hour from Athens by boat: pine forests, clear water and
            small tavernas.
          </p>
        </div>
        <div className="rounded-2xl bg-[var(--color-surface)] p-[1.8rem] shadow-sm">
          <h2 className="text-[1.4rem] font-semibold text-slate-900">
            Curated, not crowded
          </h2>
          <p className="mt-[0.6rem] text-[1.3rem] text-[var(--color-muted-foreground)]">
            A small list of places instead of endless scrolling. Every stay is
            reviewed before it goes live.
          </p>
        </div>
        <div className="rounded-2xl bg-[var(--color-surface)] p-[1.8rem] shadow-sm">
          <h2 className="text-[1.4rem] font-semibold text-slate-900">
            Direct contact with owners
          </h2>
          <p className="mt-[0.6rem] text-[1.3rem] text-[var(--color-muted-foreground)]">
            Guests book directly with hosts. No opaque platform fees, no
            middleman.
          </p>
        </div>
      </section>
    </section>
  );
}
