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
}
// if there is no post, the page will be visible
</script>
<template>
  <div class="flex grow flex-col items-center gap-4 p-4">
    <UAlert
      :title="$t('noPosts.title')"
      :description="$t('noPosts.description')"
      color="secondary"
      class="md:w-2xl"
    />
    <UIcon
      name="i-material-symbols-rocket-launch"
      class="my-auto size-40 bg-(--ui-text-muted)/50"
    />
  </div>
</template>
