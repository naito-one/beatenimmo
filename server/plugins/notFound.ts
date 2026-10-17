import pageRoutes from '#page-routes'

// We answer requests matching no page with a static 404 page, instead of letting Nuxt render its error page.
// Bots probe hundreds of paths in bursts, and rendering the error page for each one goes over the Workers CPU limit.
// render:before only runs for requests that no server route handled, so API, media, sitemap and asset routes never reach it.

const PAGE_ROUTES = pageRoutes.map((source) => new RegExp(`^${source}$`))

const NOT_FOUND_HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Page not found</title>
<style>body{font-family:system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#f5f5f5;color:#171717}a{color:#1e40af}</style>
</head>
<body>
<h1>Page not found</h1>
<p><a href="/">Go to the home page</a></p>
</body>
</html>
`

/**
 * Returns true if the given request path matches a page route
 *
 * The query string, a trailing slash and a trailing /_payload.json are ignored.
 */
function isPagePath(path: string) {
  const pathname = path
    .split('?')[0]!
    .replace(/\/_payload\.json$/, '')
    .replace(/(.)\/$/, '$1')
  return PAGE_ROUTES.some((route) => route.test(pathname))
}

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:before', (ctx) => {
    // Nuxt renders its own error page through this path
    if (
      ctx.event.path.startsWith('/__nuxt_error') ||
      isPagePath(ctx.event.path)
    ) {
      return
    }
    ctx.response = {
      statusCode: 404,
      statusMessage: 'Not Found',
      body: NOT_FOUND_HTML,
      headers: { 'content-type': 'text/html; charset=utf-8' },
    }
  })
})
