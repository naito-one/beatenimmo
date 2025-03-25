<script setup lang="ts">
import * as z from 'zod'
import { createInsertSchema } from 'drizzle-zod'
import { tables } from '../../server/utils/drizzle'
import _debounce from 'lodash/debounce'

const { post } = defineProps<{
  post?: Post
}>()
const emit = defineEmits<{ (e: 'change', post: Schema): void }>()

const schema = createInsertSchema(tables.posts)

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  slug: post?.slug,
  type: post?.type,
  visible: post?.visible,
  relativeValue: post?.relativeValue,
  numRooms: post?.numRooms,
  numFloors: post?.numFloors,
  terrainArea: post?.terrainArea,
  livingArea: post?.livingArea,
  livingVolume: post?.livingVolume,
  createdAt: post?.createdAt,
  order: post?.order,
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

defineExpose({ validate })
</script>

<template>
  <UForm
    ref="form"
    :schema="schema"
    :state="state"
    class="grid grid-cols-3 gap-4"
  >
    <!-- slug -->
    <UFormField :label="$t('tooltips.post.slug')" name="slug" :required="true">
      <UInput
        type="text"
        v-model="state.slug"
        :ui="{ root: 'flex' }"
        @input="submit()"
        disabled
      />
    </UFormField>
    <!-- type -->
    <UFormField :label="$t('tooltips.post.type')" name="type" :required="true">
      <USelect
        v-model="state.type"
        :items="['buy', 'rent']"
        :ui="{ base: 'w-full' }"
        @input="submit()"
      />
    </UFormField>
    <!-- visible -->
    <UFormField :label="$t('tooltips.post.visible')" name="visible">
      <USwitch
        v-model="state.visible"
        :ui="{ root: 'flex' }"
        @input="submit()"
      />
    </UFormField>
    <!-- relativeValue -->
    <UFormField
      :label="$t('tooltips.post.relativeValue')"
      name="relativeValue"
      :required="true"
    >
      <UInputNumber
        v-model="state.relativeValue"
        :min="0"
        :step="0.01"
        @change="submit()"
        class="font-numbers flex"
      />
    </UFormField>
    <!-- numRooms -->
    <UFormField :label="$t('tooltips.post.numRooms')" name="numRooms">
      <UInputNumber
        v-model="state.numRooms"
        :min="0"
        :step="0.5"
        @change="submit()"
        class="font-numbers flex"
      />
    </UFormField>
    <!-- numFloors -->
    <UFormField :label="$t('tooltips.post.numFloors')" name="numFloors">
      <UInputNumber
        v-model="state.numFloors"
        :min="0"
        :step="0.5"
        @change="submit()"
        class="font-numbers flex"
      />
    </UFormField>
    <!-- terrainArea -->
    <UFormField :label="$t('tooltips.post.terrainArea')" name="terrainArea">
      <UInputNumber
        v-model="state.terrainArea"
        :min="0"
        :step="1"
        @change="submit()"
        class="font-numbers flex"
      />
    </UFormField>
    <!-- livingArea -->
    <UFormField :label="$t('tooltips.post.livingArea')" name="livingArea">
      <UInputNumber
        v-model="state.livingArea"
        :min="0"
        :step="1"
        @change="submit()"
        class="font-numbers flex"
      />
    </UFormField>
    <!-- livingVolume -->
    <UFormField :label="$t('tooltips.post.livingVolume')" name="livingVolume">
      <UInputNumber
        v-model="state.livingVolume"
        :min="0"
        :step="1"
        @change="submit()"
        class="font-numbers flex"
      />
    </UFormField>
  </UForm>
</template>
