import { db } from '@nuxthub/db'

export default eventHandler(async (event) => {
  const { id } = getRouterParams(event)

  const postTexts = await db
    .select()
    .from(tables.postTexts)
    .where(eq(tables.postTexts.postWriteupId, Number(id)))
    .all()

  return postTexts
})
