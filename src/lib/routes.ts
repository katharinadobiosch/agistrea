export type Lang = 'en' | 'gr'

export const hostRoute = (lang: Lang, path: string = '') =>
  `/${lang}/host${path.startsWith('/') ? path : `/${path}`}`.replace(/\/$/, '')
