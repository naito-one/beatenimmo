<script setup lang="ts">
const config = useSiteConfig()
const { clear: clearSession } = useUserSession()
const localePath = useLocalePath()

async function logout() {
  await clearSession()
  await navigateTo(localePath('/admin/login'))
}
</script>
<template>
  <main class="relative h-0 min-h-[100vh] bg-neutral-100 pt-16">
    <header
      class="fixed top-0 left-0 z-20 flex h-16 w-full items-center gap-4 bg-white p-4 shadow"
    >
      <img src="/img/logo-square.svg" :alt="config.name" class="h-full" />
      <span class="font-semibold">{{ $t('admin.adminPanel', { site: config.name}) }}</span>

      <UButton :to="$localePath('/')" icon="i-material-symbols-web"
        >{{ $t('admin.toWebsite') }}
      </UButton>
      <AuthState v-slot="{ loggedIn, user }">
        <span v-if="loggedIn" class="ml-auto">{{ $t('admin.welcome', { name:  user?.name}) }}</span>
        <UButton v-if="loggedIn" @click="logout">{{ $t('admin.generic.logout') }}</UButton>
      </AuthState>
      <LanguageSelector inline></LanguageSelector>
    </header>
    <slot />
  </main>
</template>
