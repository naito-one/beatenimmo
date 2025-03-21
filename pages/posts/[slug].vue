<script setup lang="ts">
import superjson from 'superjson'

const { slug } = useRoute().params
const { locale } = useI18n()

const { data: p } = await usePost(slug, locale.value)
const allPosts: Ref<Post[]> = ref([])
const currentPostIndex = ref(-1)

// TODO: redirect to 404 or index if p is nullish
if (!p.value) {
  navigateTo(localePath('/404'))
} else {
  const type = p.value.post.type
  const sorting: Sorting = 'top'

  // once on the client, load every other post
  onMounted(async () => {
    allPosts.value = superjson.parse(
      (await $fetch(
        `/api/posts?type=${type}&sorting=${sorting}`,
      )) as unknown as string,
    ) as Post[]
    currentPostIndex.value = allPosts.value.findIndex(
      (x) => x.id === p.value?.post.id,
    )
  })
}
</script>
<template>
  <div class="p-4">
    <Post
      :post="p?.post"
      :post-writeup="p?.postWriteup"
      :post-medias="p?.postMedias"
      :post-texts="p?.postTexts"
    ></Post>
  </div>

  <!-- list -->
  <nav
    v-if="allPosts.length"
    class="fixed bottom-14 left-0 w-full bg-gradient-to-b from-transparent to-zinc-100/80 py-4"
  >
    <ul class="flex items-center justify-center gap-1">
      <li v-for="post in allPosts" :key="post.id">
        <NuxtLinkLocale
          :to="`/posts/${post.slug}`"
          class="block size-2 rounded-full bg-zinc-800"
          exact-active-class="size-4 mx-1"
        ></NuxtLinkLocale>
      </li>
    </ul>
  </nav>
</template>
