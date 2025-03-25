<script setup lang="ts">
defineProps<{ value: Sorting }>()
defineEmits<{ (e: 'change', sorting: Sorting): void }>()

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
</script>
<template>
  <ul class="mt-4 flex flex-wrap justify-center gap-2 px-4 font-semibold">
    <li v-for="s of sortings" :key="s.sort">
      <button
        :class="`flex items-center gap-2 rounded-3xl p-4 select-none ${value === s.sort ? 'bg-bi-blue-200 text-white shadow-md' : 'bg-white text-gray-800'}`"
        @click="$emit('change', s.sort)"
      >
        <UIcon :name="s.icon" />
        <span class="leading-none">{{ $t(`sorting.${s.sort}`) }}</span>
      </button>
    </li>
  </ul>
</template>
