import { createInsertSchema } from 'drizzle-zod'

const schema = createInsertSchema(tables.postTexts, {
  title: (schema) => schema.trim().min(1),
  content: (schema) => schema.trim().min(1),
})

export default eventHandler(async (event) => {
  requireUserSession(event)
  const postText = await readValidatedBody(event, schema.parse)
  postText.id = undefined

  const postTexts = await useDrizzle()
    .insert(tables.postTexts)
    .values(postText)
    .returning()

  return postTexts
})
