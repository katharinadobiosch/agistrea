'use client'

import { useMemo, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function OwnerAuthPage() {
  const router = useRouter()

  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
  const returnTo = useMemo(() => params?.get('returnTo') ?? '/hosts/properties', [params])

  const [mode, setMode] = useState<'login' | 'register'>('login')

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

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }

    router.push(returnTo)
    router.refresh()
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

    const redirectTo = `${window.location.origin}/hosts/login?returnTo=${encodeURIComponent(
      returnTo
    )}`

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: redirectTo },
    })

    setLoading(false)

    if (signUpError) {
      setError(signUpError.message)
      return
    }

    // Email confirmation enabled -> session is often null
    if (!data.session) {
      setSuccess('Account created! Please check your email to confirm your account.')
      return
    }

    router.push(returnTo)
    router.refresh()
  }

  return (
    <div className="flex h-screen w-full md:pl-[55px]">
      <div className="hidden w-1/2 md:block">
        <Image
          src="/assets/images/login/AdobeStock_300660678.jpeg"
          alt="Agistri street view"
          width={2400}
          height={1600}
          sizes="50vw"
          className="h-full w-full object-cover object-[77%_50%]"
          priority
        />
      </div>

      <div className="flex w-full items-center justify-center md:w-1/2">
        <div className="flex w-full max-w-md flex-col items-center gap-2 px-6">
          <h1 className="text-xl font-semibold">
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
            className="mt-2 flex w-full flex-col gap-3 rounded-xl bg-white px-8 py-6 shadow-[var(--shadow-soft)]"
          >
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
              className="mt-1 w-full rounded-md bg-[var(--btn-primary-bg)] px-4 py-2 text-sm text-[var(--btn-primary-text)] transition hover:bg-[var(--btn-primary-hover-bg)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? '…' : mode === 'login' ? 'Login' : 'Create account'}
            </button>

            {error && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
            )}
            {success && (
              <p className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-800">{success}</p>
            )}

            {mode === 'register' && (
              <p className="pt-1 text-xs text-[var(--color-muted-ink)]">
                By creating an account you agree to manage listings responsibly.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
