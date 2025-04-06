<script setup lang="ts">
import type { PostMedia, PostWriteup } from '~/server/utils/drizzle'
defineProps<{
  media: PostMedia
  postWriteup?: PostWriteup
}>()
defineEmits<{ (e: 'contact'): void }>()
</script>
<template>
  <!-- TODO: handle videos and get content from R2 -->
  <div
    class="relative overflow-hidden rounded-xl border border-neutral-200 bg-white"
  >
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
    <UButton
      @click="$emit('contact')"
      color="secondary"
      size="sm"
      icon="i-material-symbols-perm-phone-msg"
      class="absolute right-4 bottom-4 rounded-full p-4"
    />
  </div>
</template>
