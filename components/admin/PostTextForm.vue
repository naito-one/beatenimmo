<script setup lang="ts">
import * as z from 'zod'
import { createInsertSchema } from 'drizzle-zod'
import { tables } from '../../server/utils/drizzle'

const { postText } = defineProps<{
  postText?: PostText
}>()
defineEmits<{ (e: 'change', post: Partial<Schema>): void }>()

const schema = createInsertSchema(tables.postTexts)

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  title: postText?.title,
  content: postText?.content,
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
    <!-- title -->
    <UFormField
      :label="$t('tooltips.postText.title')"
      name="title"
      :required="true"
    >
      <UInput type="text" v-model="state.title" :ui="{ root: 'flex' }" />
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
      />
    </UFormField>
  </UForm>
</template>
