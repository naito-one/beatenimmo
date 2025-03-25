<script setup lang="ts">
import { ConfirmModal } from '#components'
import type { TableColumn, DropdownMenuItem } from '@nuxt/ui'
import superjson from 'superjson'

const localPath = useLocalePath()
const { locale } = useI18n()

const toast = useToast()
const overlay = useOverlay()

const modal = overlay.create(ConfirmModal)

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
              await $fetch(`/api/posts/${post.id}`, { method: 'delete' })
              if (data.value) {
                const index = data.value.indexOf(post)
                data.value.splice(index, 1)
                data.value = [...data.value]
              }
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
</script>

<template>
  <UTable :data="data" :columns="columns">
    <template #action-cell="{ row }">
      <UDropdownMenu :items="getDropdownActions(row.original)">
        <UButton
          class="cursor-pointer"
          icon="i-material-symbols-more-vert"
          color="neutral"
          variant="ghost"
        />
      </UDropdownMenu>
    </template>
  </UTable>
</template>
