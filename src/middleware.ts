import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(req: NextRequest) {
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
  const isOwnerRoute = path.startsWith('/hosts')
  const isAuthRoute = path.startsWith('/hosts/login') || path.startsWith('/hosts/register')

  if (isOwnerRoute) {
    if (!user && !isAuthRoute) {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/hosts/login'
      redirectUrl.searchParams.set('returnTo', path)

      return NextResponse.redirect(redirectUrl)
    }

    if (user) {
      await supabase.from('profiles').upsert({
        id: user.id,
        email: user.email,
        role: 'host',
      })
    }
  }

  return res
}

export const config = {
  matcher: ['/hosts/:path*'],
}
