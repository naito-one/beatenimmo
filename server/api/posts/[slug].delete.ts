export default eventHandler(async (event) => {
  await requireUserSession(event)
  // route uses slug like the get route because otherwise occurs a weird
  // D1_TYPE_ERROR: Type 'undefined' not supported for value 'undefined'
  // but it's actually the ID
  const { slug: id } = getRouterParams(event)

  const idNum = Number(id)

  if (!idNum) {
    throw createError({
      statusCode: 400,
      message: 'Invalid ID',
    })
  }

  const res = await useDrizzle()
    .delete(tables.posts)
    .where(eq(tables.posts.id, idNum))

  return res
})
