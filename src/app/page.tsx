import Intro from "@/components/Intro/Intro";
import { SideNav } from "@/components/layout/SideNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agistrea – handpicked places on a tiny Greek island",
  description:
    "Curated apartments and rooms on Agistri, Greece. No mass tourism – just small, quiet places to stay.",
};

export default function Home() {
  return (
    <>
      <SideNav />
      <div className="home pl-[24px] pr-[24px] pt-[100vh] lg:pl-[130px] pr-[50px]">
        <Intro />
        <div>HELLO WORLD</div>
        <div>HELLO WORLD</div> <div>HELLO WORLD</div> <div>HELLO WORLD</div>{" "}
        <div>HELLO WORLD</div> <div>HELLO WORLD</div> <div>HELLO WORLD</div>{" "}
        <div>HELLO WORLD</div> <div>HELLO WORLD</div> <div>HELLO WORLD</div>{" "}
        <div>HELLO WORLD</div> <div>HELLO WORLD</div> <div>HELLO WORLD</div>{" "}
        <div>HELLO WORLD</div> <div>HELLO WORLD</div> <div>HELLO WORLD</div>{" "}
        <div>HELLO WORLD</div> <div>HELLO WORLD</div> <div>HELLO WORLD</div>{" "}
        <div>HELLO WORLD</div> <div>HELLO WORLD</div> <div>HELLO WORLD</div>
      </div>
    </>
  );
}
