import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export const config = {
  matcher: ['/hosts/:path*', '/host/:path*'],
}

export default async function proxy(req: NextRequest) {
  const res = NextResponse.next()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If env is missing, skip auth gate but keep request flowing
  if (!supabaseUrl || !supabaseAnonKey) {
    return res
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get: name => req.cookies.get(name)?.value,
      set: (name, value, options) => {
        res.cookies.set({ name, value, ...options })
      },
      remove: (name, options) => {
        res.cookies.set({ name, value: '', ...options, maxAge: 0 })
      },
    },
  })

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  const path = req.nextUrl.pathname
  const isHostsRoute = path.startsWith('/hosts')
  const isHostRoute = path.startsWith('/host')
  const isOwnerRoute = isHostsRoute || isHostRoute
  const isAuthRoute =
    path.startsWith('/hosts/login') ||
    path.startsWith('/hosts/register') ||
    path.startsWith('/host/login') ||
    path.startsWith('/host/register')

  if (isOwnerRoute) {
    if (!user && !isAuthRoute) {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = isHostRoute ? '/host/login' : '/hosts/login'
      redirectUrl.searchParams.set('returnTo', path)

      return NextResponse.redirect(redirectUrl)
    }
  }

  if (userError) {
    console.error('Proxy auth error', userError)
  }

  return res
}
