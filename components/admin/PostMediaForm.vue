<script setup lang="ts">
import * as z from 'zod'
import { createInsertSchema } from 'drizzle-zod'
import { tables } from '../../server/utils/drizzle'
import _debounce from 'lodash/debounce'

const { postMedia } = defineProps<{
  postMedia?: PostMedia
}>()
const emit = defineEmits<{ (e: 'change', post: Partial<Schema>): void }>()

const schema = createInsertSchema(tables.postMedias,{
  pathname: (schema) => schema.trim().min(1),
  description: (schema) => schema.trim()
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  postWriteupId: postMedia?.postWriteupId,
  pathname: postMedia?.pathname,
  description: postMedia?.description,
  order: postMedia?.order,
})

const form = useTemplateRef('form')

const submit = _debounce(async () => {
  setTimeout(async () => {
    if (!form.value) {
      return
    }
    const valid = await form.value.validate({ silent: true, transform: true })
    if (valid) {
      emit('change', valid)
    }
  })
}, 100)
</script>

<template>
  <UForm
    ref="form"
    :schema="schema"
    :state="state"
    class="flex w-full flex-col gap-4"
  >
    <!-- pathname -->
    <UFormField
      :label="$t('tooltips.postMedia.pathname')"
      name="pathname"
      :required="true"
    >
      <UInput type="text" v-model="state.pathname" :ui="{ root: 'flex' }" @input="submit()" />
    </UFormField>
    <!-- description -->
    <UFormField
      :label="$t('tooltips.postMedia.description')"
      name="description"
    >
      <UInput type="text" v-model="state.description" :ui="{ root: 'flex' }" @input="submit()" />
    </UFormField>
  </UForm>
</template>
