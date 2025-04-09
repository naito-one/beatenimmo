<script setup lang="ts">
import { useWindowSize } from 'vue-window-size'
import type {
  Post,
  PostMedia,
  PostText,
  PostWriteup,
} from '~/server/utils/drizzle'
import ContactModal from './ContactModal.vue'

const props = defineProps<{
  post?: Post
  postWriteup?: PostWriteup
  postMedias?: PostMedia[]
  postTexts?: PostText[]
  hideHints?: boolean
}>()

const { width } = useWindowSize()
const overlay = useOverlay()

const modal = overlay.create(ContactModal)

function onContact() {
  modal.open({ post: props.postWriteup?.title })
}

const vailStartTrigger = useTemplateRef('vail-start-trigger')
const vailEndTrigger = useTemplateRef('vail-end-trigger')
const scroller = useTemplateRef('scroller')

const showVailStart = ref(false)
const showVailEnd = ref(true)
const scrollMargin = 4 - 32
const canScroll = ref(true)
const hasSwiped = ref(false)
const hasTapped = ref(false)

const orderedContent: Ref<Content[]> = computed(() => {
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
    <h2 v-if="postWriteup" class="leading-none font-bold text-xl mb-2">
      {{ postWriteup.title }}
    </h2>
    <USkeleton v-else class="h-4 w-[250px] bg-neutral-300" />

    <UAlert
      v-if="post && !post.visible"
      icon="i-material-symbols-visibility-off-outline"
      title="Post is invisible to normal users"
    />

    <!-- always show first element before key points-->
    <template v-if="firstContent">
      <PostMedia
        v-if="firstContent.type === 'media'"
        :media="firstContent.content"
        :post-writeup="postWriteup"
        @contact="onContact"
      ></PostMedia>
      <PostText
        v-else
        :text="firstContent.content"
        @contact="onContact"
      ></PostText>
    </template>

    <!-- skeleton for a media -->
    <USkeleton
      v-if="!postMedias"
      class="h-0 w-full rounded-xl bg-neutral-300 pb-[100%] md:pb-[75%]"
    />

    <!-- key points -->
    <div
      v-if="post && postWriteup"
      @click="hasTapped = true"
      class="font-numbers relative rounded-xl border border-neutral-200 bg-white p-4 pt-3 leading-none"
    >
      <!-- vail start -->
      <div
        :class="`${showVailStart && canScroll ? 'opacity-100' : 'opacity-0'} pointer-events-none absolute top-0 left-0 z-10 h-10 w-16 rounded-tl-xl bg-gradient-to-l from-transparent to-white transition-opacity duration-75`"
      ></div>
      <!-- vail end -->
      <div
        :class="`${showVailEnd && canScroll ? 'opacity-100' : 'opacity-0'} pointer-events-none absolute top-0 right-0 z-10 h-10 w-16 rounded-tr-xl bg-gradient-to-r from-transparent to-white transition-opacity duration-75`"
      ></div>
      <!-- swipe gesture hint -->
      <UIcon
        name="i-mdi-gesture-swipe"
        class="pointer-events-none absolute top-0 right-4 z-10 h-12 animate-[swipe_2s_ease-out_infinite] text-2xl text-neutral-700/80"
        v-if="showVailEnd && canScroll && !hasSwiped && !hideHints"
      />
      <div></div>
      <!-- horizontal scroller -->
      <div
        ref="scroller"
        @scroll="hasSwiped = true"
        class="flex overflow-x-auto border-b border-neutral-200 pb-2"
      >
        <span ref="vail-start-trigger" class="w-px shrink-0"></span>
        <div
          tabindex="0"
          :title="$t('tooltips.postWriteup.price')"
          class="flex h-8 shrink-0 items-center gap-1 border-r border-neutral-200 px-2 first-of-type:pl-0 last-of-type:border-none last-of-type:pr-0"
        >
          <UIcon name="i-material-symbols-payments" />{{ postWriteup.price }}
        </div>
        <div
          tabindex="0"
          :title="$t('tooltips.post.numRooms')"
          v-if="post.numRooms"
          class="flex h-8 shrink-0 items-center gap-1 border-r border-neutral-200 px-2 first-of-type:pl-0 last-of-type:border-none last-of-type:pr-0"
        >
          <UIcon name="i-material-symbols-meeting-room" />{{ post.numRooms }}
        </div>
        <div
          tabindex="0"
          :title="$t('tooltips.post.numFloors')"
          v-if="post.numFloors"
          class="flex h-8 shrink-0 items-center gap-1 border-r border-neutral-200 px-2 first-of-type:pl-0 last-of-type:border-none last-of-type:pr-0"
        >
          <UIcon name="i-material-symbols-floor" />{{ post.numFloors }}
        </div>
        <div
          tabindex="0"
          :title="$t('tooltips.post.terrainArea')"
          v-if="post.terrainArea"
          class="flex h-8 shrink-0 items-center gap-1 border-r border-neutral-200 px-2 first-of-type:pl-0 last-of-type:border-none last-of-type:pr-0"
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
          class="flex h-8 shrink-0 items-center gap-1 border-r border-neutral-200 px-2 first-of-type:pl-0 last-of-type:border-none last-of-type:pr-0"
        >
          <UIcon name="i-material-symbols-gite" />{{ post.livingArea }} m²
        </div>
        <div
          tabindex="0"
          :title="$t('tooltips.post.livingVolume')"
          v-if="post.livingVolume"
          class="flex h-8 shrink-0 items-center gap-1 border-r border-neutral-200 px-2 first-of-type:pl-0 last-of-type:border-none last-of-type:pr-0"
        >
          <UIcon name="i-material-symbols-deployed-code" />{{
            post.livingVolume
          }}
          m³
        </div>
        <span ref="vail-end-trigger" class="w-px shrink-0"></span>
      </div>

      <!-- tap gesture hint -->
      <!--
        <UIcon
        name="i-mdi-gesture-tap"
        class="pointer-events-none absolute top-[4.5rem] left-10 z-10 animate-bounce text-3xl text-neutral-700/80 opacity-90"
        v-if="!hasTapped && !hideHints"
        />
        -->
      <div
        tabindex="0"
        :title="$t('tooltips.postWriteup.address')"
        v-if="postWriteup.address?.trim()"
        class="relative flex items-center gap-2 border-b border-neutral-200 py-4 last:border-none last:pb-0"
      >
        <UIcon name="i-material-symbols-location-on" class="shrink-0" />{{
          postWriteup.address
        }}
      </div>
      <div
        tabindex="0"
        :title="$t('tooltips.postWriteup.crushes')"
        v-if="postWriteup.crushes && postWriteup.crushes.length"
        class="relative flex items-center gap-2 border-b border-neutral-200 py-4 last:border-none last:pb-0"
      >
        <UIcon name="i-material-symbols-favorite" class="shrink-0" />{{
          postWriteup.crushes.join(', ')
        }}
      </div>
    </div>
    <USkeleton v-else class="h-0 w-full rounded-xl bg-neutral-300 pb-56" />

    <!-- show the rest of the elements -->
    <template v-if="restOfContent.length" v-for="c in restOfContent">
      <PostMedia
        v-if="c.type === 'media'"
        :media="c.content"
        :post-writeup="postWriteup"
        @contact="onContact"
      ></PostMedia>
      <PostText v-else :text="c.content" @contact="onContact"></PostText>
    </template>

    <!-- skeleton for a text -->
    <USkeleton
      v-if="!postTexts"
      class="h-0 w-full rounded-xl bg-neutral-300 pb-[120%] md:pb-[50%]"
    />
  </article>
</template>
