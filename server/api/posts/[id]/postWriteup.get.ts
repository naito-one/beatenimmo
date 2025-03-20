export default eventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const { locale } = getQuery(event)

  const checkedLocale =
    locale && ['en', 'de'].includes(locale.toString())
      ? (locale.toString() as PostWriteup['locale'])
      : undefined

  const postWriteups = await useDrizzle()
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
    .limit(1)

  if (!postWriteups.length) {
    throw createError({
      statusCode: 404,
      message: 'Not Found',
    })
  }

  return postWriteups[0]
})
