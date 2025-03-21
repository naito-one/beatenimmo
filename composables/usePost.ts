import superjson from 'superjson'

export function usePost(
  slug: string | string[] | undefined,
  locale: 'en' | 'de',
) {
  return useAsyncData('post', async () => {
    const post = superjson.parse(
      (await $fetch(`/api/posts/${slug}`)) as unknown as string,
    ) as Post
    if (post) {
      const postWriteup = await $fetch(
        `/api/posts/${post.id}/postWriteup?locale=${locale}`,
      )
      if (postWriteup) {
        const [postMedias, postTexts] = await Promise.all([
          $fetch(`/api/postWriteups/${postWriteup.id}/postMedias`),
          $fetch(`/api/postWriteups/${postWriteup.id}/postTexts`),
        ])
        if (postMedias && postTexts) {
          return { post, postWriteup, postMedias, postTexts }
        }
      }
    }
  })
}
