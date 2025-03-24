<script setup lang="ts">
import * as z from 'zod'
import { createInsertSchema } from 'drizzle-zod'
import { tables } from '../../server/utils/drizzle'

const { postMedia } = defineProps<{
  postMedia?: PostMedia
}>()
defineEmits<{ (e: 'change', post: Partial<Schema>): void }>()

const schema = createInsertSchema(tables.postMedias)

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  pathname: postMedia?.pathname,
  description: postMedia?.description,
})
</script>

<template>
  <UForm
    ref="form"
    :schema="schema"
    :state="state"
    class="flex w-full flex-col gap-4"
    @change="$emit('change', state)"
  >
    <!-- pathname -->
    <UFormField
      :label="$t('tooltips.postMedia.pathname')"
      name="pathname"
      :required="true"
    >
      <UInput type="text" v-model="state.pathname" :ui="{ root: 'flex' }" />
    </UFormField>
    <!-- description -->
    <UFormField
      :label="$t('tooltips.postMedia.description')"
      name="description"
    >
      <UInput type="text" v-model="state.description" :ui="{ root: 'flex' }" />
    </UFormField>
  </UForm>
</template>
