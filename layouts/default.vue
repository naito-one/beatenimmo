<script setup lang="ts">
const config = useSiteConfig()
</script>
<template>
  <main class="flex min-h-[100vh] flex-col bg-neutral-100 pb-32">
    <LanguageSelector></LanguageSelector>
    <AuthState v-slot="{ loggedIn }">
      <div v-if="loggedIn" class="fixed bottom-16 left-6 z-20">
        <UButton
          :to="$localePath('/admin')"
          icon="i-material-symbols-admin-panel-settings"
          >To Admin
        </UButton>
      </div>
    </AuthState>
    <img
      src="/img/logo.svg"
      :alt="config.name"
      class="mx-14 mt-8 w-auto select-none md:mx-auto md:w-xl lg:mt-0"
    />
    <h1 class="text-center font-semibold">{{ config.description }}</h1>
    <slot />
    <NavBar></NavBar>
  </main>
</template>
