export default eventHandler(async () => {
  const posts = await useDrizzle().select().from(tables.posts).all()

  return posts
})
