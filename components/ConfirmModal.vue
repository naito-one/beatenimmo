<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()

const emit = defineEmits<{ (e: 'close', slug: boolean): void }>()
</script>

<template>
  <UModal
    :close="{ onClick: () => emit('close', false) }"
    :title="title"
    :description="title"
    :ui="{ footer: 'justify-end', description: 'hidden' }"
  >
    <template #body>
      {{ description }}
    </template>
    <template #footer>
      <div class="flex gap-2">
        <UButton color="neutral" label="Cancel" @click="emit('close', false)" />
        <UButton label="Confirm" @click="emit('close', true)" />
      </div>
    </template>
  </UModal>
</template>
