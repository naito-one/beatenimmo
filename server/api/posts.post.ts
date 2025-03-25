import { createSchemaFactory } from 'drizzle-zod'
import superjson from 'superjson'

const { createInsertSchema } = createSchemaFactory({
  coerce: {
    date: true,
  },
})

const schema = createInsertSchema(tables.posts, {
  slug: (schema) =>
    schema
      .trim()
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/g, {
        message:
          'Slug must contain only lower case letters, numbers and hyphens, and cannot start or end with a hyphen',
      })
      .min(1),
  type: (schema) => schema.refine((type) => type === 'buy' || type === 'rent'),
})

export default eventHandler(async (event) => {
  requireUserSession(event)
  const post = await readValidatedBody(event, schema.parse)
  post.id = undefined

  const posts = await useDrizzle().insert(tables.posts).values(post).returning()

  return superjson.stringify(posts) as unknown as typeof posts
})
