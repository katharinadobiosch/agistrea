import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Hero from "@/components/layout/Hero";
import { playfair } from "./fonts";

// export const metadata: Metadata = {
//   title: "Agistrea – handpicked places on a tiny Greek island",
//   description:
//     "Curated apartments and rooms on Agistri, Greece. No mass tourism – just small, quiet places to stay.",
// };

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

      <body className={`${playfair.variable} bg-white min-h-screen`}>
        <div id="site-wrapper">
          <Hero />
          <Header />
          <main id="wrapper" className="relative max-w-[1600px]">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
