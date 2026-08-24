/**
 * If no post is found using the route's slug param, redirect to about
 *
 * This is meant as a useful fallback for broken search engine results (posts that have since been removed)
 *
 * Meant to be used on /posts/[slug]
 */
export default defineNuxtRouteMiddleware(async (to) => {
  const localePath = useLocalePath()
  const { $i18n } = useNuxtApp()

  const slug = ref(to.params['slug'])
  let hasPost = false
  try {
    hasPost = !!(await usePost(slug, $i18n.locale.value))
  } catch (e) {}

  if (!hasPost) {
    return navigateTo(localePath('/about'))
  }
})
