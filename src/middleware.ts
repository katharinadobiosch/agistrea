import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(req: NextRequest) {
  // wichtig: res ist das Response-Objekt, auf dem Supabase Cookies setzt
  const res = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: name => req.cookies.get(name)?.value,
        set: (name, value, options) => {
          res.cookies.set({ name, value, ...options })
        },
        remove: (name, options) => {
          res.cookies.set({ name, value: '', ...options, maxAge: 0 })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const path = req.nextUrl.pathname
  const isOwnerRoute = path.startsWith('/owners')
  const isAuthRoute = path.startsWith('/owners/login') || path.startsWith('/owners/register')

  if (isOwnerRoute) {
    // 🔒 Schutz: nicht eingeloggt -> redirect zu /owners/login
    if (!user && !isAuthRoute) {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/owners/login'
      // optional: returnTo mitgeben
      redirectUrl.searchParams.set('returnTo', path)

      return NextResponse.redirect(redirectUrl)
    }

    // ✅ Profil sicherstellen (nur wenn eingeloggt)
    if (user) {
      await supabase.from('profiles').upsert({
        id: user.id,
        email: user.email,
        role: 'host',
      })
    }
  }

  // wichtig: immer res zurückgeben, damit cookie changes erhalten bleiben
  return res
}

export const config = {
  matcher: ['/owners/:path*'],
}
