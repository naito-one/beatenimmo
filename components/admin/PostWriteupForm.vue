<script setup lang="ts">
import * as z from 'zod'
import { createInsertSchema } from 'drizzle-zod'
import { tables } from '../../server/utils/drizzle'

const { postWriteup } = defineProps<{
  postWriteup?: PostWriteup
}>()
const emit = defineEmits<{ (e: 'change', post: Partial<Schema>): void }>()

const schema = createInsertSchema(tables.postWriteups)

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  title: postWriteup?.title,
  description: postWriteup?.description,
  price: postWriteup?.price,
  address: postWriteup?.address,
  crushes: postWriteup?.crushes || [],
})

const crushesWorkaround = ref(state.crushes?.join(',') || '')

function onChange() {
  state.crushes = crushesWorkaround.value
    .split(',')
    .map((x) => x.trim())
    .filter((x) => x)
  emit('change', state)
}

/*
const crushSearch = ref('')

const crushItems: Ref<string[]> = ref([...(state.crushes || [])])

function onCreate(item: string) {
  crushItems.value.push(item)

  state.crushes.push(item)
  crushSearch.value = ''
}
  */
</script>

<template>
  <UForm
    ref="form"
    :schema="schema"
    :state="state"
    class="flex w-full flex-col gap-4"
    @change="onChange()"
  >
    <!-- title -->
    <UFormField
      :label="$t('tooltips.postWriteup.title')"
      name="title"
      :required="true"
    >
      <UInput type="text" v-model="state.title" :ui="{ root: 'flex' }" />
    </UFormField>
    <!-- description -->
    <UFormField
      :label="$t('tooltips.postWriteup.description')"
      description="Only visible in search engine results"
      name="description"
      :required="true"
    >
      <UInput type="text" v-model="state.description" :ui="{ root: 'flex' }" />
    </UFormField>
    <!-- price -->
    <UFormField
      :label="$t('tooltips.postWriteup.price')"
      name="price"
      :required="true"
    >
      <UInput type="text" v-model="state.price" :ui="{ root: 'flex' }" />
    </UFormField>
    <!-- address -->
    <UFormField :label="$t('tooltips.postWriteup.address')" name="address">
      <UInput type="text" v-model="state.address" :ui="{ root: 'flex' }" />
    </UFormField>
    <UFormField
      :label="$t('tooltips.postWriteup.crushes')"
      description="Use a comma separated list of values"
      name="crushes"
    >
      <UInput
        type="text"
        v-model="crushesWorkaround"
        placeholder="First,Second one,A third"
        :ui="{ root: 'flex' }"
      />
      <!--
      <USelectMenu
        multiple
        v-model="state.crushes"
        @update:model-value="onUpdate()"
        :items="crushItems"
        v-model:search-term="crushSearch"
        @create="onCreate"
        create-item="always"
        class="w-full"
    />
  --></UFormField
    >
  </UForm>
</template>
