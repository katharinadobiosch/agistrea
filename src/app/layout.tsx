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

      <body className={`${playfair.variable} min-h-screen`}>
        <div className="w-full max-w-[1600px]  relative">
          {/* Platz für die Sidebar ab lg: 56px (w-14) */}

          <div className="w-full max-w-[1600px] min-h-screen flex">
            {/* Sidebar ist Teil der 1600px-Breite */}
            <SideNav />

            {/* Main area (Header + Hero + Content + Footer) */}
            <div className="flex-1 flex flex-col">
              <Header />
              <main className="page-shell">{children}</main>
              <Footer />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
