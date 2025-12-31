import { createSupabaseServerAction } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerAction()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { updates } = await request.json()

    if (!Array.isArray(updates) || updates.length === 0) {
      return NextResponse.json({ error: 'Invalid updates' }, { status: 400 })
    }

    // security: verify ownership
    const propertyIds = [...new Set(updates.map((u: any) => u.property_id))]
    const { data: properties, error: propError } = await supabase
      .from('properties')
      .select('id')
      .in('id', propertyIds)
      .eq('host_id', user.id)
      .is('deleted_at', null)

    if (propError || !properties || properties.length !== propertyIds.length) {
      return NextResponse.json({ error: 'Unauthorized or invalid property' }, { status: 403 })
    }

    const rows = updates.map((u: any) => ({
      property_id: u.property_id,
      day: u.day, // ✅ schema
      available: u.available,
      price_per_night: u.price_per_night ?? null,
      // optional später:
      // min_nights: u.min_nights ?? null,
      // notes: u.notes ?? null,
    }))

    const { error: upsertError } = await supabase
      .from('property_availability')
      .upsert(rows, { onConflict: 'property_id,day' }) // ✅ unique constraint

    if (upsertError) {
      console.error('Upsert error:', upsertError)
      return NextResponse.json({ error: 'Failed to update availability' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
