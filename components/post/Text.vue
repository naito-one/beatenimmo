<script setup lang="ts">
import type { PostText } from '~/server/utils/drizzle'
defineProps<{
  text: PostText
}>()
defineEmits<{ (e: 'contact'): void }>()
</script>
<template>
  <div class="rounded-xl border border-neutral-200 bg-white px-4 py-6">
    <h3 class="mb-4 text-xl font-semibold">{{ text.title }}</h3>
    <div class="flex">
      <p class="w-full break-words whitespace-pre-line">
        <span class="shape-outside float-right ml-2 flex h-full items-end">
          <UButton
            @click="$emit('contact')"
            color="secondary"
            size="sm"
            icon="i-material-symbols-perm-phone-msg"
            class="rounded-full p-4"
          />
        </span>
        {{ text.content }}
        <!-- FIXME: sometimes one line can overflow below the containing p -->
        <!-- reference: https://css-tricks.com/float-an-element-to-the-bottom-corner/-->
      </p>
    </div>
  </div>
</template>
