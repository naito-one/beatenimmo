import { createUpdateSchema } from 'drizzle-zod'

const schema = createUpdateSchema(tables.postWriteups, {
  title: (schema) => schema.trim().min(1),
  description: (schema) => schema.trim().min(1),
  price: (schema) => schema.trim().min(1),
  address: (schema) => schema.trim(),
  locale: (schema) =>
    schema.refine((locale) => locale === 'en' || locale === 'de'),
})

export default eventHandler(async (event) => {
  await requireUserSession(event)
  const { id } = getRouterParams(event)
  const postWriteup = await readValidatedBody(event, schema.parse)

  const idNum = Number(id)

  if (!idNum || postWriteup.id !== idNum) {
    throw createError({
      statusCode: 400,
      message: 'Invalid or mismatched ID',
    })
  }

  const postWriteups = await useDrizzle()
    .update(tables.postWriteups)
    .set(postWriteup)
    .where(eq(tables.postWriteups.id, idNum))
    .returning()

  return postWriteups
})
