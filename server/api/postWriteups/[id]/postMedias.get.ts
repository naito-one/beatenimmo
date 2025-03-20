export default eventHandler(async (event) => {
  const { id } = getRouterParams(event)

  const postMedias = await useDrizzle()
    .select()
    .from(tables.postMedias)
    .where(eq(tables.postMedias.postWriteupId, Number(id)))
    .all()

  return postMedias
})
