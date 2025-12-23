import Hero from '@/components/layout/Hero'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import ComingSoonFullScreen from '@/components/ComingSoonFullScreen'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const isProd = process.env.NEXT_PUBLIC_AGISTREA_ENV === 'production'
  if (isProd) return <ComingSoonFullScreen />

  return (
    <div id="site-wrapper">
      <Hero />
      <Header />

      <main id="wrapper" className="relative max-w-[100vw]">
        {children}
      </main>

      <Footer />
    </div>
  )
}
