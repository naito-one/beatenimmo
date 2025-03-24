<script setup lang="ts">
import superjson from 'superjson'

const { slug } = useRoute().params
const { locale } = useI18n()
const localePath = useLocalePath()

const { data: p } = await usePost(slug, locale.value)
const allPosts: Ref<Post[]> = ref([])
const currentPostIndex = ref(-1)
// TODO: sorting from query
const sorting: Ref<Sorting> = ref('top')

// TODO: redirect to 404 or index if p is nullish
if (!p.value) {
  navigateTo(localePath('/404'))
} else {
  const type = p.value.post.type

  const { data } = await useFetch(
    `/api/posts?type=${type}&sorting=${sorting}`,
    {
      transform(res) {
        return superjson.parse(res as unknown as string) as Post[]
      },
    },
  )
  allPosts.value = data.value || []
  currentPostIndex.value = allPosts.value.findIndex(
    (x) => x.id === p.value?.post.id,
  )
}
</script>
<template>
  <Sorting :value="sorting" @change="sorting = $event"></Sorting>
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
    class="fixed bottom-14 left-0 flex w-full items-center justify-center gap-4 bg-gradient-to-b from-transparent to-neutral-100/80 py-4"
  >
    <ul class="flex items-center justify-center gap-1">
      <li v-for="post in allPosts" :key="post.id">
        <NuxtLinkLocale
          :to="`/posts/${post.slug}`"
          class="block size-2 rounded-full bg-neutral-800 transition-transform hover:scale-150"
          exact-active-class="size-4 mx-1 hover:scale-none"
        ></NuxtLinkLocale>
      </li>
    </ul>
    <span class="font-numbers text-sm font-semibold text-gray-800"
      >{{ currentPostIndex + 1 }}/{{ allPosts.length }}</span
    >
  </nav>
</template>
