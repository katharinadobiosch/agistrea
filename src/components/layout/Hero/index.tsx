// src/components/layout/Hero/index.tsx
import Image from "next/image";

export default function Hero() {
  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      <Image
        src="/assets/images/Homepage/hero-agistri-2.jpeg"
        alt="A view of the sea and small Greek houses surrounded by pine trees on Agistri island."
        fill // wichtig: statt width/height
        sizes="100vw"
        className="object-cover"
        priority
      />
    </section>
  );
}
