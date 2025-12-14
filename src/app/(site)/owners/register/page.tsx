'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

export default function OwnerRegisterPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
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

    const params = new URLSearchParams(window.location.search)
    const returnTo = params.get('returnTo') ?? '/owners/properties'

    // WICHTIG: redirectTo nur setzen, wenn du Email Confirmation nutzt
    // (sonst kann es trotzdem drin bleiben – schadet nicht)
    const redirectTo = `${window.location.origin}/owners/login?returnTo=${encodeURIComponent(
      returnTo
    )}`

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectTo,
      },
    })

    if (signUpError) {
      setLoading(false)
      setError(signUpError.message)
      return
    }

    // Wenn Email Confirmation aktiv ist, ist session oft null
    if (!data.session) {
      setLoading(false)
      setSuccess('Account created! Please check your email to confirm your account.')
      return
    }

    setLoading(false)
    router.push(returnTo)
    router.refresh()
  }

  return (
    <div className="flex h-screen w-full md:pl-[55px]">
      {/* LEFT IMAGE */}
      <div className="hidden w-1/2 md:block">
        <Image
          src="/assets/images/login/AdobeStock_300653332_Preview.jpeg"
          alt="Agistri street view"
          width={2400}
          height={1600}
          sizes="50vw"
          className="h-full w-full object-cover object-[60%_50%]"
          priority
        />
      </div>

      {/* RIGHT */}
      <div className="flex w-full items-center justify-center md:w-1/2">
        <div className="flex w-full max-w-md flex-col items-center gap-2 px-6">
          <h1 className="text-xl font-semibold">Create an account</h1>

          <div className="text-sm text-[var(--color-muted-ink)]">
            Already have an account?{' '}
            <Link
              href="/owners/login"
              className="text-[var(--text-accent)] hover:text-[var(--text-accent-hover)]"
            >
              Login
            </Link>
          </div>

          <form
            onSubmit={onSubmit}
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
                placeholder="Min. 8 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="new-password"
                className="w-full rounded-md border border-[var(--border-light)] bg-[var(--bg-base)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--ring)]"
              />
            </label>

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

            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full rounded-md bg-[var(--btn-primary-bg)] px-4 py-2 text-sm text-[var(--btn-primary-text)] transition hover:bg-[var(--btn-primary-hover-bg)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? '…' : 'Create account'}
            </button>

            {error && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
            )}
            {success && (
              <p className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-800">{success}</p>
            )}

            <p className="pt-1 text-xs text-[var(--color-muted-ink)]">
              By creating an account you agree to manage listings responsibly.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
