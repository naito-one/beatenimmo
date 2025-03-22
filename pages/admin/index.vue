<script setup lang="ts">
definePageMeta({
  layout: 'admin-layout',
  middleware: ['authenticated'],
})

const { user, clear: clearSession } = useUserSession()
const localePath = useLocalePath()

const { data: posts } = useAsyncData('posts', async () => {
  try {
    const res = await $fetch('/api/posts')
    return res
  } catch (e) {
    console.error(e)
    return null
  }
})

async function logout() {
  await clearSession()
  await navigateTo(localePath('/admin/login'))
}

async function clearAndSeed() {
  await $fetch('/api/seed')
}
</script>

<template>
  <div>
    <h1>Welcome {{ user?.name }}</h1>
    <button @click="logout">Logout</button>

    <UButton @click="clearAndSeed()">Clear & Seed DB</UButton>

    <ul>
      <li v-for="p in posts" :key="p.id">{{ p.slug }}</li>
    </ul>
  </div>
</template>
