import Hero from "@/components/layout/Hero";
import Intro from "@/components/Intro/Intro";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agistrea – handpicked places on a tiny Greek island",
  description:
    "Curated apartments and rooms on Agistri, Greece. No mass tourism – just small, quiet places to stay.",
};

export default function Home() {
  return (
    <>
      <Hero /> {/* Fullscreen, nicht im Container */}
      {/* max-w Container für Text/Content */}
      <div className="max-w-[1600px] mx-auto px-6 space-y-[2.4rem]">
        <Intro />
      </div>
    </>
  );
}
