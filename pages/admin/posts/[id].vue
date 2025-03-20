<script setup lang="ts">
definePageMeta({
  layout: 'admin-layout',
  middleware: ['authenticated'],
})
const route = useRoute()
</script>
<template>Editing the post {{ route.params.id }}</template>
