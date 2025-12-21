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
    <>
      {/* Main Content */}
      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 sm:py-12">
        {/* Hero Header - Mobile First */}
        <div className="relative mb-8 sm:mb-12">
          {/* Decorative elements */}
          <div
            className="absolute top-0 -left-8 h-24 w-24 rounded-full blur-3xl sm:-left-12 sm:h-32 sm:w-32"
            style={{ backgroundColor: '#d97346', opacity: 0.08 }}
          />
          <div
            className="absolute top-4 -right-4 h-20 w-20 rounded-full blur-2xl sm:top-8 sm:-right-8 sm:h-24 sm:w-24"
            style={{ backgroundColor: '#93a485', opacity: 0.1 }}
          />

          <div className="relative">
            {/* Top Label */}
            <div className="mb-3 flex items-center gap-2 sm:mb-2">
              <div
                className="h-px w-8 sm:w-12"
                style={{ backgroundColor: '#d97346', opacity: 0.6 }}
              />
              <span
                className="text-xs tracking-wider uppercase"
                style={{ color: '#d97346', opacity: 0.75 }}
              >
                Your hosting space
              </span>
            </div>

            {/* Title + Button Container - Stack on Mobile */}
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
              <div className="max-w-none flex-1 sm:max-w-[600px]">
                <h1
                  className="mb-3 font-serif text-4xl leading-tight sm:text-5xl"
                  style={{ color: '#3a3632' }}
                >
                  Welcome back
                </h1>
                <p className="text-base leading-relaxed sm:text-lg" style={{ color: '#8a8178' }}>
                  A calm space to manage your stays on Agistri. Take your time, everything has its
                  season.
                </p>
              </div>

              {/* Button - Full width on mobile, auto on desktop */}
              <form
                action={async (formData: FormData) => {
                  'use server'
                  await createPropertyAction()
                }}
                className="w-full sm:w-auto"
              >
                <button
                  type="submit"
                  className="add-stay-button group relative w-full overflow-hidden rounded-2xl px-6 py-3.5 font-medium text-white transition-all duration-300 hover:scale-[1.02] sm:w-auto sm:px-8 sm:py-4"
                  style={{
                    background: 'linear-gradient(135deg, #d97346 0%, #c96640 100%)',
                    boxShadow: '0 4px 16px rgba(217, 115, 70, 0.3)',
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
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
                    <span className="text-sm sm:text-base">Add a new stay</span>
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Quick Stats - Responsive Grid */}
        <div className="mb-8 grid grid-cols-3 gap-3 sm:mb-10 sm:gap-6">
          <div
            className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-white/90 to-white/50 p-4 backdrop-blur-sm transition-all hover:shadow-lg sm:rounded-3xl sm:p-6"
            style={{ border: '1px solid rgba(147, 164, 133, 0.25)' }}
          >
            <div
              className="absolute top-0 right-0 h-16 w-16 rounded-full blur-2xl transition-opacity group-hover:opacity-[0.12] sm:h-24 sm:w-24"
              style={{ backgroundColor: '#93a485', opacity: 0.06 }}
            />
            <div className="relative">
              <div className="mb-1 text-xs sm:text-sm" style={{ color: '#8a8178' }}>
                Active stays
              </div>
              <div className="font-serif text-2xl sm:text-3xl" style={{ color: '#93a485' }}>
                {properties?.filter(p => p.status === 'published').length ?? 0}
              </div>
            </div>
          </div>

          <div
            className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-white/90 to-white/50 p-4 backdrop-blur-sm transition-all hover:shadow-lg sm:rounded-3xl sm:p-6"
            style={{ border: '1px solid rgba(244, 165, 125, 0.25)' }}
          >
            <div
              className="absolute top-0 right-0 h-16 w-16 rounded-full blur-2xl transition-opacity group-hover:opacity-[0.12] sm:h-24 sm:w-24"
              style={{ backgroundColor: '#f4a57d', opacity: 0.06 }}
            />
            <div className="relative">
              <div className="mb-1 text-xs sm:text-sm" style={{ color: '#8a8178' }}>
                In progress
              </div>
              <div className="font-serif text-2xl sm:text-3xl" style={{ color: '#f4a57d' }}>
                {properties?.filter(p => p.status === 'draft').length ?? 0}
              </div>
            </div>
          </div>

          <div
            className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-white/90 to-white/50 p-4 backdrop-blur-sm transition-all hover:shadow-lg sm:rounded-3xl sm:p-6"
            style={{ border: '1px solid rgba(217, 115, 70, 0.25)' }}
          >
            <div
              className="absolute top-0 right-0 h-16 w-16 rounded-full blur-2xl transition-opacity group-hover:opacity-[0.12] sm:h-24 sm:w-24"
              style={{ backgroundColor: '#d97346', opacity: 0.06 }}
            />
            <div className="relative">
              <div className="mb-1 text-xs sm:text-sm" style={{ color: '#8a8178' }}>
                Total properties
              </div>
              <div className="font-serif text-2xl sm:text-3xl" style={{ color: '#d97346' }}>
                {properties?.length ?? 0}
              </div>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="mb-6 flex items-center gap-3">
          <h2 className="font-serif text-xl sm:text-2xl" style={{ color: '#3a3632' }}>
            Your properties
          </h2>
          <div
            className="h-px flex-1"
            style={{ background: 'linear-gradient(to right, #e0d8cc, transparent)' }}
          />
        </div>

        {/* Properties Grid */}
        {error && (
          <pre
            className="mb-8 overflow-x-auto rounded-2xl p-4 text-xs"
            style={{ border: '1px solid #fca5a5', backgroundColor: '#fef2f2', color: '#dc2626' }}
          >
            {JSON.stringify(error, null, 2)}
          </pre>
        )}

        {!properties || properties.length === 0 ? (
          <div
            className="flex min-h-[300px] items-center justify-center rounded-2xl border-2 border-dashed bg-white/40 sm:min-h-[400px] sm:rounded-3xl"
            style={{ borderColor: '#e0d8cc' }}
          >
            <div className="max-w-md px-6 text-center">
              <div
                className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full sm:h-16 sm:w-16"
                style={{ backgroundColor: 'rgba(147, 164, 133, 0.15)' }}
              >
                <svg
                  className="h-7 w-7 sm:h-8 sm:w-8"
                  style={{ color: '#93a485' }}
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
              <h3 className="mb-2 font-serif text-lg sm:text-xl" style={{ color: '#3a3632' }}>
                No stays yet
              </h3>
              <p className="text-sm sm:text-base" style={{ color: '#8a8178' }}>
                Start by adding your first property to Agistrea.
                <br className="hidden sm:inline" /> Take it slow, one step at a time.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {properties.map(p => {
              // Status Styling
              const statusConfig = {
                draft: {
                  emoji: '🌱',
                  label: 'Growing',
                  bg: 'rgba(147, 164, 133, 0.15)',
                  border: 'rgba(147, 164, 133, 0.28)',
                  text: '#93a485',
                },
                published: {
                  emoji: '☀️',
                  label: 'Live',
                  bg: 'rgba(217, 115, 70, 0.15)',
                  border: 'rgba(217, 115, 70, 0.28)',
                  text: '#d97346',
                },
                pending: {
                  emoji: '🌊',
                  label: 'In review',
                  bg: 'rgba(244, 165, 125, 0.15)',
                  border: 'rgba(244, 165, 125, 0.28)',
                  text: '#f4a57d',
                },
              }

              const status =
                statusConfig[p.status as keyof typeof statusConfig] || statusConfig.draft

              return (
                <Link
                  key={p.id}
                  href={`/host/properties/${p.id}/edit`}
                  className="group relative overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:rounded-3xl"
                  style={{ border: '1px solid #e0d8cc' }}
                >
                  {/* Image Area */}
                  <div
                    className="relative h-40 overflow-hidden sm:h-48"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(245, 196, 163, 0.4), rgba(165, 181, 192, 0.25), rgba(147, 164, 133, 0.3))',
                    }}
                  >
                    {p.image_url ? (
                      <img
                        src={p.image_url}
                        alt={p.title || 'Property'}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <svg
                          className="h-12 w-12 opacity-20 sm:h-16 sm:w-16"
                          style={{ color: '#8a8178' }}
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
                      className="absolute top-2 right-2 flex items-center gap-1.5 rounded-full px-2.5 py-1 backdrop-blur-sm sm:top-3 sm:right-3 sm:px-3 sm:py-1.5"
                      style={{
                        backgroundColor: status.bg,
                        border: `1px solid ${status.border}`,
                      }}
                    >
                      <span className="text-xs sm:text-sm">{status.emoji}</span>
                      <span className="text-xs font-medium" style={{ color: status.text }}>
                        {status.label}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5">
                    <h3
                      className="mb-2 font-serif text-lg leading-snug transition-colors group-hover:text-(--color-tangerine) sm:text-xl"
                      style={{ color: '#3a3632' }}
                    >
                      {p.title || 'Untitled stay'}
                    </h3>

                    <div
                      className="mb-3 flex items-center gap-2 text-xs sm:text-sm"
                      style={{ color: '#8a8178' }}
                    >
                      <svg
                        className="h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4"
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
                      <span className="truncate">Agistri · {p.location || 'Location not set'}</span>
                    </div>

                    <div
                      className="mb-3 truncate font-mono text-[10px] opacity-50 sm:mb-4 sm:text-xs"
                      style={{ color: '#8a8178' }}
                    >
                      /stays/{p.slug}
                    </div>

                    {/* Action */}
                    <div
                      className="flex items-center gap-2 text-xs font-medium transition-colors sm:text-sm"
                      style={{ color: '#d97346' }}
                    >
                      <span>Continue editing</span>
                      <svg
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4"
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
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-[0.04]"
                    style={{ background: 'linear-gradient(to top, #d97346, transparent)' }}
                  />
                </Link>
              )
            })}
          </div>
        )}

        {/* Bottom spacing */}
        <div className="h-16 sm:h-20" />
      </div>
    </>
  )
}
