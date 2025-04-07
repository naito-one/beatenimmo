<script setup lang="ts">
import type { PostMedia, PostWriteup } from '~/server/utils/drizzle'
defineProps<{
  media: PostMedia
  postWriteup?: PostWriteup
}>()
const isVideo = ref(false)
defineEmits<{ (e: 'contact'): void }>()
</script>
<template>
  <div
    class="relative overflow-hidden rounded-xl border border-neutral-200 bg-white"
  >
    <p v-if="media.description?.trim()" class="p-4 font-bold">
      {{ media.description }}
    </p>
    <div
      class="relative h-0 bg-cover pb-[100%]"
      :style="`background-image: url(/media/${media.pathname})`"
      :aria-label="
        media.description?.trim() ||
        postWriteup?.description ||
        $t('defaultAlt')
      "
      aria-roledescription="img"
    >
      <video
        autoplay
        muted
        loop
        :class="`absolute h-full w-full object-cover transition-opacity duration-500 ${isVideo ? 'opacity-100' : 'opacity-0'}`"
        :key="media.pathname"
        @loadeddata="isVideo = true"
      >
        <source :src="`/media/${media.pathname}`" />
      </video>
    </div>
    <UButton
      @click="$emit('contact')"
      color="secondary"
      size="sm"
      icon="i-material-symbols-perm-phone-msg"
      class="absolute right-4 bottom-4 rounded-full p-4"
    />
  </div>
</template>
