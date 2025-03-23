<script setup lang="ts">
const config = useSiteConfig()
</script>
<template>
  <main class="flex min-h-[100vh] flex-col bg-neutral-100 pb-24">
    <LanguageSelector></LanguageSelector>
    <img
      src="/img/logo.svg"
      :alt="config.name"
      class="mx-14 mt-8 w-auto select-none"
    />
    <h1 class="text-center font-semibold">{{ config.description }}</h1>
    <slot />
    <NavBar></NavBar>
  </main>
</template>
