import { z } from 'zod'

export const coercedString = z.preprocess(
  (arg: string | number | null | undefined) => {
    if (arg === null || arg === undefined) {
      return ''
    }

    if (typeof arg === 'string') {
      return arg.trim()
    }
    if (typeof arg === 'number') {
      return arg.toString()
    }

    return ''
  },
  z.string(),
)
