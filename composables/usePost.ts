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
      const postWriteups = await $fetch(
        `/api/posts/${post.id}/postWriteups?locale=${locale}`,
      )
      if (postWriteups[0]) {
        const [postMedias, postTexts] = await Promise.all([
          $fetch(`/api/postWriteups/${postWriteups[0].id}/postMedias`),
          $fetch(`/api/postWriteups/${postWriteups[0].id}/postTexts`),
        ])
        if (postMedias && postTexts) {
          return { post, postWriteup: postWriteups[0], postMedias, postTexts }
        }
      }
    }
  })
}
