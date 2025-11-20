import "./globals.css";
import { playfair } from "./fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SideNav } from "@/components/layout/SideNav";

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

      {/* <body className={`${playfair.variable} min-h-screen`}>
        <div className="w-full max-w-[1600px]  relative">

          <div className="w-full max-w-[1600px] min-h-screen flex">
            <SideNav />

            <div className="flex-1 flex flex-col">
              <Header />
              <main>{children}</main>
              <Footer />
            </div>
          </div>
        </div>
      </body> */}

      <body className="min-h-screen">
        {/* Sidebar wird ganz außen gehalten */}
        <div className="min-h-screen lg:pl-14 relative">
          <SideNav />

          {/* Hero MUSS außerhalb der max-w Box sein */}
          <Header />

          {/* FULLWIDTH HERO bleibt hier */}
          {children /* Hier kommt Home rein → Hero + Intro */}
        </div>
        <Footer />
      </body>
    </html>
  );
}
