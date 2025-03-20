<script setup lang="ts">
definePageMeta({
  layout: 'admin-layout',
  middleware: ['authenticated'],
})

const { user, clear: clearSession } = useUserSession()
const localePath = useLocalePath()

const { data: posts } = useAsyncData('posts', async () => {
  try {
    console.log('running async data')
    const res = await $fetch('/api/posts')
    console.log(res)
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
</script>

<template>
  <div>
    <h1>Welcome {{ user?.name }}</h1>
    <button @click="logout">Logout</button>

    <ul>
      <li v-for="p in posts" :key="p.id">{{ p }}</li>
    </ul>
  </div>
</template>
