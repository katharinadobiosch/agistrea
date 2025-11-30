import Link from 'next/link'
import Image from 'next/image'

export default function Intro() {
  return (
    <section className="intro bg-background/90 pt-[97vh] pb-8 md:pt-0">
      <section className="space-y-3">
        <p className="text-[14px] font-semibold tracking-[2.5px] text-sky-700 uppercase">
          Agistri, Greece
        </p>
        <h1 className="text-[32px] leading-tight font-semibold text-slate-900 sm:text-[32px]">
          Handpicked stays on a small pine-covered island.
        </h1>
        <p className="ext-muted-foreground max-w-full text-[14px] leading-relaxed">
          Agistrea is a small, curated directory of apartments and rooms on Agistri. The selection
          ranges from Skala and Megalochori to quiet corners close to the pine forests and the
          island’s clear bays. No mass tourism, just places we would genuinely choose for ourselves.
        </p>
      </section>

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

      {/* <div className="mt-2 flex flex-col gap-2">
        <Link href="/listings" className="text-accent text-[16px] font-medium">
          Browse stays
          <i className="fa-solid fa-arrow-right pl-2" />
        </Link>
      </div> */}

      {/* Drei kleine Cards */}
      <section className="grid gap-8 pt-6 pb-6 sm:grid-cols-3">
        <div className="bg-color-surface">
          <h2 className="text-[14px] font-semibold text-slate-900">Tiny island, short distance</h2>
          <p className="text-muted-foreground mt-1.5 text-[14px]">
            Only an hour from Athens by boat: pine forests, clear water and small tavernas.
          </p>
        </div>
        <div className="bg-color-surface">
          <h2 className="text-[14px] font-semibold text-slate-900">Curated, not crowded</h2>
          <p className="text-muted-foreground mt-1.5 text-[14px]">
            A small list of places instead of endless scrolling. Every stay is checked carefully
            before it goes live.
          </p>
        </div>
        <div className="bg-color-surface">
          <h2 className="text-[14px] font-semibold text-slate-900">Direct contact with owners</h2>
          <p className="text-muted-foreground mt-1.5 text-[14px]">
            Guests book directly with hosts. No opaque platform fees, no middlemen.
          </p>
        </div>
      </section>

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
    </section>
  )
}
