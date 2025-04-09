<script setup lang="ts">
defineProps<{
  current: number
  total: number
  previous?: string
  next?: string
}>()
const sorting = useSorting()
</script>
<template>
  <nav class="sticky top-0 z-10 flex w-full items-center justify-center pt-4">
    <UButtonGroup class="overflow-hidden rounded-3xl shadow-md">
      <UButton
        :to="`/posts/${previous}?sorting=${sorting}`"
        :disabled="!previous"
        icon="i-material-symbols-arrow-back-ios-new"
        color="secondary"
      />
      <UBadge
        class="font-numbers min-w-16 justify-center text-sm font-semibold"
        color="secondary"
        >{{ current + 1 }}/{{ total }}</UBadge
      >
      <UButton
        :to="`/posts/${next}?sorting=${sorting}`"
        :disabled="!next"
        icon="i-material-symbols-arrow-forward-ios"
        color="secondary"
      />
    </UButtonGroup>
  </nav>
</template>
