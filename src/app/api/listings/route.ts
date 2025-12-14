// src/app/api/listings/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// kleine Helper-Funktion für Slugs
function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    if (!body.title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    const slug = body.slug ? slugify(body.slug) : slugify(body.title)

    // Supabase-Insert statt Prisma .listing.create
    const { data, error } = await db
      .from('listings')
      .insert({
        title: body.title,
        slug,
        location: body.location ?? null,
        description: body.description ?? null,
        nightly_price: body.nightly_price ?? null,
        published: body.published ?? false,
        // host_id: später mit Auth
      })
      .select('*')
      .single()

    if (error) {
      console.error('Supabase insert error', error)
      return NextResponse.json(
        { error: 'Failed to create listing', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data, { status: 201 })
  } catch (err) {
    console.error('POST /api/listings error', err)
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}

export async function GET() {
  const { data, error } = await db
    .from('listings')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Supabase select error', error)
    return NextResponse.json(
      { error: 'Failed to fetch listings', details: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json(data ?? [], { status: 200 })
}
