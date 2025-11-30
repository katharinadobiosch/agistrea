// components/InstagramFeed.tsx
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type InstagramPost = {
  id: string
  imageUrl: string
  caption?: string
  permalink: string
}

type InstagramFeedProps = {
  username: string // nur fürs UI („@agistrea“)
  limit?: number // wie viele Posts anzeigen
}

export default function InstagramFeed({ username, limit = 6 }: InstagramFeedProps) {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/instagram?limit=${limit}`)
        if (!res.ok) {
          throw new Error('Failed to load Instagram posts')
        }
        const data = (await res.json()) as InstagramPost[]
        setPosts(data)
      } catch (err) {
        console.error(err)
        setError('Instagram feed is currently unavailable.')
      } finally {
        setIsLoading(false)
      }
    }

    load()
  }, [limit])

  return (
    <section className="mt-12 border-t border-slate-200 pt-8">
      <div className="mb-4 flex items-baseline justify-between">
        <div>
          <p className="text-[12px] font-semibold tracking-[2px] text-slate-500 uppercase">
            On Instagram
          </p>
          <Link
            href={`https://www.instagram.com/${username.replace('@', '')}/`}
            target="_blank"
            rel="noreferrer"
            className="text-[14px] font-medium text-slate-900 hover:underline"
          >
            {username}
          </Link>
        </div>

        <Link
          href={`https://www.instagram.com/${username.replace('@', '')}/`}
          target="_blank"
          rel="noreferrer"
          className="text-[12px] font-medium text-slate-500 hover:text-slate-800"
        >
          View on Instagram →
        </Link>
      </div>

      {isLoading && (
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {Array.from({ length: limit }).map((_, i) => (
            <div key={i} className="aspect-square w-full animate-pulse bg-slate-100" />
          ))}
        </div>
      )}

      {!isLoading && error && <p className="text-[13px] text-slate-500">{error}</p>}

      {!isLoading && !error && posts.length > 0 && (
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {posts.map(post => (
            <Link
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noreferrer"
              className="group relative block aspect-square overflow-hidden bg-slate-100"
            >
              <Image
                src={post.imageUrl}
                alt={post.caption || 'Instagram post'}
                fill
                sizes="(min-width: 1024px) 200px, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* leichtes Overlay bei Hover */}
              <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15" />
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
