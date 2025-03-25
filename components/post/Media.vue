<script setup lang="ts">
import type { PostMedia, PostWriteup } from '~/server/utils/drizzle'

defineProps<{
  media: PostMedia
  postWriteup?: PostWriteup
}>()
</script>
<template>
  <!-- TODO: handle videos and get content from R2 -->
  <div class="overflow-hidden rounded-xl border border-neutral-200 bg-white">
    <p v-if="media.description?.trim()" class="p-4 font-bold">
      {{ media.description }}
    </p>
    <div
      class="h-0 bg-cover pb-[100%]"
      :style="`background-image: url(${media.pathname})`"
      :aria-label="
        media.description?.trim() ||
        postWriteup?.description ||
        $t('defaultAlt')
      "
      aria-roledescription="img"
    ></div>
  </div>
</template>
