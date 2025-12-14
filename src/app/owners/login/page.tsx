'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

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

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setLoading(false)
      setError(error.message)
      return
    }

    await supabase.from('profiles').upsert({
      id: data.user.id,
      email: data.user.email,
      role: 'host',
    })

    setLoading(false)
    router.push('/owners/properties')
    router.refresh()
  }

  return (
    <div className="space-y-4 px-[15px] pt-6 pb-6 md:pt-8 md:pl-[85px]">
      <h1 className="text-xl font-semibold">Owner Login</h1>

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
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-black px-4 py-2 text-sm text-white transition disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? '…' : 'Login'}
        </button>

        {error && <p className="text-sm text-red-600">{error}</p>}
      </form>
    </div>
  )
}
