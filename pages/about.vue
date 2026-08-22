<script setup lang="ts">
import type { Component } from 'vue';
import { AboutDe, AboutEn } from '#components';
import type { AvailableLocales } from '~/consts';

const translations: Record<AvailableLocales, Component> = {
  'en': AboutEn,
  'de':  AboutDe
}
</script>
<template>
  <component :is="translations[$i18n.locale]"></component>
</template>
