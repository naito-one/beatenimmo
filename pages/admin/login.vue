<script setup lang="ts">
definePageMeta({
  layout: 'admin-layout',
})
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const { loggedIn, fetch: refreshSession } = useUserSession()
const localePath = useLocalePath()
const { t } = useI18n()

if (loggedIn.value) {
  await navigateTo(localePath('/admin'))
}

const schema = computed(() =>
  z.object({
    email: z.string().email(t('admin.validation.email')),
    password: z.string().min(8, t('admin.validation.password')),
  }),
)

type Schema = z.output<typeof schema.value>

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  $fetch('/api/login', {
    method: 'POST',
    body: state,
  })
    .then(async () => {
      // Refresh the session on client-side and redirect to the home page
      await refreshSession()
      await navigateTo(localePath('/admin'))
      toast.add({
        title: t('admin.login.logged.title'),
        description: t('admin.login.logged.description'),
        color: 'success',
        icon: 'i-material-symbols-check-circle-outline',
      })
    })
    .catch(() =>
      toast.add({
        title: t('admin.login.error.title'),
        description: t('admin.login.error.description'),
        color: 'error',
        icon: 'i-material-symbols-error-outline',
      }),
    )
}
</script>

<template>
  <div class="flex h-full w-full justify-center p-4">
    <UForm
      :schema="schema"
      :state="state"
      class="mt-12 space-y-4"
      @submit="onSubmit"
    >
      <UFormField label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormField>

      <UFormField label="Password" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormField>

      <UButton type="submit">{{ t('admin.login.action') }}</UButton>
    </UForm>
  </div>
</template>
