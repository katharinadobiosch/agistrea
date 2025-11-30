// src/app/api/instagram/route.ts

import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const limit = Number(searchParams.get('limit') || 6)

  const token = process.env.INSTAGRAM_TOKEN
  const fields = 'id,media_type,media_url,caption,permalink'

  try {
    const igRes = await fetch(
      `https://graph.instagram.com/me/media?fields=${fields}&access_token=${token}`
    )

    const json = await igRes.json()

    const posts = json.data
      .filter((p: any) => ['IMAGE', 'CAROUSEL_ALBUM'].includes(p.media_type))
      .slice(0, limit)
      .map((p: any) => ({
        id: p.id,
        imageUrl: p.media_url,
        permalink: p.permalink,
        caption: p.caption,
      }))

    return NextResponse.json(posts)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to load Instagram feed' }, { status: 500 })
  }
}


