<script setup lang="ts">
import superjson from 'superjson'
// import { useWindowSize } from 'vue-window-size'
// import _debounce from 'lodash/debounce'

const route = useRoute()
const { locale } = useI18n()
const localePath = useLocalePath()
// const { width } = useWindowSize()
// const router = useRouter()

const slug = ref(route.params['slug'])
const { data: p /*, clear: clearP*/ } = await usePost(slug, locale.value)
const allPosts: Ref<Post[]> = ref([])
const currentPostIndex = ref(-1)

const sorting = useSorting()
// const ratio = ref(0)
// const scroller = useTemplateRef('scroller')
// const clientSide = ref(false)

// TODO: redirect to 404 or index if p is nullish
if (!p.value) {
  navigateTo(localePath('/404'))
} else {
  const type = p.value.post.type

  const { data } = await useFetch(
    `/api/posts?type=${type}&sorting=${sorting.value}`,
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

  /*
  onMounted(async () => {
    clientSide.value = true
    setTimeout(() => {
      if (!scroller.value) {
        return
      }
      ratio.value = scroller.value.scrollWidth / allPosts.value.length
      watch(width, () => {
        if (scroller.value) {
          ratio.value = scroller.value.scrollWidth / allPosts.value.length
        }
      })
      scrollToCurrent('instant')
    })
    // TODO get the previous and next post details for quick swipe navigation
  })
    */
}

watch(sorting, async () => {
  if (!p.value) {
    return
  }
  const type = p.value.post.type
  const data = superjson.parse(
    (await $fetch(
      `/api/posts?type=${type}&sorting=${sorting.value}`,
    )) as unknown as string,
  ) as Post[]
  allPosts.value = data || []
  currentPostIndex.value = allPosts.value.findIndex(
    (x) => x.id === p.value?.post.id,
  )
  console.log({ sort: currentPostIndex.value })
})

/*
const snapScroll = _debounce(() => {
  if (!scroller.value || !allPosts.value) {
    return
  }
  const old = currentPostIndex.value
  const round = Math.round(scroller.value.scrollLeft / ratio.value)
  if (old === round) {
    return
  }
  clearP()
  currentPostIndex.value = round
  // slug.value = allPosts.value[currentPostIndex.value]!.slug
  // replace URL without vue navigation, since we handle that
  //history.pushState({}, '', localePath(`/posts/${slug.value}`))
  router.push(
    localePath(`/posts/${allPosts.value[currentPostIndex.value]!.slug}`),
  )
}, 300)

function scrollToCurrent(behavior: 'smooth' | 'instant' = 'smooth') {
  if (!scroller.value) {
    return
  }
  scroller.value.scrollTo({
    left: currentPostIndex.value * ratio.value,
    behavior,
  })
  router
}
*/
</script>
<template>
  <Sorting v-if="allPosts.length > 1"></Sorting>
  <Pagination
    v-if="allPosts.length > 1"
    :current="currentPostIndex"
    :total="allPosts.length"
    :previous="allPosts[currentPostIndex - 1]?.slug"
    :next="allPosts[currentPostIndex + 1]?.slug"
  />
  <!-- scroller -->
  <!--
  TODO: polish scroller
  <div
    ref="scroller"
    @touchend.passive="snapScroll()"
    class="slider flex w-full overflow-x-auto"
  >
    <div
      v-if="!clientSide"
      class="slide w-screen shrink-0 p-4"
      :key="p?.post.id"
    >
      <Post
        :post="p?.post"
        :post-writeup="p?.postWriteup"
        :post-medias="p?.postMedias"
        :post-texts="p?.postTexts"
      ></Post>
    </div>
    <div
      v-else
      class="slide w-screen shrink-0 p-4"
      v-for="(post, index) in allPosts"
      :key="post.id"
    >
      <Post
        :post="post"
        :post-writeup="index === currentPostIndex ? p?.postWriteup : undefined"
        :post-medias="index === currentPostIndex ? p?.postMedias : undefined"
        :post-texts="index === currentPostIndex ? p?.postTexts : undefined"
      ></Post>
    </div>
  </div>
    -->

  <div class="mx-auto w-full p-4 md:w-2xl mt-2 md:mt-4">
    <Post
      :post="p?.post"
      :post-writeup="p?.postWriteup"
      :post-medias="p?.postMedias"
      :post-texts="p?.postTexts"
    ></Post>
  </div>
</template>
