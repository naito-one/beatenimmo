<template>
  <nav
    class="fixed bottom-0 left-0 z-20 h-14 w-full bg-linear-to-r from-blue-800 from-10% to-blue-500 to-[300%] select-none lg:h-12"
  >
    <ul
      class="mx-auto flex h-full w-full items-center px-5 font-semibold text-blue-100 md:w-3/4 lg:w-1/2"
    >
      <li class="flex h-full grow">
        <NuxtLinkLocale
          to="/"
          :class="`flex grow items-center justify-center gap-2 px-3 ${$route.name?.toString().includes('post') || $route.name?.toString().includes('index') ? 'text-white' : ''}`"
          ><UIcon name="i-material-symbols-gite" />
          <span class="leading-none">{{ $t('pages.buy.title') }}</span>
        </NuxtLinkLocale>
      </li>
      <!--
      <li class="flex h-full grow">
        <NuxtLinkLocale
          exact-active-class="text-white"
          to="/rent"
          class="flex grow items-center justify-center gap-2 px-3"
          ><UIcon name="i-material-symbols-key" />
          <span class="leading-none">{{ $t('pages.rent.title') }}</span>
        </NuxtLinkLocale>
      </li>
      -->
      <li class="flex h-full grow">
        <NuxtLinkLocale
          exact-active-class="text-white"
          to="/about"
          class="flex grow items-center justify-center gap-2 px-3"
          ><UIcon name="i-material-symbols-face" />
          <span class="leading-none">{{ $t('pages.about.title') }}</span>
        </NuxtLinkLocale>
      </li>
      <li class="flex h-full grow">
        <NuxtLinkLocale
          exact-active-class="text-white"
          to="/contact"
          class="flex grow items-center justify-center gap-2 px-3"
          ><UIcon name="i-material-symbols-real-estate-agent" />
          <span class="leading-none">{{ $t('pages.contact.title') }}</span>
        </NuxtLinkLocale>
      </li>
    </ul>
  </nav>
</template>
