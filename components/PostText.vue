<script setup lang="ts">
import type { PostText } from '~/server/utils/drizzle'

defineProps<{
  text: PostText
}>()
</script>
<template>
  <div class="rounded-xl border border-gray-200 bg-white px-4 py-6 shadow">
    <h3 class="mb-4 text-xl font-medium">{{ text.title }}</h3>
    <p>{{ text.content }}</p>
  </div>
</template>
