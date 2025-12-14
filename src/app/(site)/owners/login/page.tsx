'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function OwnerLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setLoading(false)
    const params = new URLSearchParams(window.location.search)
    const returnTo = params.get('returnTo') ?? '/owners/properties'
    router.push(returnTo)
    router.refresh()
  }

  return (
    <div className="login flex h-screen w-full md:pl-[55px]">
      <div className="login__left w-1/2">
        <Image
          src="/assets/images/login/AdobeStock_300660678_Preview.jpeg"
          alt="..."
          width={2400}
          height={1600}
          sizes="100vh"
          className="h-full w-auto object-cover object-[77%_50%]"
        />
      </div>

      <div className="login__right flex w-1/2 items-center">
        <div className="center flex w-full flex-col items-center gap-2">
          <h1 className="text-xl font-semibold">Host Login</h1>

          <div className="text-sm text-[var(--color-muted-ink)]">
            New to Agistrea?{' '}
            <Link
              href="/owners/register"
              className="text-[var(--text-accent)] hover:text-[var(--text-accent-hover)]"
            >
              Create an account
            </Link>
          </div>

          <form
            onSubmit={onSubmit}
            className="mt-2 flex w-[60%] max-w-sm flex-col gap-3 rounded-xl bg-white px-8 py-6 shadow-[var(--shadow-soft)]"
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
              className="w-full rounded-md border border-[var(--border-light)] bg-[var(--bg-base)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--ring)]"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full rounded-md border border-[var(--border-light)] bg-[var(--bg-base)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--ring)]"
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full rounded-md bg-[var(--btn-primary-bg)] px-4 py-2 text-sm text-[var(--btn-primary-text)] transition hover:bg-[var(--btn-primary-hover-bg)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? '…' : 'Login'}
            </button>

            {error && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
