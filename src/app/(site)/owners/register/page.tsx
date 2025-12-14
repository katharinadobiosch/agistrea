'use client'

import { useState } from 'react'
import Link from 'next/link'
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

    try {
      const { data, error } = await supabase.auth.signUp({ email, password })
      console.log('signup data', data)
      if (error) throw error
    } catch (e) {
      console.error('signup failed', e)
      setError(e instanceof Error ? e.message : 'Signup failed')
    } finally {
      setLoading(false)
    }

    if (error) {
      setLoading(false)
      setError(error.message)
      return
    }

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
    <div className="space-y-4 px-[15px] pt-6 pb-6 md:pt-8 md:pl-[85px]">
      <h1 className="text-xl font-semibold">Create an account</h1>

      <div className="text-sm">
        Already have an account?{' '}
        <Link href="/owners/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </div>

      <form onSubmit={onSubmit} className="grid max-w-sm gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none"
        />

        <input
          type="password"
          placeholder="Password (min. 8 characters)"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none"
        />

        <input
          type="password"
          placeholder="Repeat password"
          value={password2}
          onChange={e => setPassword2(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-black px-4 py-2 text-sm text-white transition disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? '…' : 'Create account'}
        </button>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-green-700">{success}</p>}
      </form>

      <p className="text-muted-foreground max-w-sm text-xs">
        By creating an account you agree to manage listings responsibly. (Text können wir später
        ersetzen.)
      </p>
    </div>
  )
}
