import Link from 'next/link'
import { createSupabaseServer } from '@/lib/supabase/server'
import { createPropertyAction } from '../../actions'

export default async function OwnerdashboardPage() {
  const supabase = await createSupabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: properties, error } = await supabase
    .from('properties')
    .select('*')
    .eq('host_id', user.id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-soft-white)] via-[var(--color-soft-white)] to-[color-mix(in_srgb,var(--color-sand)_15%,var(--color-soft-white))]">
      {/* Top Navigation Bar - horizontal statt Sidebar */}
      <nav className="border-b border-[var(--border-light)] bg-[var(--color-white)]/70 backdrop-blur-md">
        <div className="mx-auto max-w-[1200px] px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="font-serif text-xl text-[var(--color-ink-strong)]">
                Agistrea
              </Link>
              <div className="flex items-center gap-1 rounded-full bg-[color-mix(in_srgb,var(--color-sand)_25%,transparent)] p-1">
                <Link
                  href="/host/dashboard"
                  className="rounded-full bg-[var(--color-white)] px-4 py-1.5 text-sm font-medium text-[var(--color-ink-strong)] shadow-sm"
                >
                  Dashboard
                </Link>
                <Link
                  href="/host/listings"
                  className="rounded-full px-4 py-1.5 text-sm text-[var(--color-muted-ink)] transition hover:text-[var(--color-ink)]"
                >
                  Listings
                </Link>
                <Link
                  href="/host/create"
                  className="rounded-full px-4 py-1.5 text-sm text-[var(--color-muted-ink)] transition hover:text-[var(--color-ink)]"
                >
                  Create
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/help"
                className="text-sm text-[var(--color-muted-ink)] transition hover:text-[var(--color-sea)]"
              >
                Help
              </Link>
              <button className="text-sm text-[var(--color-muted-ink)] transition hover:text-[var(--color-ink)]">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="mx-auto max-w-[1200px] px-6 py-12">
        {/* Hero Header mit mediterranem Touch */}
        <div className="relative mb-12">
          {/* Decorative element - subtle terracotta arc */}
          <div className="absolute top-0 -left-12 h-32 w-32 rounded-full bg-[var(--color-terracotta)] opacity-[0.04] blur-3xl" />
          <div className="absolute top-8 -right-8 h-24 w-24 rounded-full bg-[var(--color-sea)] opacity-[0.05] blur-2xl" />

          <div className="relative flex items-end justify-between gap-8">
            <div className="max-w-[600px]">
              <div className="mb-2 flex items-center gap-2">
                <div className="h-px w-12 bg-[var(--color-terracotta)] opacity-40" />
                <span className="text-xs tracking-wider text-[var(--color-terracotta)] uppercase opacity-60">
                  Your hosting space
                </span>
              </div>
              <h1 className="font-serif text-5xl leading-tight text-[var(--color-ink-strong)]">
                Welcome back
              </h1>
              <p className="mt-3 text-lg leading-relaxed text-[var(--color-muted-ink)]">
                A calm space to manage your stays on Agistri. Take your time,
                <br />
                everything has its season.
              </p>
            </div>

            <form action={createPropertyAction}>
              <button
                type="submit"
                className="group relative overflow-hidden rounded-2xl bg-[var(--color-terracotta)] px-8 py-4 font-medium text-[var(--color-soft-white)] shadow-[0_8px_24px_rgba(185,122,90,0.22)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_32px_rgba(185,122,90,0.28)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg
                    className="h-5 w-5 transition-transform group-hover:rotate-90"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Add a new stay
                </span>
                <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
              </button>
            </form>
          </div>
        </div>

        {/* Quick Stats - optional, gibt Kontext */}
        <div className="mb-10 grid grid-cols-3 gap-6">
          <div className="group relative overflow-hidden rounded-3xl border border-[color-mix(in_srgb,var(--color-olive)_18%,transparent)] bg-gradient-to-br from-white/80 to-white/40 p-6 backdrop-blur-sm transition-all hover:shadow-[0_8px_32px_rgba(110,119,94,0.08)]">
            <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-[var(--color-olive)] opacity-[0.03] blur-2xl transition-opacity group-hover:opacity-[0.06]" />
            <div className="relative">
              <div className="mb-1 text-sm text-[var(--color-muted-ink)]">Active stays</div>
              <div className="font-serif text-3xl text-[var(--color-ink-strong)]">
                {properties?.filter(p => p.status === 'published').length ?? 0}
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-3xl border border-[color-mix(in_srgb,var(--color-sea)_18%,transparent)] bg-gradient-to-br from-white/80 to-white/40 p-6 backdrop-blur-sm transition-all hover:shadow-[0_8px_32px_rgba(122,144,168,0.08)]">
            <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-[var(--color-sea)] opacity-[0.03] blur-2xl transition-opacity group-hover:opacity-[0.06]" />
            <div className="relative">
              <div className="mb-1 text-sm text-[var(--color-muted-ink)]">In progress</div>
              <div className="font-serif text-3xl text-[var(--color-ink-strong)]">
                {properties?.filter(p => p.status === 'draft').length ?? 0}
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-3xl border border-[color-mix(in_srgb,var(--color-terracotta)_18%,transparent)] bg-gradient-to-br from-white/80 to-white/40 p-6 backdrop-blur-sm transition-all hover:shadow-[0_8px_32px_rgba(185,122,90,0.08)]">
            <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-[var(--color-terracotta)] opacity-[0.03] blur-2xl transition-opacity group-hover:opacity-[0.06]" />
            <div className="relative">
              <div className="mb-1 text-sm text-[var(--color-muted-ink)]">Total properties</div>
              <div className="font-serif text-3xl text-[var(--color-ink-strong)]">
                {properties?.length ?? 0}
              </div>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="mb-6 flex items-center gap-3">
          <h2 className="font-serif text-2xl text-[var(--color-ink-strong)]">Your properties</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-[var(--border-light)] to-transparent" />
        </div>

        {/* Properties Grid - nicht Liste, Grid für mehr visuelles Interesse */}
        {error && (
          <pre className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs text-red-600">
            {JSON.stringify(error, null, 2)}
          </pre>
        )}

        {!properties || properties.length === 0 ? (
          <div className="flex min-h-[400px] items-center justify-center rounded-3xl border-2 border-dashed border-[var(--border-light)] bg-white/40">
            <div className="max-w-md text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--color-sand)_30%,transparent)]">
                <svg
                  className="h-8 w-8 text-[var(--color-olive)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <h3 className="mb-2 font-serif text-xl text-[var(--color-ink-strong)]">
                No stays yet
              </h3>
              <p className="text-[var(--color-muted-ink)]">
                Start by adding your first property to Agistrea.
                <br />
                Take it slow, one step at a time.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {properties.map(p => {
              // Status Styling
              const statusConfig = {
                draft: {
                  emoji: '🌱',
                  label: 'Growing',
                  bg: 'bg-[color-mix(in_srgb,var(--color-olive)_12%,transparent)]',
                  border: 'border-[color-mix(in_srgb,var(--color-olive)_20%,transparent)]',
                  text: 'text-[var(--color-olive)]',
                },
                published: {
                  emoji: '☀️',
                  label: 'Live',
                  bg: 'bg-[color-mix(in_srgb,var(--color-terracotta)_12%,transparent)]',
                  border: 'border-[color-mix(in_srgb,var(--color-terracotta)_20%,transparent)]',
                  text: 'text-[var(--color-terracotta)]',
                },
                pending: {
                  emoji: '🌊',
                  label: 'In review',
                  bg: 'bg-[color-mix(in_srgb,var(--color-sea)_12%,transparent)]',
                  border: 'border-[color-mix(in_srgb,var(--color-sea)_20%,transparent)]',
                  text: 'text-[var(--color-sea)]',
                },
              }

              const status =
                statusConfig[p.status as keyof typeof statusConfig] || statusConfig.draft

              return (
                <Link
                  key={p.id}
                  href={`/host/properties/${p.id}/edit`}
                  className="group relative overflow-hidden rounded-3xl border border-[var(--border-light)] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_48px_rgba(0,0,0,0.08)]"
                >
                  {/* Image Area - Placeholder if no image */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[color-mix(in_srgb,var(--color-sand)_30%,transparent)] via-[color-mix(in_srgb,var(--color-sea)_8%,transparent)] to-[color-mix(in_srgb,var(--color-olive)_12%,transparent)]">
                    {p.image_url ? (
                      <img
                        src={p.image_url}
                        alt={p.title || 'Property'}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <svg
                          className="h-16 w-16 text-[var(--color-muted-ink)] opacity-20"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}

                    {/* Status Badge */}
                    <div
                      className={`absolute top-3 right-3 flex items-center gap-1.5 rounded-full border ${status.border} ${status.bg} px-3 py-1.5 backdrop-blur-sm`}
                    >
                      <span className="text-sm">{status.emoji}</span>
                      <span className={`text-xs font-medium ${status.text}`}>{status.label}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="mb-2 font-serif text-xl leading-snug text-[var(--color-ink-strong)] transition-colors group-hover:text-[var(--color-terracotta)]">
                      {p.title || 'Untitled stay'}
                    </h3>

                    <div className="mb-3 flex items-center gap-2 text-sm text-[var(--color-muted-ink)]">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>Agistri · {p.location || 'Location not set'}</span>
                    </div>

                    <div className="mb-4 font-mono text-xs text-[var(--color-muted-ink)] opacity-50">
                      /stays/{p.slug}
                    </div>

                    {/* Action */}
                    <div className="flex items-center gap-2 text-sm font-medium text-[var(--color-sea)] transition-colors group-hover:text-[var(--text-accent-hover)]">
                      <span>Continue editing</span>
                      <svg
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Hover gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-terracotta)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-[0.02]" />
                </Link>
              )
            })}
          </div>
        )}

        {/* Bottom spacing */}
        <div className="h-20" />
      </div>
    </div>
  )
}
