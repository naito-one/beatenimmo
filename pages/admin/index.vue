<script setup lang="ts">
import superjson from 'superjson'

definePageMeta({
  layout: 'admin-layout',
  middleware: ['authenticated'],
})

async function clear() {
  await $fetch('/api/admin/clear')
}

async function seed() {
  await $fetch('/api/admin/seed')
}

const posts: Ref<Post[]> = ref([])

const { data } = await useFetch('/api/posts?sorting=latest', {
  transform(res) {
    return superjson.parse(res as unknown as string) as Post[]
  },
})
posts.value = data.value || []
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <h2 class="text-xl font-semibold">Debug actions</h2>
    <UButtonGroup>
      <UButton class="cursor-pointer" @click="clear()">Clear DB</UButton>
      <UButton class="cursor-pointer" @click="seed()"> Seed DB</UButton>
    </UButtonGroup>

    <h2 class="text-xl font-semibold">Posts</h2>
    <AdminPostTable></AdminPostTable>
  </div>
</template>
