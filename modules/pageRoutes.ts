import { defineNuxtModule } from 'nuxt/kit'
import type { NuxtPage } from 'nuxt/schema'

/**
 * Convert the given pages and their children to regex sources of their paths
 *
 * A route param matches one path segment. A catch-all param matches the rest of the path.
 */
function toRouteSources(pages: NuxtPage[], parent = ''): string[] {
  return pages.flatMap((page) => {
    const path = page.path.startsWith('/')
      ? page.path
      : `${parent}/${page.path}`
    const source = path
      .replace(/:\w+\(\.\*\)\*/g, '.*')
      .replace(/:\w+(\(\))?\??/g, '[^/]+')
    return [source, ...toRouteSources(page.children ?? [], path)]
  })
}

/**
 * Expose a regex source for every page path through the `#page-routes` virtual module
 *
 * Used by server/plugins/notFound.ts to tell page requests from bot probes.
 */
export default defineNuxtModule({
  meta: { name: 'page-routes' },
  setup(_options, nuxt) {
    let pages: NuxtPage[] = []
    nuxt.hook('pages:resolved', (resolved) => {
      pages = resolved
    })

    nuxt.hook('nitro:config', (nitroConfig) => {
      nitroConfig.virtual ??= {}
      // Nitro calls this when it bundles, after every pages:resolved hook has run
      // @nuxtjs/i18n adds the localised routes to this same array in its own pages:resolved hook
      nitroConfig.virtual['#page-routes'] = () =>
        `export default ${JSON.stringify(toRouteSources(pages))}`
    })
  },
})
