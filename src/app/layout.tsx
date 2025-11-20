import "./globals.css";
import { playfair } from "./fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SideNav } from "@/components/layout/SideNav";
import Hero from "@/components/layout/Hero";

export const metadata: Metadata = {
  title: "Agistrea – handpicked places on a tiny Greek island",
  description:
    "Curated apartments and rooms on Agistri, Greece. No mass tourism – just small, quiet places to stay.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          integrity="sha512-..."
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={`${playfair.variable} bg-white`}>
        <div className="site-wrapper mx-auto max-w-[1600px] max-h-[100vh]">
          <Hero />
          <Header />
          <SideNav />
          <main id="wrapper">{children}</main>
        </div>
      </body>
    </html>
  );
}
