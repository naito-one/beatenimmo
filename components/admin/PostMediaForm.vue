<script setup lang="ts">
import * as z from 'zod'
import { createInsertSchema } from 'drizzle-zod'
import { tables } from '../../server/utils/drizzle'
import _debounce from 'lodash/debounce'

const { postMedia } = defineProps<{
  postMedia?: PostMedia
  currentWriteupMedias: PostMedia[]
  allWriteupsMedias: PostMedia[]
}>()
const emit = defineEmits<{ (e: 'change', post: Schema): void }>()

const schema = createInsertSchema(tables.postMedias, {
  pathname: (schema) => schema.trim().min(1),
  description: (schema) => schema.trim(),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  postWriteupId: postMedia?.postWriteupId,
  pathname: postMedia?.pathname,
  description: postMedia?.description,
  order: postMedia?.order,
})

const form = useTemplateRef('form')

async function validate() {
  if (!form.value) {
    return false
  }
  return form.value.validate({ silent: true })
}

const submit = _debounce(async () => {
  setTimeout(async () => {
    const valid = await validate()
    if (valid) {
      emit('change', valid)
    }
  })
}, 100)

function choosePathname(pathname: string) {
  state.pathname = pathname
  submit()
}

defineExpose({ validate })
</script>

<template>
  <UForm ref="form" :schema="schema" :state="state" class="flex flex-col gap-4">
    <!-- pathname -->
    <div class="flex items-center gap-4">
      <div class="w-16" v-if="state.pathname">
        <AdminMediaPreview :pathname="state.pathname" :controls="false" />
      </div>
      <AdminChooseMediaModal
        :current-pathname="state.pathname"
        :current-writeup-medias="currentWriteupMedias"
        :all-writeups-medias="allWriteupsMedias"
        @media="choosePathname"
      />
    </div>
    <!-- description -->
    <UFormField
      :label="$t('tooltips.postMedia.description')"
      name="description"
    >
      <UInput
        type="text"
        v-model="state.description"
        :ui="{ root: 'flex' }"
        @input="submit()"
      />
    </UFormField>
  </UForm>
</template>
