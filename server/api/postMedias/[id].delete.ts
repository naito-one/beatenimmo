export default eventHandler(async (event) => {
  requireUserSession(event)
  const { id } = getRouterParams(event)

  const idNum = Number(id)

  if (!idNum) {
    throw createError({
      statusCode: 400,
      message: 'Invalid ID',
    })
  }

  const res = await useDrizzle()
    .delete(tables.postMedias)
    .where(eq(tables.postMedias.id, idNum))

  return res
})
