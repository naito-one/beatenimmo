<script setup lang="ts">
import type { PostMedia, PostWriteup } from '~/server/utils/drizzle'
defineProps<{
  media: PostMedia
  postWriteup?: PostWriteup
}>()
</script>
<template>
  <div class="overflow-hidden rounded-xl border border-neutral-200 bg-white">
    <p v-if="media.description?.trim()" class="p-4 font-bold">
      {{ media.description }}
    </p>
    <div
      class="relative h-0 bg-cover bg-center pb-[100%] md:pb-[75%]"
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
        class="absolute h-full w-full object-cover object-center"
        :key="media.pathname"
      >
        <source :src="`/media/${media.pathname}`" />
      </video>
    </div>
  </div>
</template>
