<script setup lang="ts">
import * as z from 'zod'
import { createInsertSchema } from 'drizzle-zod'
import { tables } from '../../server/utils/drizzle'

const { post } = defineProps<{
  post?: Post
}>()
defineEmits<{ (e: 'change', post: Schema): void }>()

const schema = createInsertSchema(tables.posts)

type Schema = z.output<typeof schema>

const fields: FormFields<Post>[] = [
  {
    accessor: 'slug',
    label: 'tooltips.post.slug',
    type: 'text',
    required: true,
  },
  {
    accessor: 'type',
    label: 'tooltips.post.type',
    type: 'select',
    required: true,
    items: ['buy', 'rent'],
  },
  {
    accessor: 'visible',
    label: 'tooltips.post.visible',
    type: 'checkbox',
  },
  {
    accessor: 'relativeValue',
    label: 'tooltips.post.relativeValue',
    type: 'number',
    min: 0,
    step: 0.01,
    required: true,
  },
  {
    accessor: 'numRooms',
    label: 'tooltips.post.numRooms',
    type: 'number',
    min: 0,
    step: 0.5,
  },
  {
    accessor: 'numFloors',
    label: 'tooltips.post.numFloors',
    type: 'number',
    min: 0,
    step: 0.5,
  },
  {
    accessor: 'terrainArea',
    label: 'tooltips.post.terrainArea',
    type: 'number',
    min: 0,
    step: 1,
  },
  {
    accessor: 'livingArea',
    label: 'tooltips.post.livingArea',
    type: 'number',
    min: 0,
    step: 1,
  },
  {
    accessor: 'livingVolume',
    label: 'tooltips.post.livingVolume',
    type: 'number',
    min: 0,
    step: 1,
  },
]

const s = {} as any
fields.forEach((f) => (s[f.accessor] = post?.[f.accessor]))
const state = reactive<Schema>(s)
</script>

<template>
  <UForm
    :schema="schema"
    :state="state"
    class="flex w-full flex-col gap-4"
    @change="$emit('change', state)"
  >
    <UFormField
      v-for="f in fields"
      :label="$t(f.label)"
      :name="f.accessor"
      :required="f.required"
    >
      <USwitch
        v-if="f.type === 'checkbox'"
        v-model="state[f.accessor] as any"
        :ui="{ root: 'flex' }"
      />
      <UInputNumber
        v-else-if="f.type === 'number'"
        v-model="state[f.accessor] as any"
        :min="f.min"
        :max="f.max"
        :step="f.step"
        :ui="{ root: 'flex' }"
      />
      <USelect
        v-else-if="f.type === 'select'"
        v-model="state[f.accessor] as any"
        :items="f.items"
        :ui="{ base: 'w-full' }"
      />
      <UInput
        v-else
        :type="f.type"
        v-model="state[f.accessor] as any"
        :ui="{ root: 'flex' }"
      />
    </UFormField>
  </UForm>
</template>
