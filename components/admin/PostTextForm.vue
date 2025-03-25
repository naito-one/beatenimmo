<script setup lang="ts">
import * as z from 'zod'
import { createInsertSchema } from 'drizzle-zod'
import { tables } from '../../server/utils/drizzle'
import _debounce from 'lodash/debounce'

const { postText } = defineProps<{
  postText?: PostText
}>()
const emit = defineEmits<{ (e: 'change', post: Schema): void }>()

const schema = createInsertSchema(tables.postTexts, {
  title: (schema) => schema.trim().min(1),
  content: (schema) => schema.trim().min(1),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  postWriteupId: postText?.postWriteupId,
  title: postText?.title,
  content: postText?.content,
  order: postText?.order,
})

const form = useTemplateRef('form')

async function validate() {
  if (!form.value) {
    return false;
  }
  return form.value.validate({ silent: true, transform: true })
}

const submit = _debounce(async () => {
  setTimeout(async () => {
    const valid = await validate()
    if (valid) {
      emit('change', valid)
    }
  })
}, 100)

defineExpose({ validate })
</script>

<template>
  <UForm
    ref="form"
    :schema="schema"
    :state="state"
    class="flex flex-col gap-4"
  >
    <!-- title -->
    <UFormField
      :label="$t('tooltips.postText.title')"
      name="title"
      :required="true"
    >
      <UInput
        type="text"
        v-model="state.title"
        :ui="{ root: 'flex' }"
        @input="submit()"
      />
    </UFormField>
    <!-- content -->
    <UFormField
      :label="$t('tooltips.postText.content')"
      name="content"
      :required="true"
    >
      <UTextarea
        type="text"
        v-model="state.content"
        :maxrows="20"
        autoresize
        :ui="{ root: 'flex' }"
        @input="submit()"
      />
    </UFormField>
  </UForm>
</template>
