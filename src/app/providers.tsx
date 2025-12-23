'use client'

import React from 'react'
import { TranslationProvider } from '@/utils/TranslationProvider'

export default function Providers({
  children,
  lang,
}: {
  children: React.ReactNode
  lang: 'en' | 'gr'
}) {
  return <TranslationProvider language={lang}>{children}</TranslationProvider>
}

