<script setup lang="ts">
import * as z from 'zod'
import { createInsertSchema } from 'drizzle-zod'
import { tables } from '../../server/utils/drizzle'
import _debounce from 'lodash/debounce'

const { postWriteup } = defineProps<{
  postWriteup?: PostWriteup
}>()
const emit = defineEmits<{ (e: 'change', post: Schema): void }>()

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
    class="flex w-full flex-col gap-4"
  >
    <!-- title -->
    <UFormField
      :label="$t('tooltips.postWriteup.title')"
      name="title"
      :required="true"
    >
      <UInput type="text" v-model="state.title" @input="submit()"  class="flex" />
    </UFormField>
    <!-- description -->
    <UFormField
      :label="$t('tooltips.postWriteup.description')"
      description="Only visible in search engine results"
      name="description"
      :required="true"
    >
      <UInput type="text" v-model="state.description" @input="submit()" class="flex" />
    </UFormField>
    <!-- price -->
    <UFormField
      :label="$t('tooltips.postWriteup.price')"
      name="price"
      :required="true"
    >
      <UInput type="text" v-model="state.price" @input="submit()" class="flex font-numbers" />
    </UFormField>
    <!-- address -->
    <UFormField :label="$t('tooltips.postWriteup.address')" name="address">
      <UInput type="text" v-model="state.address" @input="submit()"  class="flex font-numbers" />
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
        class="w-full font-numbers"
        @update:model-value="submit()"
    />
    </UFormField>
  </UForm>
</template>
