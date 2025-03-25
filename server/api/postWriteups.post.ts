import { createInsertSchema } from 'drizzle-zod'

const schema = createInsertSchema(tables.postWriteups, {
  title: (schema) => schema.trim().min(1),
  description: (schema) => schema.trim().min(1),
  price: (schema) => schema.trim().min(1),
  address: (schema) => schema.trim(),
  locale: (schema) =>
    schema.refine((locale) => locale === 'en' || locale === 'de'),
})

export default eventHandler(async (event) => {
  requireUserSession(event)
  const postWriteup = await readValidatedBody(event, schema.parse)
  postWriteup.id = undefined

  const postWriteups = await useDrizzle()
    .insert(tables.postWriteups)
    .values(postWriteup)
    .returning()

  return postWriteups
})
