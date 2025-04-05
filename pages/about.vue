<script setup lang="ts">
import { AboutDe, AboutEn } from '#components';
const translations = {
  'en': AboutEn,
  'de':  AboutDe
}
</script>
<template>
  <component :is="translations[$i18n.locale]"></component>
</template>
