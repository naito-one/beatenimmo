import { db } from '@nuxthub/db'
export { sql, eq, and, or, asc, desc } from 'drizzle-orm'

import * as schema from '../db/schema'

export const tables = schema

export function useDrizzle() {
  return db
}

export type Post = typeof schema.posts.$inferSelect
export type PostWriteup = typeof schema.postWriteups.$inferSelect
export type PostMedia = typeof schema.postMedias.$inferSelect
export type PostText = typeof schema.postTexts.$inferSelect
