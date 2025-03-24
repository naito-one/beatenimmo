<script setup lang="ts">
definePageMeta({
  layout: 'admin-layout',
})
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const { loggedIn, fetch: refreshSession } = useUserSession()
const localePath = useLocalePath()

if (loggedIn.value) {
  navigateTo(localePath('/admin'))
}

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
})

type Schema = z.output<typeof schema>

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
        title: 'Success',
        description: 'You have been logged in.',
        color: 'success',
      })
    })
    .catch(() =>
      toast.add({
        title: 'Error',
        description: 'Bad credentials.',
        color: 'error',
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

      <UButton type="submit"> Login </UButton>
    </UForm>
  </div>
</template>
