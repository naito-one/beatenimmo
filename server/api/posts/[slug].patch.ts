import { createSchemaFactory } from 'drizzle-zod'
import superjson from 'superjson'

const { createUpdateSchema } = createSchemaFactory({
  coerce: {
    date: true,
  },
})

const schema = createUpdateSchema(tables.posts, {
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
  // route uses slug like the get route because otherwise occurs a weird
  // D1_TYPE_ERROR: Type 'undefined' not supported for value 'undefined'
  // but it's actually the ID
  const { slug: id } = getRouterParams(event)
  const post = await readValidatedBody(event, schema.parse)

  const idNum = Number(id)

  if (!idNum || post.id !== idNum) {
    throw createError({
      statusCode: 400,
      message: 'Invalid or mismatched ID',
    })
  }

  const posts = await useDrizzle()
    .update(tables.posts)
    .set(post)
    .where(eq(tables.posts.id, idNum))
    .returning()

  return superjson.stringify(posts) as unknown as typeof posts
})
