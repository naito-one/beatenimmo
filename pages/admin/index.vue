<script setup lang="ts">
import { AdminAddPostModal } from '#components'

definePageMeta({
  layout: 'admin-layout',
  middleware: ['authenticated'],
})

const toast = useToast()
const overlay = useOverlay()

const localePath = useLocalePath()

async function clear() {
  await $fetch('/api/admin/clear')
}

async function seed() {
  await $fetch('/api/admin/seed')
}

const table = useTemplateRef('table')
const modal = overlay.create(AdminAddPostModal)

async function addPost(slug: false | string) {
  if (!slug || !table.value) {
    return
  }
  const added: Partial<Post> = {
    slug,
    type: 'buy',
    visible: false,
    relativeValue: 0,
    createdAt: new Date(),
    order: table.value.posts.length + 1,
  }

  try {
    await $fetch(`/api/posts`, { method: 'post', body: added })
    toast.add({ title: 'New Post created' })
    await navigateTo(localePath(`/admin/posts/${slug}`))
  } catch (e) {
    console.error(e)
    toast.add({ title: 'Failed to create Post', color: 'error' })
  }
}
</script>

<template>
  <div class="flex flex-col items-center gap-4 p-4">
    <div class="w-3/4 rounded-xl border border-neutral-200 bg-white p-4">
      <h2 class="mb-2 text-xl font-semibold">Debug actions</h2>
      <UButtonGroup>
        <UButton @click="clear()" color="secondary">Clear DB</UButton>
        <UButton @click="seed()" color="secondary"> Seed DB</UButton>
      </UButtonGroup>
    </div>

    <div class="w-3/4 rounded-xl border border-neutral-200 bg-white p-4">
      <h2 class="mb-2 text-xl font-semibold">Posts</h2>
      <AdminPostTable ref="table"></AdminPostTable>
      <UButton
        icon="i-material-symbols-post-add"
        color="secondary"
        class="mx-auto mt-4 flex"
        @click="modal.open().then(addPost)"
        >Add Post</UButton
      >
    </div>
  </div>
</template>
