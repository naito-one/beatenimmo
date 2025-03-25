import { createInsertSchema } from 'drizzle-zod'

const schema = createInsertSchema(tables.postMedias, {
  pathname: (schema) => schema.trim().min(1),
  description: (schema) => schema.trim(),
})

export default eventHandler(async (event) => {
  requireUserSession(event)
  const postMedia = await readValidatedBody(event, schema.parse)
  postMedia.id = undefined

  const postMedias = await useDrizzle()
    .insert(tables.postMedias)
    .values(postMedia)
    .returning()

  return postMedias
})
