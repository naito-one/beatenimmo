export default eventHandler(async (event) => {
  const { id } = getRouterParams(event)

  const postTexts = await useDrizzle()
    .select()
    .from(tables.postTexts)
    .where(eq(tables.postTexts.postWriteupId, Number(id)))
    .all()

  return postTexts
})
