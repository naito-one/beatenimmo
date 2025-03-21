import { sqliteTable as table } from 'drizzle-orm/sqlite-core'
import * as t from 'drizzle-orm/sqlite-core'

export const posts = table('posts', {
  id: t.int().primaryKey({ autoIncrement: true }),
  slug: t.text().notNull(),
  type: t.text().$type<'buy' | 'rent'>().notNull(),
  visible: t.int({ mode: 'boolean' }).notNull(),
  relativeValue: t.real().notNull(),
  numRooms: t.real(),
  numFloors: t.real(),
  terrainArea: t.int(),
  livingArea: t.int(),
  livingVolume: t.int(),
  createdAt: t.int({ mode: 'timestamp' }).notNull(),
  order: t.int().notNull(),
})

export const postWriteups = table('postWriteups', {
  id: t.int().primaryKey({ autoIncrement: true }),
  postId: t
    .int()
    .references(() => posts.id, { onDelete: 'cascade' })
    .notNull(),
  locale: t.text().$type<'en' | 'de'>().notNull(),
  title: t.text().notNull(),
  description: t.text(),
  price: t.text().notNull(),
  address: t.text(),
  crushes: t.text({ mode: 'json' }).$type<string[]>().default([]),
})

export const postMedias = table('postMedias', {
  id: t.int().primaryKey({ autoIncrement: true }),
  postWriteupId: t
    .int()
    .references(() => postWriteups.id, { onDelete: 'cascade' })
    .notNull(),
  pathname: t.text().notNull(),
  description: t.text(),
  order: t.int().notNull(),
})

export const postTexts = table('postTexts', {
  id: t.int().primaryKey({ autoIncrement: true }),
  postWriteupId: t
    .int()
    .references(() => postWriteups.id, { onDelete: 'cascade' })
    .notNull(),
  title: t.text().notNull(),
  content: t.text().notNull(),
  order: t.int().notNull(),
})