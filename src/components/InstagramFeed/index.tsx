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
  username: string
  limit?: number
}

export default function InstagramFeed({ username, limit = 6 }: InstagramFeedProps) {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const load = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const res = await fetch(`/api/instagram?limit=${limit}`, {
          signal: controller.signal,
          cache: 'no-store',
        })

        if (!res.ok) {
          throw new Error(`Instagram API route returned ${res.status}`)
        }

        const data = (await res.json()) as InstagramPost[]
        if (isMounted) setPosts(Array.isArray(data) ? data : [])
      } catch (err: any) {
        if (err?.name === 'AbortError') return

        console.error(err)
        if (isMounted) setError('Instagram feed is currently unavailable.')
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    load()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [limit])

  const profileUrl = `https://www.instagram.com/${username.replace('@', '')}/`

  return (
    <section className="instagram-feed border-border border-t pt-6 pr-[15px] pb-6 pl-[15px] md:pt-8 md:pb-8 md:pl-[85px]">
      <div className="mb-4 flex items-baseline justify-between">
        <div>
          <p className="text-muted-foreground text-[12px] font-semibold tracking-[2px] uppercase">
            On Instagram
          </p>
        </div>
      </div>

      {isLoading && (
        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-5">
          {Array.from({ length: limit }).map((_, i) => (
            <div key={i} className="bg-muted aspect-square w-full animate-pulse" />
          ))}
        </div>
      )}

      {!isLoading && error && <p className="text-muted-foreground text-[13px]">{error}</p>}

      {!isLoading && !error && posts.length > 0 && (
        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-5">
          {posts.map(post => (
            <Link
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noreferrer"
              className="group bg-muted relative block aspect-square overflow-hidden"
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
      <Link
        href={profileUrl}
        target="_blank"
        rel="noreferrer"
        className="flex justify-end gap-2 text-[12px] font-medium"
      >
        <span className="text-[var(--color-sea)] hover:text-[var(--text-accent-hover)]">
          View on Instagram →
        </span>
        <span className="text-foreground text-[14px] hover:text-[var(--color-sea)]">
          {username}
        </span>
      </Link>
    </section>
  )
}
