import { z } from 'zod'
import { coercedString } from './zod'

export default function getSchema(t: (x: string) => string = (x) => x) {
  return z.object({
    lastname: coercedString.pipe(
      z.string().nonempty({ error: t('validation.nonempty') }),
    ),
    firstname: coercedString.pipe(
      z.string().nonempty({ error: t('validation.nonempty') }),
    ),
    email: z.email({ error: t('validation.email') }),
    phone: coercedString.pipe(
      z.string().nonempty({ error: t('validation.nonempty') }),
    ),
    locales: coercedString
      .refine((locale) => ['en', 'de', 'fr'].includes(locale))
      .array()
      .min(1, { error: t('validation.locales') }),
    from: z.string().url(),
    message: coercedString.pipe(
      z.string().nonempty({ error: t('validation.nonempty') }),
    ),
    checkbox1: z.boolean(),
    checkbox2: z.boolean(),
  })
}
