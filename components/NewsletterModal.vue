<script setup lang="ts">
import { NEWSLETTER_FLAG, type AvailableLocales } from '~/consts'
const persist = usePersist()

const newsletters: Record<AvailableLocales, string> = {
  en: '/newsletter.en.html',
  de: '/newsletter.de.html',
}

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
        class="h-100 w-full sm:h-85"
        :src="newsletters[$i18n.locale]"
        frameborder="0"
      ></iframe>
    </template>
  </UModal>
</template>
