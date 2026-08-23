<script setup lang="ts">
import { ConfirmModal, UButton, UDropdownMenu } from '#components'
import type { TableColumn, DropdownMenuItem } from '@nuxt/ui'
import superjson from 'superjson'
import type { Column } from '@tanstack/vue-table'

const localPath = useLocalePath()
const { locale, t } = useI18n()

const toast = useToast()
const overlay = useOverlay()

const modal = overlay.create(ConfirmModal)
const posts: Ref<Post[]> = ref([])

const columns = computed<TableColumn<Post>[]>(() => [
  {
    accessorKey: 'id',
    header: ({ column }) => getHeader(column, t('tooltips.post.id')),
  },
  {
    accessorKey: 'slug',
    header: ({ column }) => getHeader(column, t('tooltips.post.slug')),
  },
  {
    accessorKey: 'type',
    header: ({ column }) => getHeader(column, t('tooltips.post.type')),
  },
  {
    accessorKey: 'visible',
    header: ({ column }) => getHeader(column, t('tooltips.post.visible')),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => getHeader(column, t('tooltips.post.created')),
    cell: ({ row }) =>
      (row.getValue('createdAt') as Date).toLocaleString(locale.value),
  },
  {
    accessorKey: 'order',
    header: ({ column }) => getHeader(column, t('admin.generic.topOrder')),
  },
  {
    id: 'action',
  },
])

function getDropdownActions(post: Post): DropdownMenuItem[][] {
  return [
    /*
  TODO: implement quick actions
    [
      {
        label: post.visible ? 'Hide' : 'Show',
        icon: post.visible
          ? 'i-material-symbols-visibility-off-outline'
          : 'i-material-symbols-visibility-outline',
        onSelect: () => {
          // TODO: toggle post visible
          toast.add({
            title: `Post visibility set to ${post.visible ? 'Hidden' : 'Visible'}`,
            color: 'success',
          })
        },
      },
    ],*/
    [
      {
        label: t('admin.generic.edit'),
        icon: 'i-material-symbols-edit-square-outline',
        onSelect: () => {
          navigateTo(localPath(`/admin/posts/${post.slug}`))
        },
      },
      {
        label: t('admin.deletePost.action'),
        icon: 'i-material-symbols-delete-outline',
        color: 'error',
        onSelect: async () => {
          const shouldDelete = await modal.open({
            title: t('admin.deletePost.confirm.title', { post: post.slug }),
            description: t('admin.deletePost.confirm.description'),
          })
          if (shouldDelete) {
            try {
              // reorder to last
              reorder(posts.value, post, posts.value.length!)
              await $fetch(`/api/posts/${post.id}`, { method: 'delete' })
              const index = posts.value.indexOf(post)
              posts.value.splice(index, 1)
              triggerTableUpdate()
              await updateInDb()
              toast.add({
                title: t('admin.deletePost.success.title'),
                color: 'success',
                icon: 'i-material-symbols-check-circle-outline',
              })
            } catch (e) {
              console.error(e)
              toast.add({
                title: t('admin.deletePost.error.title'),
                color: 'error',
                icon: 'i-material-symbols-error-outline',
              })
            }
          }
        },
      },
    ],
  ]
}

function triggerTableUpdate() {
  posts.value = [...posts.value]
}

function getHeader(column: Column<Post>, label: string) {
  const isSorted = column.getIsSorted()

  return h(UButton, {
    color: 'neutral',
    variant: 'ghost',
    label,
    icon: isSorted
      ? isSorted === 'asc'
        ? 'i-lucide-arrow-up-narrow-wide'
        : 'i-lucide-arrow-down-wide-narrow'
      : 'i-lucide-arrow-up-down',
    class: '-mx-2.5',
    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
  })
}

const sorting = ref([
  {
    id: 'createdAt',
    desc: true,
  },
])

function reorder(content: Post[], toMove: Post, newOrder: number) {
  const oldOrder = toMove.order
  if (oldOrder === newOrder) {
    return
  }
  content.forEach((c) => {
    if (newOrder > oldOrder) {
      if (c.order >= oldOrder && c.order <= newOrder) {
        c.order--
      }
    } else {
      if (c.order <= oldOrder && c.order >= newOrder) {
        c.order++
      }
    }
  })
  toMove.order = newOrder
}

async function updateInDb() {
  await Promise.all(
    posts.value.map((x) =>
      $fetch(`/api/posts/${x.id}`, { method: 'patch', body: x }),
    ),
  )
}

function reorderAndUpdate(content: Post[], toMove: Post, newOrder: number) {
  reorder(content, toMove, newOrder)
  triggerTableUpdate()
  updateInDb().catch(console.error)
}

const loading = ref(true)

onMounted(async () => {
  posts.value = superjson.parse(
    (await $fetch('/api/posts?sorting=latest')) as unknown as string,
  ) as Post[]
  loading.value = false
})

defineExpose({ posts })
</script>

<template>
  <UTable
    v-model:sorting="sorting"
    :data="posts"
    :columns="columns"
    :loading="loading"
  >
    <template #action-cell="{ row }">
      <UDropdownMenu :items="getDropdownActions(row.original)">
        <UButton
          icon="i-material-symbols-more-vert"
          color="neutral"
          variant="ghost"
        />
      </UDropdownMenu>
    </template>
    <template #order-cell="{ row }">
      <USelect
        :model-value="row.original.order"
        :items="posts.map((x) => x.order).sort((a, b) => a - b)"
        @update:model-value="reorderAndUpdate(posts, row.original, $event)"
        class="font-numbers w-fit"
        trailing-icon="i-material-symbols-expand-all"
        :ui="{ content: 'font-numbers' }"
      />
    </template>
  </UTable>
</template>
