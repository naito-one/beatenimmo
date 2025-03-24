<script setup lang="ts">
import * as z from 'zod'
import { createInsertSchema } from 'drizzle-zod'
import { tables } from '../../server/utils/drizzle'
import _debounce from 'lodash/debounce'

const { postWriteup } = defineProps<{
  postWriteup?: PostWriteup
}>()
const emit = defineEmits<{ (e: 'change', post: Partial<Schema>): void }>()

const schema = createInsertSchema(tables.postWriteups,{
  title: (schema) => schema.trim().min(1),
  description: (schema) => schema.trim().min(1),
  price: (schema) => schema.trim().min(1),
  address: (schema) => schema.trim(),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema> & { crushes: string[]}>({
  postId: postWriteup?.postId,
  locale: postWriteup?.locale,
  title: postWriteup?.title,
  description: postWriteup?.description,
  price: postWriteup?.price,
  address: postWriteup?.address,
  crushes: postWriteup?.crushes || [],
})

const crushSearch = ref('')
const crushItems: Ref<string[]> = ref([...(state.crushes || [])])

function onCreate(item: string) {
  const v = item.trim()
  // ignore empty strings
  if (v) {
    crushItems.value.push(v)
    state.crushes.push(v)
  }
  crushSearch.value = ''
}

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
    <!-- title -->
    <UFormField
      :label="$t('tooltips.postWriteup.title')"
      name="title"
      :required="true"
    >
      <UInput type="text" v-model="state.title" :ui="{ root: 'flex' }" @input="submit()" />
    </UFormField>
    <!-- description -->
    <UFormField
      :label="$t('tooltips.postWriteup.description')"
      description="Only visible in search engine results"
      name="description"
      :required="true"
    >
      <UInput type="text" v-model="state.description" :ui="{ root: 'flex' }" @input="submit()" />
    </UFormField>
    <!-- price -->
    <UFormField
      :label="$t('tooltips.postWriteup.price')"
      name="price"
      :required="true"
    >
      <UInput type="text" v-model="state.price" :ui="{ root: 'flex' }" @input="submit()" />
    </UFormField>
    <!-- address -->
    <UFormField :label="$t('tooltips.postWriteup.address')" name="address">
      <UInput type="text" v-model="state.address" :ui="{ root: 'flex' }" @input="submit()" />
    </UFormField>
    <UFormField
      :label="$t('tooltips.postWriteup.crushes')"
      name="crushes"
    >
      <USelectMenu
        multiple
        v-model="state.crushes"
        :items="crushItems"
        v-model:search-term="crushSearch"
        @create="onCreate"
        create-item="always"
        class="w-full"
        @update:model-value="submit()"
    />
    </UFormField>
  </UForm>
</template>
