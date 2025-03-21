<template>
  <nav
    class="from-bi-blue-300 to-bi-blue-200 fixed bottom-0 left-0 h-14 w-full bg-linear-to-r from-10% to-[300%] z-20"
  >
    <ul
      class="text-bi-blue-100 flex h-full w-full items-center px-5 font-medium"
    >
      <li class="flex h-full grow">
        <NuxtLink
          exact-active-class="text-white"
          :to="$localePath('/')"
          class="flex grow items-center justify-center gap-2 px-3"
          ><UIcon name="i-material-symbols-gite" />
          <span class="leading-none">{{ $t('pages.buy.title') }}</span>
        </NuxtLink>
      </li>
      <li class="flex h-full grow">
        <NuxtLink
          exact-active-class="text-white"
          :to="$localePath('/rent')"
          class="flex grow items-center justify-center gap-2 px-3"
          ><UIcon name="i-material-symbols-key" />
          <span class="leading-none">{{ $t('pages.rent.title') }}</span>
        </NuxtLink>
      </li>
      <li class="flex h-full grow">
        <NuxtLink
          exact-active-class="text-white"
          :to="$localePath('/about')"
          class="flex grow items-center justify-center gap-2 px-3"
          ><UIcon name="i-material-symbols-face" />
          <span class="leading-none">{{ $t('pages.about.title') }}</span>
        </NuxtLink>
      </li>
      <li class="flex h-full grow">
        <NuxtLink
          exact-active-class="text-white"
          :to="$localePath('/contact')"
          class="flex grow items-center justify-center gap-2 px-3"
          ><UIcon name="i-material-symbols-real-estate-agent" />
          <span class="leading-none">{{ $t('pages.contact.title') }}</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
