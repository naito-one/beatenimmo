import superjson from 'superjson'

export default eventHandler(async (event) => {
  const { slug } = getRouterParams(event)
  const posts = await useDrizzle()
    .select()
    .from(tables.posts)
    .where(and(eq(tables.posts.slug, slug), eq(tables.posts.visible, true)))
    .limit(1)

  if (!posts.length) {
    throw createError({
      statusCode: 404,
      message: 'Not Found',
    })
  }

  return superjson.stringify(posts[0]) as unknown as (typeof posts)[0]
})
