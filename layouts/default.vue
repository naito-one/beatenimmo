<script setup lang="ts">
const config = useSiteConfig()
</script>
<template>
  <main class="flex min-h-[100vh] flex-col bg-neutral-100 pb-14 lg:pb-12">
    <LanguageSelector></LanguageSelector>
    <AuthState v-slot="{ loggedIn }">
      <div
        v-if="loggedIn"
        class="fixed bottom-[4.5rem] left-6 z-20 lg:bottom-16"
      >
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
    <h1 class="text-center font-semibold sm:-mt-4 md:mb-4">
      {{ config.description }}
    </h1>
    <slot />
    <NavBar></NavBar>
  </main>
</template>
