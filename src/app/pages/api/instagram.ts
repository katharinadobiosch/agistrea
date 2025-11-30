import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const limit = Number(req.query.limit || 6)

  const token = process.env.INSTAGRAM_TOKEN // du setzt ihn in .env.local
  const fields = 'id,media_type,media_url,caption,permalink'

  try {
    const igRes = await fetch(
      `https://graph.instagram.com/me/media?fields=${fields}&access_token=${token}`
    )
    const json = await igRes.json()

    const mapped = json.data
      .filter((p: any) => ['IMAGE', 'CAROUSEL_ALBUM'].includes(p.media_type))
      .slice(0, limit)
      .map((p: any) => ({
        id: p.id,
        imageUrl: p.media_url,
        permalink: p.permalink,
        caption: p.caption,
      }))

    res.status(200).json(mapped)
  } catch (err) {
    res.status(500).json({ error: 'Failed to load feed' })
  }
}
