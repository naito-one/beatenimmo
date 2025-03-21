import superjson from 'superjson'

export default eventHandler(async (event) => {
  const { type, sorting, limit } = getQuery(event)

  const checkedType =
    type && ['buy', 'rent'].includes(type.toString())
      ? (type.toString() as Post['type'])
      : undefined

  const checkedSorting =
    sorting && ['latest', 'top', 'cheapest'].includes(sorting.toString())
      ? (sorting.toString() as Sorting)
      : undefined

  const checkedLimit =
    limit && !isNaN(Number(limit)) && Number(limit) > 0
      ? Math.floor(Number(limit))
      : undefined

  const session = await getUserSession(event)
  const isLoggedIn = Boolean(session.user)

  const query = useDrizzle()
    .select()
    .from(tables.posts)
    .where(
      and(
        // logged in users can see invisible posts
        isLoggedIn ? undefined : eq(tables.posts.visible, true),
        checkedType ? eq(tables.posts.type, checkedType) : undefined,
      ),
    )
    .orderBy(
      checkedSorting === 'cheapest'
        ? asc(tables.posts.relativeValue)
        : checkedSorting === 'latest'
          ? desc(tables.posts.createdAt)
          : asc(tables.posts.order),
    )
  const posts = await (checkedLimit ? query.limit(checkedLimit) : query.all())

  return superjson.stringify(posts) as unknown as typeof posts
})
