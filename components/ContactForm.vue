<script setup lang="ts">
import { z } from 'zod'
import getSchema from '~/server/utils/contactSchema'
import type { FormSubmitEvent } from '@nuxt/ui'
const { t, locale } = useI18n()
const url = useRequestURL()

const props = defineProps<{
  defaultMessage?: string
}>()
const emit = defineEmits<{ (e: 'success'): void }>()

const schema = computed(() => getSchema(t))
type Schema = z.output<typeof schema.value>

const state = reactive<Partial<Schema> & { locales: never[] }>({
  lastname: undefined,
  firstname: undefined,
  email: undefined,
  phone: undefined,
  locales: [locale.value] as never[],
  from: url.toString(),
  message: props.defaultMessage,
  checkbox1: false,
  checkbox2: false,
})

const localeItems = [
  { label: t('locales.en'), value: 'en' },
  { label: t('locales.de'), value: 'de' },
  { label: t('locales.fr'), value: 'fr' },
]

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    const warn = await $fetch(`/api/contact`, {
      method: 'post',
      body: event.data,
    })
    toast.add({
      title: warn
        ? t('contact.form.warning.title')
        : t('contact.form.success.title'),
      description: warn || t('contact.form.success.description'),
      color: warn ? 'warning' : 'success',
      icon: warn
        ? 'i-material-symbols-warning-outline'
        : 'i-material-symbols-check-circle-outline',
    })
    if (!warn) {
      state.lastname = undefined
      state.firstname = undefined
      state.email = undefined
      state.phone = undefined
      state.locales = [locale.value] as never[]
      state.message = props.defaultMessage
      state.checkbox1 = false
      state.checkbox2 = false
      emit('success')
    }
  } catch (e) {
    toast.add({
      title: t('contact.form.error.title'),
      description: t('contact.form.error.description'),
      color: 'error',
      icon: 'i-material-symbols-error-outline',
    })
    console.error(e, event.data)
  }
}
</script>
<template>
  <UForm
    :schema="schema"
    :state="state"
    class="grid grid-cols-2 gap-4"
    @submit="onSubmit"
  >
    <!-- lastname -->
    <UFormField
      :label="$t('contact.lastname')"
      name="lastname"
      :required="true"
    >
      <UInput type="text" v-model="state.lastname" :ui="{ root: 'flex' }" />
    </UFormField>
    <!-- firstname -->
    <UFormField
      :label="$t('contact.firstname')"
      name="firstname"
      :required="true"
    >
      <UInput type="text" v-model="state.firstname" :ui="{ root: 'flex' }" />
    </UFormField>
    <!-- email -->
    <UFormField
      :label="$t('contact.email')"
      name="email"
      :required="true"
      class="col-span-2"
    >
      <UInput type="email" v-model="state.email" :ui="{ root: 'flex' }" />
    </UFormField>
    <!-- phone -->
    <UFormField
      :label="$t('contact.phone')"
      :description="$t('contact.phoneHint')"
      name="phone"
      :required="true"
      class="col-span-2"
    >
      <UInput type="tel" v-model="state.phone" :ui="{ root: 'flex' }" />
    </UFormField>
    <!-- locales -->
    <UFormField
      :label="$t('contact.locales')"
      name="locales"
      class="col-span-2"
    >
      <USelect
        v-model="state.locales"
        multiple
        :items="localeItems"
        class="w-full"
      />
    </UFormField>
    <!-- message -->
    <UFormField
      :label="$t('contact.message')"
      name="message"
      :required="true"
      class="col-span-2"
    >
      <UTextarea
        type="text"
        v-model="state.message"
        :maxrows="20"
        autoresize
        :ui="{ root: 'flex' }"
      />
    </UFormField>
    <!-- from -->
    <UFormField name="from" :required="true" hidden>
      <UInput type="text" v-model="state.from" />
    </UFormField>
    <p class="col-span-2 text-(--ui-text-muted) italic">
      {{ $t('contact.spam') }}
    </p>
    <!-- checkbox1 -->
    <UCheckbox
      :label="$t('contact.checkbox1')"
      name="checkbox1"
      v-model="state.checkbox1"
      class="col-span-2"
    />
    <!-- checkbox2 -->
    <UCheckbox
      :label="$t('contact.checkbox2')"
      name="checkbox2"
      v-model="state.checkbox2"
      class="col-span-2"
    />
    <UButton
      type="submit"
      color="secondary"
      class="col-span-2"
      icon="i-material-symbols-outgoing-mail"
      :ui="{ base: 'justify-center' }"
    >
      {{ $t('contact.submit') }}
    </UButton>
  </UForm>
</template>
