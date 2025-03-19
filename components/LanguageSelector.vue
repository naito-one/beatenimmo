<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value)
})
</script>
<template>
  <div class="absolute top-8 right-4">
    <NuxtLink
      v-for="locale in availableLocales"
      :key="locale.code"
      :to="switchLocalePath(locale.code)"
      class="flex size-12 items-center justify-center rounded-full bg-white shadow-md"
    >
      <UIcon :name="`i-circle-flags-${locale.code}`" />
    </NuxtLink>
  </div>
</template>
