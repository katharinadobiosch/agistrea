'use client'

import Image from 'next/image'

export default function Hero() {
  return (
    <section className="hero absolute inset-0 mx-auto h-screen w-full max-w-[100vw] md:h-full">
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
