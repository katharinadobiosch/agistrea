import React from 'react'
import Providers from '../providers'

export const dynamicParams = false

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'gr' }]
}

const SUPPORTED = new Set(['en', 'gr'] as const)
type Lang = 'en' | 'gr'
const normalizeLang = (l: string): Lang => (SUPPORTED.has(l as Lang) ? (l as Lang) : 'en')

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang: raw } = await params
  const lang = normalizeLang(raw)

  return <Providers lang={lang}>{children}</Providers>
}
