<script setup lang="ts">
defineProps<{
  post: string
}>()

const emit = defineEmits<{ (e: 'close'): void }>()
</script>

<template>
  <UModal
    :close="{ onClick: () => emit('close') }"
    :title="$t('contact.header')"
    :description="$t('contact.header')"
    :ui="{ description: 'hidden' }"
  >
    <template #body>
      <p class="text-center">
        {{ $t('contact.modal.call') }}<br />
        "<span class="font-semibold italic">{{ post }}</span
        >"
      </p>
      <a
        class="font-numbers block w-full py-4 text-center text-xl whitespace-nowrap text-(--ui-secondary) underline"
        href="tel:+41 78 703 00 33"
      >
        <UIcon name="i-material-symbols-call" class="size-5 align-middle" />+41
        78 703 00 33</a
      >
      <p class="my-4 text-center">
        {{ $t('contact.modal.message') }}
      </p>
      <ContactForm
        :default-message="`${$t('contact.modal.defaultMessage')}: ${post}`"
        @success="emit('close')"
      />
    </template>
  </UModal>
</template>
