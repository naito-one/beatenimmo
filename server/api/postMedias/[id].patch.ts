import { createUpdateSchema } from 'drizzle-zod'

const schema = createUpdateSchema(tables.postMedias, {
  pathname: (schema) => schema.trim().min(1),
  description: (schema) => schema.trim(),
})

export default eventHandler(async (event) => {
  requireUserSession(event)
  const { id } = getRouterParams(event)
  const postMedia = await readValidatedBody(event, schema.parse)

  const idNum = Number(id)

  if (!idNum || postMedia.id !== idNum) {
    throw createError({
      statusCode: 400,
      message: 'Invalid or mismatched ID',
    })
  }

  const postMedias = await useDrizzle()
    .update(tables.postMedias)
    .set(postMedia)
    .where(eq(tables.postMedias.id, idNum))
    .returning()

  return postMedias
})
