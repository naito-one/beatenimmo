<script setup lang="ts">
// This page's only purpose is to load all posts based on the relevant mode and redirect to the appropriate post

/*
const config = useSiteConfig()
defineOgImageComponent('NuxtSeo', {
  title: config.name,
  description: config.description,
  theme: '#274770ff',
})
  */

const route = useRoute()
const mode = computed(() =>
  route.name?.toString().startsWith('rent') ? 'Rent' : 'Buy',
)
</script>
<template>Mode: {{ mode }}</template>
