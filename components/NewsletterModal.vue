<script setup lang="ts">
import { NEWSLETTER_FLAG } from '~/consts'
const persist = usePersist()

const emit = defineEmits<{ (e: 'close'): void }>()
</script>

<template>
  <UModal
    @after:leave="persist.setFlag(NEWSLETTER_FLAG)"
    :title="$t('newsletter.modal.header')"
    :description="$t('newsletter.modal.header')"
    :ui="{
      description: 'hidden',
      body: 'bg-blue-800',
      header: 'hidden',
    }"
  >
    <template #body>
      <iframe
        class="h-100 sm:h-85 w-full"
        :src="
          $i18n.locale === 'en' ? '/newsletter.en.html' : '/newsletter.de.html'
        "
        frameborder="0"
      ></iframe>
    </template>
  </UModal>
</template>
