<script setup lang="ts">
import superjson from 'superjson'
// This page's only purpose is to load all posts based on the relevant mode and redirect to the appropriate post

/*
const config = useSiteConfig()
defineOgImageComponent('NuxtSeo', {
  title: config.name,
  description: config.description,
  theme: '#274770ff',
})
  */

const localePath = useLocalePath()
const route = useRoute()
const type = computed(() =>
  route.name?.toString().startsWith('rent') ? 'rent' : 'buy',
)

const sorting = useSorting()

const { data: post } = await useFetch(
  `/api/posts?type=${type.value}&sorting=${sorting.value}&limit=1`,
  {
    transform(res) {
      return superjson.parse(res as unknown as string) as Post[]
    },
  },
)

if (post?.value?.[0]) {
  await navigateTo(
    localePath(`/posts/${post.value[0].slug}?sorting=${sorting.value}`),
  )
} else {
  // TODO: handle case when there are no posts
  console.log('There are no posts of type', type.value)
}
</script>
<template></template>
