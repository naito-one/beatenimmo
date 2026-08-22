export const NEWSLETTER_FLAG = 'beatenimmo_seen_newsletter'
export const normalizedLocales = ['en', 'de'] as const
export type AvailableLocales = (typeof normalizedLocales)[number]
