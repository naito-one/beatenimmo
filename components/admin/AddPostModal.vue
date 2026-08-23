<script setup lang="ts">
import z from 'zod'
import _debounce from 'lodash/debounce'
const { t } = useI18n()

const schema = computed(() =>
  z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/g, {
      error: t('admin.validation.slug'),
    }),
)

const error: Ref<string | undefined> = ref(undefined)
const slug: Ref<string | undefined> = ref(undefined)
const suffix = '-' + useSlugSuffix()
const output: Ref<string | undefined> = ref(undefined)

const emit = defineEmits<{ (e: 'close', slug: false | string): void }>()

const validate = _debounce(() => {
  setTimeout(() => {
    const val = slug.value?.toLowerCase().trim().replace(' ', '-')
    const res = schema.value.safeParse(val + suffix)
    if (!res.success) {
      output.value = undefined
      error.value = JSON.parse(res.error.message)[0].message
    } else {
      output.value = res.data
      error.value = undefined
    }
    slug.value = val
  })
}, 300)
</script>

<template>
  <UModal
    :close="{ onClick: () => emit('close', false) }"
    :title="t('admin.addPost.action')"
    :description="t('admin.addPost.action')"
    :ui="{ footer: 'justify-end', description: 'hidden' }"
  >
    <template #body>
      <!-- slug -->
      <UFormField
        :label="$t('tooltips.post.slug')"
        name="slug"
        :required="true"
        :error="error"
      >
        <UInput
          type="text"
          v-model="slug"
          :ui="{
            root: 'w-full',
            base: 'pr-[50px]',
            trailing: 'pointer-events-none',
          }"
          @input="validate()"
        >
          <template #trailing>
            <p class="text-sm text-(--ui-text-muted)">{{ suffix }}</p>
          </template>
        </UInput>
      </UFormField>
    </template>
    <template #footer>
      <div class="flex gap-2">
        <UButton
          color="neutral"
          :label="t('admin.generic.cancel')"
          @click="emit('close', false)"
        />
        <UButton
          :label="t('admin.generic.confirm')"
          :disabled="!output"
          @click="emit('close', output as string)"
        />
      </div>
    </template>
  </UModal>
</template>
