'use client'

import React from 'react'
import { TranslationProvider } from '@/../utils/TranslationProvider'

export default function Providers({ children }: { children: React.ReactNode }) {
  // später: language aus cookie / route / state
  return <TranslationProvider language="en">{children}</TranslationProvider>
}
