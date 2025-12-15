'use client'

import { useMemo, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const authServiceOfflineMessage =
  'Could not reach the authentication service. Please try again in a moment. If this keeps happening, check the Supabase URL/key configuration.'

function formatAuthError(error: unknown) {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
        ? error
        : 'Something went wrong. Please try again.'

  if (message.toLowerCase().includes('failed to fetch')) {
    return authServiceOfflineMessage
  }

  return message
}

export default function OwnerAuthPage() {
  const router = useRouter()

  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
  function safeInternalPath(p?: string | null) {
    if (!p) return '/hosts/properties'
    if (p.startsWith('/') && !p.startsWith('//')) return p
    return '/hosts/properties'
  }

  const returnTo = useMemo(() => safeInternalPath(params?.get('returnTo')), [params])

  const initialMode = useMemo(
    () => (params?.get('mode') === 'register' ? 'register' : 'login'),
    [params]
  )
  const [mode, setMode] = useState<'login' | 'register'>(initialMode)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  async function onLogin(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })

      if (error) {
        setError(formatAuthError(error))
        return
      }

      router.push(returnTo)
      router.refresh()
    } catch (err) {
      setError(formatAuthError(err))
    } finally {
      setLoading(false)
    }
  }

  async function onRegister(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!email || !password) {
      setError('Please enter email and password.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (password !== password2) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)

    try {
      const redirectTo = `${window.location.origin}/hosts/login?mode=login&returnTo=${encodeURIComponent(returnTo)}`

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: redirectTo },
      })

      if (signUpError) {
        setError(formatAuthError(signUpError))
        return
      }

      // Email confirmation enabled -> session is often null
      if (!data.session) {
        setSuccess('Account created! Please check your email to confirm your account.')
        return
      }

      router.push(returnTo)
      router.refresh()
    } catch (err) {
      setError(formatAuthError(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-[var(--bg-base)] md:pl-[55px]">
      {/* Wrapper: mobile = column, desktop = row */}
      <div className="flex min-h-screen w-full flex-col md:flex-row">
        {/* HERO / IMAGE */}
        <div className="relative w-full md:w-[70%]">
          {/* Mobile: Bild als Hero oben */}
          <div className="relative h-[38vh] min-h-[260px] w-full md:hidden">
            <Image
              src="/assets/images/login/AdobeStock_300660678.jpeg"
              alt="Agistri street view"
              fill
              sizes="100vw"
              className="object-cover object-[77%_50%]"
              priority
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-[var(--bg-base)]" />
          </div>

          {/* Desktop: großes Bild links */}
          <div className="relative hidden h-full w-full md:block">
            <Image
              src="/assets/images/login/AdobeStock_300660678.jpeg"
              alt="Agistri street view"
              width={2400}
              height={1600}
              sizes="(min-width: 768px) 70vw, 100vw"
              className="h-full w-full object-cover object-[77%_50%]"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10" />
          </div>
        </div>

        {/* FORM COLUMN */}
        <div className="z-[100] flex w-full items-start justify-center px-4 pb-10 md:w-[30%] md:items-center md:px-0 md:py-0">
          {/* Auf Mobile wird die Card leicht in den Hero „reingeschoben“ */}
          <div className="-mt-12 w-full max-w-md md:mt-0">
            <div className="flex flex-col items-center gap-2 px-2 md:px-6">
              {/* Mobile: Title im Content (Hero hat schon Agistrea) */}
              <h1 className="text-xl font-semibold md:mt-0">
                {mode === 'login' ? 'Host Login' : 'Create an account'}
              </h1>

              <div className="text-sm text-[var(--color-muted-ink)]">
                {mode === 'login' ? (
                  <>
                    New to Agistrea?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setMode('register')
                        setError(null)
                        setSuccess(null)
                      }}
                      className="cursor-pointer text-[var(--text-accent)] hover:text-[var(--text-accent-hover)]"
                    >
                      Create an account
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setMode('login')
                        setError(null)
                        setSuccess(null)
                      }}
                      className="cursor-pointer text-[var(--text-accent)] hover:text-[var(--text-accent-hover)]"
                    >
                      Login
                    </button>
                  </>
                )}
              </div>

              <form
                onSubmit={mode === 'login' ? onLogin : onRegister}
                className="mt-2 w-full rounded-2xl bg-white px-5 py-6 shadow-[var(--shadow-soft)] md:px-8"
              >
                <div className="flex flex-col gap-3">
                  <label className="grid gap-1">
                    <span className="text-xs text-[var(--color-muted-ink)]">Email</span>
                    <input
                      type="email"
                      placeholder="you@email.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      autoComplete="email"
                      className="w-full rounded-md border border-[var(--border-light)] bg-[var(--bg-base)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--ring)]"
                    />
                  </label>

                  <label className="grid gap-1">
                    <span className="text-xs text-[var(--color-muted-ink)]">Password</span>
                    <input
                      type="password"
                      placeholder={mode === 'login' ? 'Password' : 'Min. 8 characters'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                      className="w-full rounded-md border border-[var(--border-light)] bg-[var(--bg-base)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--ring)]"
                    />
                  </label>

                  {mode === 'register' && (
                    <label className="grid gap-1">
                      <span className="text-xs text-[var(--color-muted-ink)]">Repeat password</span>
                      <input
                        type="password"
                        placeholder="Repeat password"
                        value={password2}
                        onChange={e => setPassword2(e.target.value)}
                        autoComplete="new-password"
                        className="w-full rounded-md border border-[var(--border-light)] bg-[var(--bg-base)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--ring)]"
                      />
                    </label>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-1 w-full rounded-md bg-[var(--btn-primary-bg)] px-4 py-2.5 text-sm text-[var(--btn-primary-text)] transition hover:bg-[var(--btn-primary-hover-bg)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? '…' : mode === 'login' ? 'Login' : 'Create account'}
                  </button>

                  {error && (
                    <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
                  )}
                  {success && (
                    <p className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-800">
                      {success}
                    </p>
                  )}

                  {mode === 'register' && (
                    <p className="pt-1 text-xs text-[var(--color-muted-ink)]">
                      By creating an account you agree to manage listings responsibly.
                    </p>
                  )}
                </div>
              </form>

              {/* Optional: kleine “safe area” für iPhones */}
              <div className="h-[max(env(safe-area-inset-bottom),16px)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
