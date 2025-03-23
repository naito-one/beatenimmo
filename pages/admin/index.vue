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

async function clear() {
  await $fetch('/api/clear')
}

async function seed() {
  await $fetch('/api/seed')
}
</script>

<template>
  <div>
    <h1>Welcome {{ user?.name }}</h1>
    <UButton @click="logout">Logout</UButton>
    <UButton @click="clear()">Clear DB</UButton>
    <UButton @click="seed()"> Seed DB</UButton>
  </div>
</template>
