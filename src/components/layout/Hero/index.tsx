// src/components/layout/Hero.tsx
"use client";

import Image from "next/image";

export default function Hero() {
  return (
    // auf Mobile: Höhe = viewport - Header (~64px), ab lg = volle Höhe
    <section className="absolute top-0 h-full w-full z-0 max-w-[1600px] z-[-10]">
      <Image
        src="/assets/images/Homepage/hero-agistri-2.jpeg"
        alt="A view of the sea and small Greek houses surrounded by pine trees on Agistri island."
        fill
        priority
        className="object-cover"
      />
    </section>
  );
}
