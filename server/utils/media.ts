import { db } from '@nuxthub/db'
import { count } from 'drizzle-orm'

/**
 * Compute how many times a media pathname is used
 */
export async function computeUsage(pathname: string) {
  const res = await db
    .select({ value: count() })
    .from(tables.postMedias)
    .where(eq(tables.postMedias.pathname, pathname))
    .get()

  return res?.value || 0
}
