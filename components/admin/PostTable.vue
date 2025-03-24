<script setup lang="ts">
import type { TableColumn, DropdownMenuItem } from '@nuxt/ui'
import superjson from 'superjson'

const localPath = useLocalePath()
const { locale } = useI18n()

const toast = useToast()

const { data } = await useFetch('/api/posts?sorting=latest', {
  transform(res) {
    return superjson.parse(res as unknown as string) as Post[]
  },
})

const columns: TableColumn<Post>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'slug',
    header: 'Slug',
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'visible',
    header: 'Visible',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({ row }) =>
      (row.getValue('createdAt') as Date).toLocaleString(locale.value),
  },
  {
    accessorKey: 'order',
    header: 'Top Order',
  },
  {
    id: 'action',
  },
]

function getDropdownActions(post: Post): DropdownMenuItem[][] {
  return [
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
            icon: 'i-lucide-circle-check',
          })
        },
      },
    ],
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
        onSelect: () => {
          // TODO: confirm and delete
          toast.add({
            title: `Post Successfully deleted`,
            color: 'success',
            icon: 'i-lucide-circle-check',
          })
        },
      },
    ],
  ]
}
</script>

<template>
  <UTable :data="data" :columns="columns">
    <template #action-cell="{ row }">
      <UDropdownMenu :items="getDropdownActions(row.original)">
        <UButton
          class="cursor-pointer"
          icon="i-lucide-ellipsis-vertical"
          color="neutral"
          variant="ghost"
        />
      </UDropdownMenu>
    </template>
  </UTable>
</template>
