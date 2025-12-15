import { NextResponse } from 'next/server'

type InstagramPost = {
  id: string
  imageUrl: string
  caption?: string
  permalink: string
}

const IG_BASIC_ACCESS_TOKEN = process.env.IG_BASIC_ACCESS_TOKEN

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const limit = Math.min(Number(url.searchParams.get('limit') ?? 6) || 6, 12)

    if (!IG_BASIC_ACCESS_TOKEN) {
      return NextResponse.json([], { status: 200 })
    }

    const apiUrl =
      `https://graph.instagram.com/me/media` +
      `?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp` +
      `&access_token=${IG_BASIC_ACCESS_TOKEN}`

    const r = await fetch(apiUrl, { next: { revalidate: 600 } })
    const j = await r.json()

    if (!r.ok) {
      console.error('Instagram Basic API error:', j)
      return NextResponse.json([], { status: 200 })
    }

    const posts: InstagramPost[] = (j?.data ?? [])
      .slice(0, limit)
      .map((p: any) => {
        const imageUrl = p.media_type === 'VIDEO' ? p.thumbnail_url : p.media_url
        if (!p?.id || !p?.permalink || !imageUrl) return null
        return {
          id: String(p.id),
          imageUrl: String(imageUrl),
          caption: p.caption ? String(p.caption) : undefined,
          permalink: String(p.permalink),
        }
      })
      .filter(Boolean)

    return NextResponse.json(posts, { status: 200 })
  } catch (e) {
    console.error('Instagram route crash:', e)
    return NextResponse.json([], { status: 200 })
  }
}
