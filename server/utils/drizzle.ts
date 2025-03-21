import { drizzle } from 'drizzle-orm/d1'
export { sql, eq, and, or } from 'drizzle-orm'

import * as schema from '../database/schema'

export const tables = schema

export function useDrizzle() {
  return drizzle(hubDatabase(), { schema })
}

export type Post = typeof schema.posts.$inferSelect
export type PostWriteup = typeof schema.postWriteups.$inferSelect
export type PostMedia = typeof schema.postMedias.$inferSelect
export type PostText = typeof schema.postTexts.$inferSelect
