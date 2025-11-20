import Image from "next/image";

export default function Hero() {
  return (
    <Image
      src="/assets/images/Homepage/hero-agistri-2.jpeg"
      alt="A view of the sea and small Greek houses surrounded by pine trees on Agistri island."
      className="absolute top-0 left-0 w-full h-full object-cover z-0"
      height={1000}
      width={1600}
    />
  );
}
