import { createSupabaseServerReadOnly } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PricingCalendar as ReservationCalendar } from '@/components/Hosts/PricingCalendar'
import { ContactForm } from './ContactForm'

type PageProps = {
  slug: string
}

const PROPERTY_IMAGE_BUCKET = 'property-images'

type Property = {
  id: string
  host_id: string
  slug: string | null
  status: 'draft' | 'published' | string
  title: string
  description: string | null
  location_text: string | null
  guests: number
  bedrooms: number
  bathrooms: number
  contact_name: string | null
  contact_email: string | null
  contact_phone: string | null
  currency: string
  default_price_per_night: number | null
  default_min_nights: number | null
}

type PropertyImage = {
  id: string
  storage_path: string
  sort_order: number
}

type AvailabilityRow = {
  day: string
  available: boolean
  price_per_night: number | null
  min_nights: number | null
}

export default async function PublicPropertyPage({ slug }: PageProps) {
  const supabase = await createSupabaseServerReadOnly()
  // 1) Property by slug (NO status filter)
  const { data: property, error: propertyError } = await supabase
    .from('properties')
    .select(
      `
        id,
        host_id,
        slug,
        status,
        title,
        description,
        location_text,
        guests,
        bedrooms,
        bathrooms,
        contact_name,
        contact_email,
        contact_phone,
        currency,
        default_price_per_night,
        default_min_nights
      `
    )
    .eq('slug', slug)
    .single()

  if (propertyError || !property) notFound()

  // 2) Gate drafts: only owner can preview
  const isPublished = property.status === 'published'
  if (!isPublished) {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // must be logged in and must be the owner
    if (!user || user.id !== property.host_id) notFound()
  }

  // Fetch images
  const { data: images } = await supabase
    .from('property_images')
    .select('id, storage_path, sort_order')
    .eq('property_id', property.id)
    .order('sort_order', { ascending: true })
    .returns<PropertyImage[]>()

  // Fetch availability for next 3 months
  const today = new Date()
  const threeMonthsFromNow = new Date()
  threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3)

  const startDay = today.toISOString().split('T')[0]
  const endDay = threeMonthsFromNow.toISOString().split('T')[0]

  const { data: availability } = await supabase
    .from('property_availability')
    .select('day, available, price_per_night, min_nights')
    .eq('property_id', property.id)
    .gte('day', startDay)
    .lte('day', endDay)
    .order('day', { ascending: true })
    .returns<AvailabilityRow[]>()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const buildImageUrl = (storagePath: string) =>
    supabaseUrl
      ? `${supabaseUrl}/storage/v1/object/public/${PROPERTY_IMAGE_BUCKET}/${storagePath}`
      : null

  const mainImage = images?.[0]
  const mainImageUrl = mainImage?.storage_path ? buildImageUrl(mainImage.storage_path) : null

  return (
    <div className="public-property-page min-h-screen pl-15" style={{ backgroundColor: '#faf7f2' }}>
      {!isPublished && (
        <div className="bg-black py-2 text-center text-xs text-white">
          Draft preview — only visible to you
        </div>
      )}
      <nav className="border-b bg-white/80 backdrop-blur-md" style={{ borderColor: '#e0d8cc' }}>
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <Link href="/" className="font-serif text-xl transition" style={{ color: '#d97346' }}>
            Agistrea
          </Link>
        </div>
      </nav>

      <div className="relative h-64 w-full sm:h-80 lg:h-96">
        {mainImageUrl ? (
          <img
            src={mainImageUrl}
            alt={property.title || 'Property'}
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className="flex h-full items-center justify-center"
            style={{
              background:
                'linear-gradient(135deg, rgba(245, 196, 163, 0.4), rgba(165, 181, 192, 0.25), rgba(147, 164, 133, 0.3))',
            }}
          >
            <svg
              className="h-16 w-16 sm:h-24 sm:w-24"
              style={{ color: '#8a8178', opacity: 0.3 }}
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

        <Link
          href="/"
          className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition hover:bg-white"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </Link>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
          <div className="space-y-6 lg:col-span-2">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div
                  className="h-px w-8 sm:w-12"
                  style={{ backgroundColor: '#d97346', opacity: 0.6 }}
                />
                <span
                  className="text-xs tracking-wider uppercase"
                  style={{ color: '#d97346', opacity: 0.75 }}
                >
                  {property.location_text || 'Agistri'}
                </span>
              </div>

              <h1
                className="mb-3 font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl"
                style={{ color: '#3a3632' }}
              >
                {property.title || 'Untitled Property'}
              </h1>

              <div
                className="flex flex-wrap items-center gap-4 text-sm"
                style={{ color: '#8a8178' }}
              >
                {!!property.guests && <span>{property.guests} guests</span>}
                {!!property.bedrooms && <span>{property.bedrooms} bedrooms</span>}
                {!!property.bathrooms && <span>{property.bathrooms} bathrooms</span>}
              </div>
            </div>

            {property.description && (
              <div
                className="rounded-2xl border bg-white p-6 sm:rounded-3xl sm:p-8"
                style={{ borderColor: '#e0d8cc' }}
              >
                <h2 className="mb-4 font-serif text-xl sm:text-2xl" style={{ color: '#3a3632' }}>
                  About this stay
                </h2>
                <p
                  className="text-base leading-relaxed whitespace-pre-wrap"
                  style={{ color: '#534f49' }}
                >
                  {property.description}
                </p>
              </div>
            )}

            {images && images.length > 1 && (
              <div
                className="rounded-2xl border bg-white p-4 sm:rounded-3xl sm:p-6"
                style={{ borderColor: '#e0d8cc' }}
              >
                <h2 className="mb-4 font-serif text-xl sm:text-2xl" style={{ color: '#3a3632' }}>
                  Photos
                </h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                  {images.slice(1).map((img: PropertyImage, idx: number) => {
                    const src = img.storage_path ? buildImageUrl(img.storage_path) : null
                    return (
                      <div
                        key={img.id}
                        className="relative aspect-square overflow-hidden rounded-xl"
                      >
                        {src ? (
                          <img
                            src={src}
                            alt={`Photo ${idx + 2}`}
                            className="h-full w-full object-cover transition hover:scale-105"
                          />
                        ) : (
                          <div
                            className="flex h-full items-center justify-center"
                            style={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
                          >
                            <span className="text-sm" style={{ color: '#8a8178', opacity: 0.6 }}>
                              No image
                            </span>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="lg:hidden">
              <BookingCard
                propertyId={property.id}
                defaultPrice={Number(property.default_price_per_night ?? 100)}
                currency={property.currency || 'EUR'}
                availability={availability || []}
                minNights={property.default_min_nights ?? 2}
              />
            </div>

            <div
              className="rounded-2xl border bg-white p-6 sm:rounded-3xl sm:p-8"
              style={{ borderColor: '#e0d8cc' }}
            >
              <h2 className="mb-4 font-serif text-xl sm:text-2xl" style={{ color: '#3a3632' }}>
                Get in touch
              </h2>
              <ContactForm
                propertyTitle={property.title || 'the property'}
                contactEmail={property.contact_email || ''}
                contactPhone={property.contact_phone || ''}
              />
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-6">
              <BookingCard
                propertyId={property.id}
                defaultPrice={Number(property.default_price_per_night ?? 100)}
                currency={property.currency || 'EUR'}
                availability={availability || []}
                minNights={property.default_min_nights ?? 2}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BookingCard({
  propertyId,
  defaultPrice,
  currency,
  availability,
  minNights,
}: {
  propertyId: string
  defaultPrice: number
  currency: string
  availability: AvailabilityRow[]
  minNights: number
}) {
  return (
    <div
      className="rounded-2xl border bg-white p-6 shadow-lg sm:rounded-3xl"
      style={{ borderColor: '#e0d8cc' }}
    >
      <div className="mb-4 flex items-baseline gap-2">
        <span className="font-serif text-3xl" style={{ color: '#d97346' }}>
          €{defaultPrice}
        </span>
        <span className="text-sm" style={{ color: '#8a8178' }}>
          / night
        </span>
      </div>

      <ReservationCalendar
        propertyId={propertyId}
        defaultPrice={defaultPrice}
        currency={currency}
        availability={availability}
      />
    </div>
  )
}
