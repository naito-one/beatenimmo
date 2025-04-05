import { z } from 'zod'

export default z.object({
  lastname: z.string().nonempty(),
  firstname: z.string().nonempty(),
  email: z.string().nonempty().email(),
  phone: z.string().nonempty(),
  locales: z
    .string()
    .refine((locale) => ['en', 'de', 'fr'].includes(locale))
    .array()
    .min(1, 'Select at least one'),
  from: z.string().url(),
  message: z.string(),
  checkbox1: z.boolean(),
  checkbox2: z.boolean(),
})
