<script setup lang="ts">
import superjson from 'superjson'
import AdminPostForm from '@/components/admin/PostForm.vue'
import AdminPostMediaForm from '@/components/admin/PostMediaForm.vue'
import AdminPostTextForm from '@/components/admin/PostTextForm.vue'
import AdminPostWriteupForm from '@/components/admin/PostWriteupForm.vue'
import { normalizedLocales, type AvailableLocales } from '~/consts'

definePageMeta({
  layout: 'admin-layout',
  middleware: ['authenticated', 'broken-post-redirect'],
})

type EditablePostWriteup = Editable<Optional<PostWriteup, 'id'>>
type EditablePostMedia = Editable<Optional<PostMedia, 'id'>>
type EditablePostText = Editable<Optional<PostText, 'id'>>

type EditableContent = Content<EditablePostMedia, EditablePostText>

const { slug } = useRoute().params
const { locale, t } = useI18n()
const toast = useToast()

const publishing = ref(false)

// guaranteed to exist with middleware
const { data: post } = await useFetch(`/api/posts/${slug}`, {
  method: 'get',
  transform(res) {
    return superjson.parse(res as unknown as string) as Post
  },
})

const postWriteups: Ref<EditablePostWriteup[]> = ref([])
const postMedias: Ref<Map<PostWriteup['id'], EditablePostMedia[]>> = ref(
  new Map(),
)
const postTexts: Ref<Map<PostWriteup['id'], EditablePostText[]>> = ref(
  new Map(),
)

/**
 * Reference to the current value of the USelect Create Writeup.
 *
 * Used to reset to empty after a choice is made
 */
const createWriteup: Ref<AvailableLocales | undefined> = ref(undefined)
/**
 * Writeups that can still be created
 */
const availableWriteups = computed(
  () =>
    normalizedLocales
      .filter(
        (l) =>
          !postWriteups.value
            .filter((x) => !x._deleted)
            .some((p) => p.locale === l),
      )
      .map((l) => ({ label: t(`locales.${l}`), value: l })) as {
      label: string
      value: AvailableLocales
    }[],
)

const tabItems = computed(() => [
  {
    label: t('admin.tabs.general'),
    icon: 'i-material-symbols-settings',
    slot: 'general',
    writeup: undefined,
    c: undefined,
  },
  ...postWriteups.value
    .filter((x) => !x._deleted)
    .sort((a, b) => -a.locale.localeCompare(b.locale))
    .map((writeup) => ({
      label: t(`locales.${writeup.locale}`),
      writeup,
      c: (() => {
        const id = writeup.id || writeup._tempId
        if (!id) {
          return []
        }
        const medias = (postMedias.value.get(id) ?? [])
          .filter((x) => !x._deleted)
          .map((x) => ({
            type: 'media' as const,
            content: x,
          }))
        const texts = (postTexts.value.get(id) ?? [])
          .filter((x) => !x._deleted)
          .map((x) => ({
            type: 'text' as const,
            content: x,
          }))

        return [...medias, ...texts].sort(
          (a, b) => a.content.order - b.content.order,
        ) as EditableContent[]
      })(),
      icon: 'i-material-symbols-language',
    })),
])
const activeTab: Ref<string | undefined> = ref(undefined)
const previewLocale = computed(
  () =>
    tabItems.value[Number(activeTab.value) || 0]?.writeup?.locale ||
    locale.value,
)
const previewWriteup = computed(() => {
  const notDeleted = postWriteups.value.filter((x) => !x._deleted)
  return (
    notDeleted.find((x) => x.locale === previewLocale.value) || notDeleted[0]
  )
})
const previewMedias = computed(() =>
  (previewWriteup.value
    ? postMedias.value.get(
        previewWriteup.value.id || previewWriteup.value._tempId || -1,
      ) || []
    : []
  ).filter((x) => !x._deleted),
)
const previewTexts = computed(() =>
  (previewWriteup.value
    ? postTexts.value.get(
        previewWriteup.value.id || previewWriteup.value._tempId || -1,
      ) || []
    : []
  ).filter((x) => !x._deleted),
)

const forms: {
  [x: string]:
    | typeof AdminPostForm
    | typeof AdminPostMediaForm
    | typeof AdminPostTextForm
    | typeof AdminPostWriteupForm
} = {}

const disableModifyBlocks = ref(false)

if (post.value) {
  // casting because comparison stack depth is exceeded
  const writeups = (await $fetch(
    `/api/posts/${post.value.id}/postWriteups`,
  )) as unknown as PostWriteup[]

  postWriteups.value = writeups
  writeups.forEach(async (writeup) => {
    const [thesePostMedias, thesePostTexts] = await Promise.all([
      $fetch(`/api/postWriteups/${writeup.id}/postMedias`),
      $fetch(`/api/postWriteups/${writeup.id}/postTexts`),
    ])
    if (thesePostMedias && thesePostTexts) {
      postMedias.value.set(writeup.id, thesePostMedias)
      postTexts.value.set(writeup.id, thesePostTexts)
    }
  })
}

function setInputRef(id: any) {
  return (el: any) => {
    if (el) {
      forms[id] = el // Store the input ref per item id
    } else {
      delete forms[id] // Clean up when the element is removed
    }
  }
}

async function publish() {
  if (!post.value) {
    return
  }
  publishing.value = true
  const fs = Object.values(forms)
  // call validation on all and check if any have errors
  const res = await Promise.all(fs.map((f) => f.validate()))
  if (res.some((r) => !r)) {
    toast.add({
      title: t('admin.save.invalid.title'),
      description: t('admin.save.invalid.description'),
      color: 'warning',
      icon: 'i-material-symbols-warning-outline',
    })
    publishing.value = false
  } else {
    // hide if no writeups and visible
    if (
      !postWriteups.value.filter((x) => !x._deleted).length &&
      post.value.visible
    ) {
      post.value.visible = false
      toast.add({
        title: t('admin.save.madeInvisible.title'),
        color: 'warning',
        icon: 'i-material-symbols-warning-outline',
      })
    }

    try {
      // update post
      await $fetch(`/api/posts/${post.value.id}`, {
        method: 'patch',
        body: post.value,
      })

      // create / update / delete writeup
      for (const writeup of postWriteups.value) {
        let createOrUpdate = false
        let id = writeup.id
        if (writeup.id) {
          if (writeup._deleted) {
            // delete
            await $fetch(`/api/postWriteups/${writeup.id}`, {
              method: 'delete',
            })
          } else {
            // update
            await $fetch(`/api/postWriteups/${writeup.id}`, {
              method: 'patch',
              body: writeup,
            })
            createOrUpdate = true
          }
        } else {
          if (!writeup._deleted) {
            // create
            const res = await $fetch(`/api/postWriteups`, {
              method: 'post',
              body: writeup,
            })
            if (res[0]) {
              id = res[0].id
            }
            createOrUpdate = true
          }
        }

        // if created or updated, handle associated blocks
        if (id && createOrUpdate) {
          // create / update / delete media
          const medias = postMedias.value.get(
            writeup.id || writeup._tempId || -1,
          )
          if (medias) {
            for (const media of medias) {
              if (media.id) {
                if (media._deleted) {
                  // delete
                  await $fetch(`/api/postMedias/${media.id}`, {
                    method: 'delete',
                  })
                } else {
                  // update
                  await $fetch(`/api/postMedias/${media.id}`, {
                    method: 'patch',
                    body: media,
                  })
                }
              } else {
                if (!media._deleted) {
                  // create
                  media.postWriteupId = id
                  await $fetch(`/api/postMedias`, {
                    method: 'post',
                    body: media,
                  })
                }
              }
            }
          }

          // create / update / delete text
          const texts = postTexts.value.get(writeup.id || writeup._tempId || -1)
          if (texts) {
            for (const text of texts) {
              if (text.id) {
                if (text._deleted) {
                  // delete
                  await $fetch(`/api/postTexts/${text.id}`, {
                    method: 'delete',
                  })
                } else {
                  // update
                  await $fetch(`/api/postTexts/${text.id}`, {
                    method: 'patch',
                    body: text,
                  })
                }
              } else {
                if (!text._deleted) {
                  // create
                  text.postWriteupId = id
                  await $fetch(`/api/postTexts`, {
                    method: 'post',
                    body: text,
                  })
                }
              }
            }
          }
        }
      }

      toast.add({
        title: t('admin.save.success.title'),
        color: 'success',
        icon: 'i-material-symbols-check-circle-outline',
      })
    } catch (e) {
      console.error(e)
      toast.add({
        title: t('admin.save.error.title'),
        color: 'error',
        icon: 'i-material-symbols-error-outline',
      })
    } finally {
      publishing.value = false
    }
  }
}

function protectedReorder(
  content: EditableContent[],
  toMove: EditableContent['content'],
  newOrder: number,
) {
  if (disableModifyBlocks.value) {
    return
  }
  disableModifyBlocks.value = true
  setTimeout(() => {
    reorder(content, toMove, newOrder)
    disableModifyBlocks.value = false
  })
}

function reorder(
  content: EditableContent[],
  toMove: EditableContent['content'],
  newOrder: number,
) {
  const oldOrder = toMove.order
  if (oldOrder === newOrder) {
    return
  }
  content
    .filter((x) => !x.content._deleted)
    .forEach((c) => {
      if (newOrder > oldOrder) {
        if (c.content.order >= oldOrder && c.content.order <= newOrder) {
          c.content.order--
        }
      } else {
        if (c.content.order <= oldOrder && c.content.order >= newOrder) {
          c.content.order++
        }
      }
    })
  toMove.order = newOrder
}

function addWriteup(locale: AvailableLocales) {
  if (!post.value) {
    return
  }
  const added: EditablePostWriteup = {
    _tempId: useRandId(),
    postId: post.value.id,
    locale,
    title: '',
    description: '',
    price: '',
    address: null,
    crushes: [],
    heatingType: null,
    parking: null,
  }
  postWriteups.value.push(added)
  setTimeout(() => {
    createWriteup.value = undefined
  })
}

function deleteWriteup(writeup: EditablePostWriteup) {
  // go to general tab
  activeTab.value = String(0)
  writeup._deleted = true

  toast.add({
    title: t('admin.deleteWriteup.deleted.title'),
    actions: [
      {
        icon: 'i-material-symbols-undo',
        label: t('admin.generic.undo'),
        color: 'neutral',
        variant: 'outline',
        onClick: (e) => {
          e?.stopPropagation()
          if (
            postWriteups.value.find(
              (x) => x.locale === writeup.locale && !x._deleted,
            )
          ) {
            // cannot undo as the user already created a new one
            toast.add({
              title: t('admin.deleteWriteup.undoFailed.title'),
              description: t('admin.deleteWriteup.undoFailed.description'),
              color: 'error',
              icon: 'i-material-symbols-error-outline',
            })
          } else {
            // undo
            writeup._deleted = false
          }
        },
      },
    ],
    color: 'success',
    icon: 'i-material-symbols-check-circle-outline',
  })
}

function addMedia(content: EditableContent[], writeup: EditablePostWriteup) {
  if (disableModifyBlocks.value) {
    return
  }
  disableModifyBlocks.value = true
  setTimeout(() => {
    const id = writeup.id || writeup._tempId
    if (!id) {
      toast.add({
        title: t('admin.addBlock.missingId.title'),
        color: 'error',
        icon: 'i-material-symbols-error-outline',
      })
      disableModifyBlocks.value = false
      return
    }
    const contentNotDeleted = content.filter((x) => !x.content._deleted)
    const added: EditablePostMedia = {
      _tempId: useRandId(),
      postWriteupId: id,
      pathname: '',
      description: null,
      order:
        (contentNotDeleted[contentNotDeleted.length - 1]?.content.order || 0) +
        1,
    }
    if (postMedias.value.has(id)) {
      postMedias.value.get(id)?.push(added)
    } else {
      postMedias.value.set(id, [added])
    }
    const last =
      (contentNotDeleted[contentNotDeleted.length - 1]?.content.order || 0) + 1
    reorder(content, added, last)
    disableModifyBlocks.value = false
  })
}

function addText(content: EditableContent[], writeup: EditablePostWriteup) {
  if (disableModifyBlocks.value) {
    return
  }
  disableModifyBlocks.value = true
  setTimeout(() => {
    const id = writeup.id || writeup._tempId
    if (!id) {
      toast.add({
        title: t('admin.addBlock.missingId.title'),
        color: 'error',
        icon: 'i-material-symbols-error-outline',
      })
      disableModifyBlocks.value = false
      return
    }
    const contentNotDeleted = content.filter((x) => !x.content._deleted)
    const added: EditablePostText = {
      _tempId: useRandId(),
      postWriteupId: id,
      title: '',
      content: '',
      order:
        (contentNotDeleted[contentNotDeleted.length - 1]?.content.order || 0) +
        1,
    }
    if (postTexts.value.has(id)) {
      postTexts.value.get(id)?.push(added)
    } else {
      postTexts.value.set(id, [added])
    }
    const last =
      (contentNotDeleted[contentNotDeleted.length - 1]?.content.order || 0) + 1
    reorder(content, added, last)
    disableModifyBlocks.value = false
  })
}

function deleteContent(
  writeup: EditablePostWriteup,
  content: EditableContent[],
  toMove: EditableContent['content'],
) {
  if (disableModifyBlocks.value) {
    return
  }
  disableModifyBlocks.value = true

  setTimeout(() => {
    const contentNotDeleted = content.filter((x) => !x.content._deleted)
    const originalOrder = toMove.order
    // move to lats then mark as deleted
    const last =
      (contentNotDeleted[contentNotDeleted.length - 1]?.content.order || 0) + 1
    reorder(content, toMove, last)
    toMove._deleted = true

    toast.add({
      title: t('admin.deleteBlock.deleted.title'),
      actions: [
        {
          icon: 'i-material-symbols-undo',
          label: t('admin.generic.undo'),
          color: 'neutral',
          variant: 'outline',
          onClick: (e) => {
            e?.stopPropagation()
            // undo
            const tab = tabItems.value.find((tab) => tab.writeup === writeup)
            if (!tab || !tab.c) {
              // cannot restore because writeup was deleted
              toast.add({
                title: t('admin.deleteBlock.undoFailed.title'),
                description: t('admin.deleteBlock.undoFailed.description'),
                color: 'error',
                icon: 'i-material-symbols-error-outline',
              })
              return
            }
            const last = (tab.c[tab.c.length - 1]?.content.order || 0) + 1
            toMove.order = last
            toMove._deleted = false
            // attempt to restore order. won't work if multiple were deleted
            protectedReorder(
              tab.c,
              toMove,
              Math.min(tab.c.length + 1, originalOrder),
            )
          },
        },
      ],
      color: 'success',
      icon: 'i-material-symbols-check-circle-outline',
    })
    disableModifyBlocks.value = false
  })
}
</script>
<template>
  <div class="flex h-full flex-col items-center gap-4 p-4">
    <div class="flex w-full items-center justify-between gap-8">
      <UButton icon="i-material-symbols-arrow-back" @click="$router.go(-1)">{{
        t('admin.generic.back')
      }}</UButton>
      <h1 class="text-center font-bold">
        {{ t('admin.generic.editing') }} "{{ post?.slug }}"
      </h1>
      <UButton
        icon="i-material-symbols-save"
        :loading="publishing"
        @click="publish()"
        >{{ $t('admin.generic.save') }}</UButton
      >
    </div>
    <div class="flex h-0 w-full grow justify-center gap-16">
      <!-- editor-->
      <div
        class="h-fit max-h-full w-1/2 overflow-y-auto rounded-3xl border border-neutral-200 bg-white p-4"
      >
        <UTabs
          :items="tabItems"
          :unmount-on-hide="false"
          class="justify-center"
          variant="link"
          v-model:modelValue="activeTab"
        >
          <template #general>
            <USelect
              :placeholder="t('admin.generic.writeupFor')"
              v-model="createWriteup"
              :items="availableWriteups"
              @update:model-value="addWriteup($event)"
              trailing-icon="i-material-symbols-add-ad"
              highlight
              :disabled="!availableWriteups.length"
              class="mt-2 mb-4 w-fit"
              :ui="{ placeholder: 'text-(--ui-text)' }"
            />
            <AdminPostForm
              :ref="setInputRef('post')"
              :post="post"
              @change="post = { ...post, ...$event }"
            />
          </template>
          <template #content="{ item }">
            <template v-if="item.writeup">
              <div class="mt-2 flex flex-col gap-4">
                <div class="flex items-center gap-4">
                  <h2 class="font-semibold">
                    {{ t('admin.generic.writeup', { lang: item.label }) }}
                  </h2>
                  <UButton
                    class="ml-auto"
                    icon="i-material-symbols-delete-outline"
                    color="error"
                    @click="deleteWriteup(item.writeup)"
                    :disabled="disableModifyBlocks || publishing"
                    >{{ t('admin.deleteWriteup.action') }}</UButton
                  >
                </div>
                <AdminPostWriteupForm
                  :ref="setInputRef(`writeup-${item.writeup.locale}`)"
                  :post-writeup="item.writeup as PostWriteup"
                  @change="Object.assign(item.writeup as {}, $event)"
                />

                <div class="flex w-full items-center gap-4">
                  <h2 class="font-semibold">{{ t('admin.generic.blocks') }}</h2>
                  <UButton
                    icon="i-material-symbols-perm-media-outline"
                    color="secondary"
                    class="ml-auto"
                    @click="addMedia(item.c, item.writeup)"
                    :disabled="disableModifyBlocks || publishing"
                    >{{
                      t('admin.generic.add', { type: t('admin.generic.media') })
                    }}</UButton
                  >
                  <UButton
                    icon="i-material-symbols-insert-text"
                    color="secondary"
                    @click="addText(item.c, item.writeup)"
                    :disabled="disableModifyBlocks || publishing"
                    >{{
                      t('admin.generic.add', { type: t('admin.generic.text') })
                    }}</UButton
                  >
                </div>

                <!-- show the elements -->
                <div
                  v-if="item.c"
                  v-for="c in item.c"
                  :key="c.content.id || c.content._tempId"
                >
                  <div
                    class="flex items-center gap-4 border-t border-neutral-200 py-4"
                  >
                    <USelect
                      :model-value="c.content.order"
                      :items="item.c.map((x) => x.content.order)"
                      @update:model-value="
                        protectedReorder(item.c, c.content, $event)
                      "
                      :disabled="disableModifyBlocks || publishing"
                      class="font-numbers w-fit"
                      trailing-icon="i-material-symbols-expand-all"
                      :ui="{ content: 'font-numbers' }"
                    />
                    <h2 class="font-semibold">
                      {{
                        t('admin.generic.block', {
                          type: t(`admin.generic.${c.type}`),
                        })
                      }}
                    </h2>
                    <UButton
                      class="ml-auto"
                      icon="i-material-symbols-delete-outline"
                      color="error"
                      @click="deleteContent(item.writeup, item.c, c.content)"
                      :disabled="disableModifyBlocks || publishing"
                      >{{ t('admin.deleteBlock.action') }}</UButton
                    >
                  </div>
                  <AdminPostMediaForm
                    v-if="c.type === 'media'"
                    :ref="
                      setInputRef(
                        `writeup-${item.writeup.locale}-${c.content.id || c.content._tempId}`,
                      )
                    "
                    :post-media="c.content"
                    :current-writeup-medias="
                      item.c
                        .filter((x) => x.type === 'media')
                        .map((x) => x.content)
                    "
                    :all-writeups-medias="
                      tabItems
                        .filter((x) => x.c)
                        .map((x) =>
                          x
                            .c!.filter((x) => x.type === 'media')
                            .map((x) => x.content),
                        )
                        .flat()
                    "
                    @change="Object.assign(c.content as {}, $event)"
                    class="ml-4"
                  />
                  <AdminPostTextForm
                    v-else
                    :ref="
                      setInputRef(
                        `writeup-${item.writeup.locale}-${c.content.id || c.content._tempId}`,
                      )
                    "
                    :post-text="c.content"
                    @change="Object.assign(c.content as {}, $event)"
                    class="ml-4"
                  />
                </div>
              </div>
            </template>
          </template>
        </UTabs>
      </div>

      <!-- preview -->
      <div class="w-sm overflow-y-auto px-4">
        <Post
          :post="post"
          :post-writeup="previewWriteup"
          :post-medias="previewWriteup ? previewMedias : null"
          :post-texts="previewWriteup ? previewTexts : null"
          :hide-hints="true"
        />
      </div>
    </div>
  </div>
</template>
