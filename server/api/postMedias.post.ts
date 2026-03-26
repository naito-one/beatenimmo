import { db } from '@nuxthub/db'
import { createInsertSchema } from 'drizzle-zod'

const schema = createInsertSchema(tables.postMedias, {
  pathname: (schema) => schema.trim().min(1),
  description: (schema) => schema.trim(),
})

export default eventHandler(async (event) => {
  await requireUserSession(event)
  const postMedia = await readValidatedBody(event, schema.parse)
  postMedia.id = undefined

  const postMedias = await db
    .insert(tables.postMedias)
    .values(postMedia)
    .returning()

  return postMedias
})
