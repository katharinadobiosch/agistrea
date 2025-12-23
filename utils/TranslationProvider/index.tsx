'use client'

import React, { createContext, useCallback, useContext, useMemo } from 'react'
import translations from '../translations'

export const DEFAULT_LANGUAGE = 'en'
export type Language = keyof typeof translations // 'en' | 'gr'

type TranslationValue = string | number | ((...args: any[]) => any)

type TranslationContextValue = {
  language: Language
  t: (key: string, fallback?: TranslationValue) => TranslationValue
}

const TranslationContext = createContext<TranslationContextValue>({
  language: DEFAULT_LANGUAGE as Language,
  t: (_key, fallback = '') => fallback ?? '',
})

export function TranslationProvider({
  language = DEFAULT_LANGUAGE as Language,
  children,
}: {
  language?: Language
  children: React.ReactNode
}) {
  const t = useCallback(
    (key: string, fallback: TranslationValue = ''): TranslationValue => {
      const dict = translations[language] as Record<string, TranslationValue>
      return dict[key] ?? fallback
    },
    [language]
  )

  const value = useMemo(() => ({ language, t }), [language, t])

  return <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>
}

export function useTranslation() {
  return useContext(TranslationContext)
}

export default TranslationContext
export { translations }
