import React from 'react'
import Providers from '../providers'

export const dynamicParams = false

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'gr' }]
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: 'en' | 'gr' }>
}) {
  const { lang } = await params
  return <Providers lang={lang}>{children}</Providers>
}
