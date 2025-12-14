// src/app/layout.tsx
import './globals.css'
import { playfair } from './fonts'

export const metadata = {
  title: 'Agistrea',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "2c56b7c7f3c54e73848abcf385da94d0"}'
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          integrity="sha512-..."
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={`${playfair.variable} min-h-screen bg-white`}>{children}</body>
    </html>
  )
}
