import { z } from 'zod'

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export default defineEventHandler(async (event) => {
  const { adminPassword } = useRuntimeConfig()
  const body = await readBody(event)
  const { email, password } = await readValidatedBody(event, bodySchema.parse)

  if (email === 'info@beatenimmo.ch' && password === adminPassword) {
    try {
      // set the user session in the cookie
      // this server util is auto-imported by the auth-utils module
      await setUserSession(event, {
        user: {
          name: 'Corinne Winkelmann',
        },
      })
      return {}
    } catch (e) {
      console.error(e)
      return { didntwork: [String(e), e], data: { email, password }, body }
    }
  }
  throw createError({
    statusCode: 401,
    message: 'Bad credentials',
  })
})
