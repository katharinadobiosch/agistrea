import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

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

      <body className="min-h-screen">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="page-shell">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
