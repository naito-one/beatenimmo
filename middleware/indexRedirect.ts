import superjson from 'superjson'

/**
 * Redirect to the default post if one exists, taking into account the type and sorting
 *
 * Meant to be used on index
 */
export default defineNuxtRouteMiddleware(async (to) => {
  const localePath = useLocalePath()
  const type = computed(() =>
    to.name?.toString().startsWith('rent') ? 'rent' : 'buy',
  )

  const s = to.query.sorting
  const sorting =
    s && ['latest', 'top', 'cheapest'].includes(s.toString())
      ? (s.toString() as Sorting)
      : 'top'

  const { data: post } = await useFetch(
    `/api/posts?type=${type.value}&sorting=${sorting}&limit=1`,
    {
      transform(res) {
        return superjson.parse(res as unknown as string) as Post[]
      },
    },
  )

  if (post?.value?.[0]) {
    return navigateTo(
      localePath(`/posts/${post.value[0].slug}?sorting=${sorting}`),
    )
  }
})
