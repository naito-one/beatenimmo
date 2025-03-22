<script setup lang="ts">
definePageMeta({
  layout: 'admin-layout',
  middleware: ['authenticated'],
})

const { user, clear: clearSession } = useUserSession()
const localePath = useLocalePath()

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
  </div>
</template>
