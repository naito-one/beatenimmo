<script setup lang="ts">
// This page's only purpose is to load all posts based on the relevant mode and redirect to the appropriate post
definePageMeta({
  middleware: 'index-redirect',
})
// if there is no post, the page will be visible
</script>
<template>
  <div class="flex grow flex-col items-center gap-4 p-4">
    <UAlert
      :title="$t('noPosts.title')"
      :description="$t('noPosts.description')"
      color="secondary"
      class="md:w-2xl"
    />
    <UIcon
      name="i-material-symbols-rocket-launch"
      class="my-auto size-40 bg-(--ui-text-muted)/50"
    />
  </div>
</template>
