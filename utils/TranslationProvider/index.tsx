// utils/TranslationProvider/index.tsx
'use client'

import React, { createContext, useCallback, useContext, useMemo } from 'react'
import translations from '../translations'

export const DEFAULT_LANGUAGE = 'en'

type TranslationContextValue = {
  language: 'en' | 'gr'
  t: (key: string, fallback?: any) => any
}

const TranslationContext = createContext<TranslationContextValue>({
  language: DEFAULT_LANGUAGE,
  t: (_key, fallback = '') => fallback,
})

export function TranslationProvider({
  language = DEFAULT_LANGUAGE,
  children,
}: {
  language?: 'en' | 'gr'
  children: React.ReactNode
}) {
  const t = useCallback(
    (key: string, fallback = '') => {
      return translations?.[language]?.[key] ?? fallback
    },
    [language]
  )

  const value = useMemo(() => ({ language, t }), [language, t])

  return <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>
}

export function useTranslation() {
  return useContext(TranslationContext)
}
