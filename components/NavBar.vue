<template>
  <nav
    class="from-bi-blue-300 to-bi-blue-200 fixed bottom-0 left-0 z-20 h-14 w-full bg-linear-to-r from-10% to-[300%] select-none"
  >
    <ul
      class="text-bi-blue-100 flex h-full w-full items-center px-5 font-semibold"
    >
      <li class="flex h-full grow">
        <NuxtLinkLocale
          exact-active-class="text-white"
          to="/"
          class="flex grow items-center justify-center gap-2 px-3"
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
