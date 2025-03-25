import { createUpdateSchema } from 'drizzle-zod'

const schema = createUpdateSchema(tables.postTexts, {
  title: (schema) => schema.trim().min(1),
  content: (schema) => schema.trim().min(1),
})

export default eventHandler(async (event) => {
  requireUserSession(event)
  const { id } = getRouterParams(event)
  const postText = await readValidatedBody(event, schema.parse)

  const idNum = Number(id)

  if (!idNum || postText.id !== idNum) {
    throw createError({
      statusCode: 400,
      message: 'Invalid or mismatched ID',
    })
  }

  const postTexts = await useDrizzle()
    .update(tables.postTexts)
    .set(postText)
    .where(eq(tables.postTexts.id, idNum))
    .returning()

  return postTexts
})
