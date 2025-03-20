<script setup lang="ts">
const { slug } = useRoute().params
const { locale } = useI18n()

const { data: post } = await useAsyncData('post', async () => {
  const post = await $fetch(`/api/posts/${slug}`)
  if (post) {
    const postWriting = await $fetch(
      `/api/posts/${post.id}/postWriteup?locale=${locale.value}`,
    )
    if (postWriting) {
      const postMedias = await $fetch(
        `/api/postWriteups/${postWriting.id}/postMedias`,
      )
      if (postMedias) {
        return { post, postWriting, postMedias }
      }
    }
  }
})
</script>
<template>
  I am the post
  {{ slug }}
  <div v-if="!post">No Post</div>
  <div v-else>
    {{ post }}
  </div>
</template>
