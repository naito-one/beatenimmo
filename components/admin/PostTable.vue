<script setup lang="ts">
import { ConfirmModal, UButton, UDropdownMenu } from '#components'
import type { TableColumn, DropdownMenuItem } from '@nuxt/ui'
import superjson from 'superjson'
import type { Column } from '@tanstack/vue-table'

const emit = defineEmits<{ (e: 'posts', posts: Post[]): void }>()

const localPath = useLocalePath()
const { locale } = useI18n()

const toast = useToast()
const overlay = useOverlay()

const modal = overlay.create(ConfirmModal)
const posts: Ref<Post[]> = ref([])

const columns: TableColumn<Post>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => getHeader(column, 'ID'),
  },
  {
    accessorKey: 'slug',
    header: ({ column }) => getHeader(column, 'Slug'),
  },
  {
    accessorKey: 'type',
    header: ({ column }) => getHeader(column, 'Type'),
  },
  {
    accessorKey: 'visible',
    header: ({ column }) => getHeader(column, 'Visible'),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => getHeader(column, 'Created'),
    cell: ({ row }) =>
      (row.getValue('createdAt') as Date).toLocaleString(locale.value),
  },
  {
    accessorKey: 'order',
    header: ({ column }) => getHeader(column, 'Top Order'),
  },
  {
    id: 'action',
  },
]

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
        label: 'Edit',
        icon: 'i-material-symbols-edit-square-outline',
        onSelect: () => {
          navigateTo(localPath(`/admin/posts/${post.slug}`))
        },
      },
      {
        label: 'Delete',
        icon: 'i-material-symbols-delete-outline',
        color: 'error',
        onSelect: async () => {
          const shouldDelete = await modal.open({
            title: `Confirm deleting ${post.slug}`,
            description: 'This action cannot be undone.',
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
                title: `Post Successfully deleted`,
                color: 'success',
              })
            } catch (e) {
              console.error(e)
              toast.add({
                title: `Failed to deleted Post`,
                color: 'error',
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
