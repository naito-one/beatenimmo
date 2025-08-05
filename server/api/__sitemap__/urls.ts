import { defineSitemapEventHandler } from '#imports'
import type { SitemapUrl } from '#sitemap/types'
import { PublicRuntimeConfig } from 'nuxt/schema'
import { Post } from '~/server/utils/drizzle'
import superjson from 'superjson'

function localePath(
  slug: string,
  locale: string,
  config: PublicRuntimeConfig,
): string {
  const isDefaultLocale = config.i18n.defaultLocale === locale
  const prefexExceptDefaultStrat =
    config.i18n.strategy === 'prefix_except_default'
  return `/${isDefaultLocale && prefexExceptDefaultStrat ? '' : locale + '/'}posts/${slug}`
}

export default defineSitemapEventHandler(async () => {
  const config = useRuntimeConfig()
  const locales = config.public.i18n.locales.map((locale) => locale.code)
  const isoLocales = Object.fromEntries(
    config.public.i18n.locales.map((locale) => [locale.code, locale.language]),
  )

  const posts = (await superjson.parse(
    (await $fetch('/api/posts?sorting=latest')) as unknown as string,
  )) as Post[]
  console.log(posts)

  if (!posts || !posts.length) {
    return []
  }

  const results: SitemapUrl[][] = locales.map((locale) => {
    const otherLocales = locales.filter((l) => l !== locale)
    return posts.map(
      (entry) =>
        ({
          // explicit sitemap mapping
          _sitemap: isoLocales[locale],
          loc: localePath(entry.slug, locale, config.public),
          alternatives: otherLocales.map((alt) => ({
            hreflang: isoLocales[alt],
            href: localePath(entry.slug, alt, config.public),
          })),
        }) satisfies SitemapUrl,
    )
  })

  return results.flat()
})
