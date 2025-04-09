<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui'
import type { BlobObject } from '@nuxthub/core'

const props = defineProps<{
  currentPathname?: string
  currentWriteupMedias: PostMedia[]
  allWriteupsMedias: PostMedia[]
}>()

const toast = useToast()

const open = ref(false)
const tab = ref('other')

const allMedias: Ref<BlobObject[]> = ref([])

const unused: Ref<BlobObject[]> = ref([])
const usedInCurrent: Ref<BlobObject[]> = ref([])
const usedInOther: Ref<BlobObject[]> = ref([])
const usedElsewhere: Ref<BlobObject[]> = ref([])

const items: AccordionItem[] = [
  {
    label: 'Used in current post writeup',
    value: 'current',
    icon: 'i-material-symbols-table-eye',
  },
  {
    label: 'Used in another writeup of this post',
    value: 'other',
    icon: 'i-material-symbols-backup-table',
  },
  {
    label: 'Used elsewhere on the website or unused',
    value: 'elsewhere',
    icon: 'i-material-symbols-database',
  },
]

function computeCategories(allMedias: BlobObject[]) {
  const otherWriteupsMedias = props.allWriteupsMedias.filter(
    (x) => !props.currentWriteupMedias.includes(x),
  )

  const currentPathnames = new Set(
    props.currentWriteupMedias.map((x) => x.pathname),
  )
  const othersPathnames = new Set(otherWriteupsMedias.map((x) => x.pathname))

  unused.value = []
  usedInCurrent.value = []
  usedInOther.value = []
  usedElsewhere.value = []

  for (const media of allMedias) {
    const count = parseInt(media.customMetadata.count || '')
    if (false && !count) {
      // TODO: cannot work since count is server side and doesn't know about pending local changes
      unused.value.push(media)
    } else if (currentPathnames.has(media.pathname)) {
      usedInCurrent.value.push(media)
    } else if (othersPathnames.has(media.pathname)) {
      usedInOther.value.push(media)
    } else {
      usedElsewhere.value.push(media)
    }
  }

  // try to show medias used in another writeup. if there are none, instead show "elsewhere"
  if (!usedInOther.value.length && usedElsewhere.value.length) {
    tab.value = 'elsewhere'
  }
}

watch(open, async () => {
  if (!allMedias.value.length) {
    allMedias.value = await $fetch(`/api/media`, {
      method: 'get',
    })
  }

  computeCategories(allMedias.value)
})

const form = useTemplateRef('form')

const uploading = ref(false)

async function uploadImage() {
  if (uploading.value || !form.value) {
    return
  }
  uploading.value = true

  try {
    const newMedia = (await $fetch('/api/media', {
      method: 'post',
      body: new FormData(form.value),
    })) as BlobObject
    allMedias.value.push(newMedia)
    computeCategories(allMedias.value)
    tab.value = 'elsewhere'

    setTimeout(() => {
      if (form.value) {
        form.value.reset()
      }
    })
  } catch (e) {
    toast.add({
      title: 'Error',
      description: 'Could not upload media: ' + e.data?.message,
      color: 'error',
    })
    console.error(e)
  } finally {
    uploading.value = false
  }
}

const emit = defineEmits<{ (e: 'media', pathname: string): void }>()

function chooseMedia(pathname: string) {
  open.value = false
  emit('media', pathname)
}
</script>

<template>
  <UModal
    v-model:open="open"
    title="Choose Media File"
    description="Choose Media File"
    :ui="{ content: 'max-w-5/6', description: 'hidden' }"
  >
    <UButton>{{ currentPathname ? 'Replace Media' : 'Choose Media' }}</UButton>
    <template #body>
      <h2 class="mb-2 font-bold">Upload new media</h2>
      <form
        @submit.prevent="uploadImage"
        class="mb-4 flex items-end gap-4"
        ref="form"
      >
        <UInput type="file" name="file" required :disabled="uploading" />
        <UButton
          type="submit"
          icon="i-material-symbols-upload-file"
          :loading="uploading"
          >Upload</UButton
        >
      </form>

      <h2 class="font-bold">Select existing media</h2>
      <UAccordion :items="items" v-model:model-value="tab">
        <template #body="{ item }">
          <ul class="grid grid-cols-8 gap-2">
            <li
              v-for="media in item.value === 'current'
                ? usedInCurrent
                : item.value === 'other'
                  ? usedInOther
                  : usedElsewhere"
              :key="media.pathname"
              @click="chooseMedia(media.pathname)"
            >
              <AdminMediaPreview
                :pathname="media.pathname"
                :class="`border-4 ${media.pathname === currentPathname ? 'border-(--ui-secondary)' : 'border-neutral-200 transition-all hover:border-neutral-400 hover:shadow-lg'}`"
              />
            </li>
            <li class="col-span-8 hidden first:block">
              There are currently no media in this list
            </li>
          </ul>
        </template>
      </UAccordion>
    </template>
  </UModal>
</template>
