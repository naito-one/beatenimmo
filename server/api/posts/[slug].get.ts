import { db } from '@nuxthub/db'
import superjson from 'superjson'

export default eventHandler(async (event) => {
  const { slug } = getRouterParams(event)

  const session = await getUserSession(event)
  const isLoggedIn = Boolean(session.user)

  const posts = await db
    .select()
    .from(tables.posts)
    .where(
      and(
        eq(tables.posts.slug, slug!),
        isLoggedIn ? undefined : eq(tables.posts.visible, true),
      ),
    )
    .limit(1)

  if (!posts.length) {
    throw createError({
      statusCode: 404,
      message: 'Not Found',
    })
  }

  return superjson.stringify(posts[0]) as unknown as (typeof posts)[0]
})
