<script setup lang="ts">
import type { PostText } from '~/server/utils/drizzle'
defineProps<{
  text: PostText
  banner?: { text: string; class: string } | null
}>()
</script>
<template>
  <div
    class="relative overflow-hidden rounded-xl border border-neutral-200 bg-white px-4 py-6"
  >
    <h3 class="mb-4 text-xl font-semibold">{{ text.title }}</h3>
    <p class="break-words whitespace-pre-line">
      {{ text.content }}
    </p>
    <div
      :class="
        banner.class +
        ' absolute right-20 bottom-10 w-full translate-x-1/2 -rotate-45 p-4 text-center text-lg font-bold text-(--ui-bg) shadow-md'
      "
      v-if="banner"
    >
      {{ banner.text }}
    </div>
  </div>
</template>
