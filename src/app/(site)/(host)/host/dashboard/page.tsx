import Link from 'next/link'
import { createSupabaseServer } from '@/lib/supabase/server'
import { createPropertyAction } from '../actions'

export default async function OwnerdashboardPage() {
  const supabase = await createSupabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return (
      <div>
        <p>Please log in.</p>
        <Link href="/host/login">Go to login</Link>
      </div>
    )
  }

  const { data: properties, error } = await supabase
    .from('properties')
    .select('*')
    .eq('host_id', user.id)

  return (
    <div>
      <h1>My listings</h1>

      <div className="rounded-2xl border border-black/10 bg-white p-6">
        <h1 className="text-xl font-semibold">My dashboard</h1>
        <p className="mt-2 text-sm text-black/60">Layout ready ✅</p>
      </div>

      <form action={createPropertyAction}>
        <button type="submit">+ New listing</button>
      </form>

      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}

      <ul>
        {(properties ?? []).map(p => (
          <li key={p.id}>
            <Link href={`/host/properties/${p.id}/edit`}>
              {p.title} ({p.status})
            </Link>
            <span>/stays/{p.slug}</span>
            <span className="ml-2 inline-block rounded-full border px-2 py-[2px] text-xs uppercase">
              {p.status ?? 'draft'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
