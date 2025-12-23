import React from 'react'
import Providers from '../providers'

export const dynamicParams = false

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'gr' }]
}

const SUPPORTED_LANGS = new Set(['en', 'gr'] as const)
type Lang = 'en' | 'gr'

function normalizeLang(lang: string): Lang {
  return SUPPORTED_LANGS.has(lang as Lang) ? (lang as Lang) : 'en'
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang: rawLang } = await params
  const lang = normalizeLang(rawLang)

  return <Providers lang={lang}>{children}</Providers>
}
