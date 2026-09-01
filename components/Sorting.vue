<script setup lang="ts">
const sortings: { sort: Sorting; icon: string }[] = [
  {
    sort: 'latest',
    icon: 'i-material-symbols-more-time',
  },
  {
    sort: 'top',
    icon: 'i-material-symbols-verified',
  },
  {
    sort: 'cheapest',
    icon: 'i-material-symbols-sell',
  },
]
const sorting = useSorting()
</script>
<template>
  <ul class="mt-4 flex flex-wrap justify-center gap-2 px-4 font-semibold">
    <li v-for="s of sortings" :key="s.sort">
      <NuxtLinkLocale
        :class="`flex items-center gap-2 rounded-3xl p-4 select-none ${sorting === s.sort ? 'bg-(--ui-color-primary-500) text-white shadow-md' : 'bg-white text-gray-800'}`"
        :to="`/?sorting=${s.sort}`"
      >
        <UIcon :name="s.icon" />
        <span class="leading-none">{{ $t(`sorting.${s.sort}`) }}</span>
      </NuxtLinkLocale>
    </li>
  </ul>
</template>
