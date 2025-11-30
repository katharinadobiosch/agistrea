// src/components/layout/Hero.tsx
'use client'

import Image from 'next/image'

// src/components/layout/Hero/index.tsx
export default function Hero() {
  return (
    <section className="hero absolute top-0 z-[-100] h-full w-full max-w-[1600px]">
      <Image
        src="/assets/images/Homepage/hero-agistri-2.jpeg"
        alt="A view of the sea and small Greek houses surrounded by pine trees on Agistri island."
        fill
        priority
        className="object-cover"
      />
    </section>
  )
}
