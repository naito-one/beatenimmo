<script setup lang="ts">
withDefaults(
  defineProps<{
    pathname: string
    controls?: boolean
  }>(),
  { controls: true },
)

const isVideo = ref(false)
</script>

<template>
  <div
    class="relative h-0 overflow-hidden rounded-md bg-cover pb-[100%]"
    :style="`background-image: url(/media/${pathname})`"
    aria-label="A Media"
    aria-roledescription="img"
  >
    <video
      muted
      loop
      :controls="controls"
      :class="`absolute h-full w-full object-cover transition-opacity duration-500 ${isVideo ? '' : 'pointer-events-none opacity-0'}`"
      :key="pathname"
      @loadeddata="isVideo = true"
    >
      <source :src="`/media/${pathname}`" />
    </video>
  </div>
</template>
