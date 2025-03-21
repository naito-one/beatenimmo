<script setup lang="ts">
import superjson from 'superjson'
import type { Post } from '~/server/utils/drizzle'
const { slug } = useRoute().params
const { locale } = useI18n()

const { data: p } = await useAsyncData('post', async () => {
  const post = superjson.parse(await $fetch(`/api/posts/${slug}`) as unknown as string) as Post
  if (post) {
    const postWriteup = await $fetch(
      `/api/posts/${post.id}/postWriteup?locale=${locale.value}`,
    )
    if (postWriteup) {
      const [postMedias, postTexts] = await Promise.all([$fetch(
        `/api/postWriteups/${postWriteup.id}/postMedias`,
      ),$fetch(
        `/api/postWriteups/${postWriteup.id}/postTexts`,
      )])
      if (postMedias && postTexts) {
        return { post, postWriteup, postMedias, postTexts }
      }
    }
  }
})
</script>
<template>
  <div class="p-4">
    <Post :post="p?.post" :post-writeup="p?.postWriteup" :post-medias="p?.postMedias" :post-texts="p?.postTexts"></Post>
  </div>
</template>
