<script setup lang="ts">
import type { PostText } from '~/server/utils/drizzle'

defineProps<{
  text: PostText
}>()
</script>
<template>
  <div class="rounded-xl border border-neutral-200 bg-white px-4 py-6 shadow">
    <h3 class="mb-4 text-xl font-semibold">{{ text.title }}</h3>
    <p class="whitespace-pre-line">{{ text.content }}</p>
  </div>
</template>
