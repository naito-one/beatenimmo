<script setup lang="ts">
import { useWindowSize } from 'vue-window-size'
import type {
  Post,
  PostMedia,
  PostText,
  PostWriteup,
} from '~/server/utils/drizzle'

const props = defineProps<{
  post?: Post
  postWriteup?: PostWriteup
  postMedias?: PostMedia[]
  postTexts?: PostText[]
}>()

const { width } = useWindowSize()

const vailStartTrigger = useTemplateRef('vail-start-trigger')
const vailEndTrigger = useTemplateRef('vail-end-trigger')
const scroller = useTemplateRef('scroller')

const showVailStart = ref(false)
const showVailEnd = ref(true)
const scrollMargin = 4 - 32
const canScroll = ref(true)

const orderedContent: Ref<
  (
    | { type: 'media'; content: PostMedia }
    | { type: 'text'; content: PostText }
  )[]
> = computed(() => {
  const medias = (props.postMedias ?? []).map((x) => ({
    type: 'media' as 'media',
    content: x,
  }))
  const texts = (props.postTexts ?? []).map((x) => ({
    type: 'text' as 'text',
    content: x,
  }))

  return [...medias, ...texts].sort((a, b) => a.content.order - b.content.order)
})
const firstContent = computed(() => orderedContent.value[0])
const restOfContent = computed(() => orderedContent.value.slice(1))

// don't show the vail if the scrolling amount is very small (prevent flickering)
watch(width, () => {
  if (!scroller.value) {
    canScroll.value = false
    return
  }
  const howMuchWider =
    scroller.value.scrollWidth -
    (scroller.value.parentElement?.clientWidth ?? 0)
  canScroll.value = howMuchWider > scrollMargin
})

onMounted(() => {
  if (vailStartTrigger.value && vailEndTrigger.value) {
    const startObserver = new IntersectionObserver((entries) => {
      showVailStart.value = !(entries[0]?.isIntersecting ?? true)
    })
    const endObserver = new IntersectionObserver((entries) => {
      showVailEnd.value = !(entries[0]?.isIntersecting ?? false)
    })

    startObserver.observe(vailStartTrigger.value)
    endObserver.observe(vailEndTrigger.value)
  }
})
</script>
<template>
  <article class="flex flex-col gap-4">
    <!-- title -->
    <h2 v-if="postWriteup" class="font-bold">{{ postWriteup.title }}</h2>
    <USkeleton v-else class="h-4 w-[250px] bg-zinc-300" />

    <span v-if="post && !post.visible">Post is invisible to normal users</span>

    <!-- always show first element before key points-->
    <template v-if="firstContent">
      <PostMedia
        v-if="firstContent.type === 'media'"
        :media="firstContent.content"
        :post-writeup="postWriteup"
      ></PostMedia>
      <PostText v-else :text="firstContent.content"></PostText>
    </template>

    <!-- skeleton for a media -->
    <USkeleton
      v-if="!postMedias"
      class="h-0 w-full rounded-xl bg-zinc-300 pb-[100%]"
    />

    <!-- key points -->
    <div
      v-if="post && postWriteup"
      class="font-numbers relative rounded-xl border border-zinc-200 bg-white p-4 pt-3 shadow"
    >
      <!-- vail start -->
      <div
        :class="`${showVailStart && canScroll ? 'opacity-100' : 'opacity-0'} pointer-events-none absolute top-0 left-0 z-10 h-10 w-16 rounded-tl-xl bg-gradient-to-l from-transparent to-white transition-opacity duration-75`"
      ></div>
      <!-- vail end -->
      <div
        :class="`${showVailEnd && canScroll ? 'opacity-100' : 'opacity-0'} pointer-events-none absolute top-0 right-0 z-10 h-10 w-16 rounded-tr-xl bg-gradient-to-r from-transparent to-white transition-opacity duration-75`"
      ></div>
      <!-- horizontal scroller -->
      <div
        ref="scroller"
        class="flex overflow-x-auto border-b border-zinc-200 pb-2"
      >
        <span ref="vail-start-trigger" class="w-px shrink-0"></span>
        <!--<UTooltip :text="$t('tooltips.postWriteup.price')">-->
        <div
          tabindex="0"
          :title="$t('tooltips.postWriteup.price')"
          class="flex h-8 shrink-0 items-center gap-1 border-r border-zinc-200 px-2 first-of-type:pl-0 last-of-type:border-none last-of-type:pr-0"
        >
          <UIcon name="i-material-symbols-payments" />{{ postWriteup.price }}
        </div>
        <div
          tabindex="0"
          :title="$t('tooltips.post.numRooms')"
          v-if="post.numRooms"
          class="flex h-8 shrink-0 items-center gap-1 border-r border-zinc-200 px-2 first-of-type:pl-0 last-of-type:border-none last-of-type:pr-0"
        >
          <UIcon name="i-material-symbols-meeting-room" />{{ post.numRooms }}
        </div>
        <div
          tabindex="0"
          :title="$t('tooltips.post.numFloors')"
          v-if="post.numFloors"
          class="flex h-8 shrink-0 items-center gap-1 border-r border-zinc-200 px-2 first-of-type:pl-0 last-of-type:border-none last-of-type:pr-0"
        >
          <UIcon name="i-material-symbols-floor" />{{ post.numFloors }}
        </div>
        <div
          tabindex="0"
          :title="$t('tooltips.post.terrainArea')"
          v-if="post.terrainArea"
          class="flex h-8 shrink-0 items-center gap-1 border-r border-zinc-200 px-2 first-of-type:pl-0 last-of-type:border-none last-of-type:pr-0"
        >
          <UIcon name="i-material-symbols-outdoor-garden" />{{
            post.terrainArea
          }}
          m²
        </div>
        <div
          tabindex="0"
          :title="$t('tooltips.post.livingArea')"
          v-if="post.livingArea"
          class="flex h-8 shrink-0 items-center gap-1 border-r border-zinc-200 px-2 first-of-type:pl-0 last-of-type:border-none last-of-type:pr-0"
        >
          <UIcon name="i-material-symbols-gite" />{{ post.livingArea }} m²
        </div>
        <div
          tabindex="0"
          :title="$t('tooltips.post.livingVolume')"
          v-if="post.livingVolume"
          class="flex h-8 shrink-0 items-center gap-1 border-r border-zinc-200 px-2 first-of-type:pl-0 last-of-type:border-none last-of-type:pr-0"
        >
          <UIcon name="i-material-symbols-deployed-code" />{{ post.livingVolume }}
          m³
        </div>
        <span ref="vail-end-trigger" class="w-px shrink-0"></span>
      </div>

      <div
        tabindex="0"
        :title="$t('tooltips.postWriteup.address')"
        v-if="postWriteup.address"
        class="relative flex items-center gap-1 border-b border-zinc-200 py-4 last:border-none last:pb-0"
      >
        <UIcon name="i-material-symbols-location-on" />{{ postWriteup.address }}
      </div>
      <div
        tabindex="0"
        :title="$t('tooltips.postWriteup.crushes')"
        v-if="postWriteup.crushes && postWriteup.crushes.length"
        class="relative flex items-center gap-1 border-b border-zinc-200 py-4 last:border-none last:pb-0"
      >
        <UIcon name="i-material-symbols-favorite" />{{
          postWriteup.crushes.join(', ')
        }}
      </div>
    </div>
    <USkeleton v-else class="h-0 w-full rounded-xl bg-zinc-300 pb-56" />

    <!-- show the rest of the elements -->
    <template v-if="restOfContent.length" v-for="c in restOfContent">
      <PostMedia
        v-if="c.type === 'media'"
        :media="c.content"
        :post-writeup="postWriteup"
      ></PostMedia>
      <PostText v-else :text="c.content"></PostText>
    </template>

    <!-- skeleton for a text -->
    <USkeleton
      v-if="!postTexts"
      class="h-0 w-full rounded-xl bg-zinc-300 pb-[120%]"
    />
  </article>
</template>
