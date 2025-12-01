import Link from 'next/link'
import Image from 'next/image'

export default function Intro() {
  return (
    <section className="intro pt-[100vh] pb-8 md:pt-0">
      {/* Text-Block */}
      <section className="space-y-3 pt-8 pb-8">
        <p className="text-[12px] font-semibold tracking-[2.5px] text-[var(--color-olive)] uppercase md:text-[13px]">
          Agistri, Greece
        </p>

        <h1 className="text-foreground text-[32px] leading-tight font-semibold sm:text-[32px]">
          Handpicked stays on a small pine-covered island.
        </h1>

        <p className="text-muted-foreground max-w-full text-[14px] leading-relaxed">
          Agistrea is a small, curated directory of apartments and rooms on Agistri. The selection
          ranges from Skala and Megalochori to quiet corners close to the pine forests and the
          island’s clear bays. No mass tourism, just places we would genuinely choose for ourselves.
        </p>
      </section>

      {/* Bild über volle Breite */}
      <div className="relative right-1/2 left-1/2 -mr-[50vw] -ml-[50vw] w-screen">
        <Image
          src="/assets/images/Homepage/intro.jpeg"
          alt="Agistri"
          width={1920}
          height={1080}
          className="h-auto w-screen object-cover"
          priority
        />
      </div>

      {/* Optionaler Link – kannst du später wieder aktivieren */}
      {/* <div className="mt-2 flex flex-col gap-2">
        <Link href="/listings" className="text-[16px] font-medium text-[var(--color-sea)] hover:text-[var(--text-accent-hover)]">
          Browse stays
          <i className="fa-solid fa-arrow-right pl-2" />
        </Link>
      </div> */}

      {/* Drei kleine Cards */}
      <section className="grid gap-8 pt-6 pb-6 sm:grid-cols-3">
        <div className="border-border bg-card rounded-lg border p-3">
          <h2 className="text-foreground text-[14px] font-semibold">Tiny island, short distance</h2>
          <p className="text-muted-foreground mt-1.5 text-[14px] leading-relaxed">
            Only an hour from Athens by boat: pine forests, clear water and small tavernas.
          </p>
        </div>

        <div className="border-border bg-card rounded-lg border p-3">
          <h2 className="text-foreground text-[14px] font-semibold">Curated, not crowded</h2>
          <p className="text-muted-foreground mt-1.5 text-[14px] leading-relaxed">
            A small list of places instead of endless scrolling. Every stay is checked carefully
            before it goes live.
          </p>
        </div>

        <div className="border-border bg-card rounded-lg border p-3">
          <h2 className="text-foreground text-[14px] font-semibold">Direct contact with owners</h2>
          <p className="text-muted-foreground mt-1.5 text-[14px] leading-relaxed">
            Guests book directly with hosts. No opaque platform fees, no middlemen.
          </p>
        </div>
      </section>
    </section>
  )
}
