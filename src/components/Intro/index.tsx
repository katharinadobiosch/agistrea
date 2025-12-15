import Link from 'next/link'
import Image from 'next/image'

export default function Intro() {
  return (
    <section className="intro pt-[100vh] md:pt-0">
      {/* Text-Block */}
      <section className="intro-text md:pv-8 space-y-3 pt-6 pr-[15px] pb-6 pl-[15px] md:pt-8 md:pl-[85px]">
        <p className="text-[12px] font-semibold tracking-[2.5px] text-(--color-olive) uppercase md:text-[13px]">
          Agistri, Greece
        </p>

        <h1 className="text-foreground text-[32px] leading-tight font-semibold sm:text-[32px]">
          A small pine-covered island with clear water, quiet corners and a very relaxed rhythm.
        </h1>

        <p className="text-muted-foreground max-w-full text-[14px] leading-relaxed">
          Agistri is small and easy. Pine forests, clear bays, short paths and a gentle everyday
          pace. Most stays are local, family-run apartments and rooms close to beaches and tavernas.
          Some are set in quieter spots near the pines. Agistrea brings together a small and curated
          selection of places that are welcoming, well located and run by kind local hosts.
        </p>
      </section>

      {/* Bild über volle Breite */}
      <div className="relative w-screen">
        <Image
          src="/assets/images/Homepage/intro.jpeg"
          alt="Agistri"
          width={1920}
          height={1080}
          className="z-0 h-auto w-screen object-cover"
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
      <section className="highlights grid gap-8 pt-6 pr-[15px] pb-6 pl-[15px] md:pt-8 md:pb-8 md:pl-[85px]">
        <div className="bg-card">
          <h2 className="text-foreground text-[14px] font-semibold">Tiny island, short distance</h2>
          <p className="text-muted-foreground mt-1.5 text-[14px] leading-relaxed">
            Only an hour from Athens by boat: pine forests, clear water and small tavernas.
          </p>
        </div>

        <div className="bg-card">
          <h2 className="text-foreground text-[14px] font-semibold">Curated, not crowded</h2>
          <p className="text-muted-foreground mt-1.5 text-[14px] leading-relaxed">
            A small list of straightforward island rooms instead of endless scrolling. Every stay is
            checked carefully before it goes live.
          </p>
        </div>

        <div className="bg-card">
          <h2 className="text-foreground text-[14px] font-semibold">Direct contact with hosts</h2>
          <p className="text-muted-foreground mt-1.5 text-[14px] leading-relaxed">
            Guests book directly with hosts. No platform fees, no middlemen, just clear, simple
            communication.
          </p>
        </div>
      </section>
    </section>
  )
}
