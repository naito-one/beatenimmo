import { db } from '@nuxthub/db'
import { type AvailableLocales, normalizedLocales } from '~/consts'

export default eventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const { locale } = getQuery(event)

  const checkedLocale =
    locale && normalizedLocales.includes(locale.toString() as any)
      ? (locale.toString() as AvailableLocales)
      : undefined

  const postWriteups = await db
    .select()
    .from(tables.postWriteups)
    .where(
      and(
        eq(tables.postWriteups.postId, Number(id)),
        checkedLocale
          ? eq(tables.postWriteups.locale, checkedLocale)
          : undefined,
      ),
    )

  return postWriteups
})
