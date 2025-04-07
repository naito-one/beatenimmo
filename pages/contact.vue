<template>
  <div class="mx-auto flex flex-col gap-4 p-4 md:mt-4 md:w-3/4 lg:w-2xl">
    <div class="rounded-xl border border-neutral-200 bg-white p-4">
      <h2 class="mb-4 text-xl font-bold">{{ $t('contact.header') }}</h2>
      <ContactForm />
    </div>
    <div class="rounded-xl border border-neutral-200 bg-white p-4">
      <h2 class="mb-4 text-xl font-bold">Impressum</h2>
      <p class="font-numbers mb-4">
        BeatenIMMO<br />
        Corinne & Fabrice Winkelmann<br />
        Schmockenstrasse 49<br />
        3803 Beatenberg
      </p>
      <p class="font-numbers">
        info(at)beatenimmo.ch<br />
        +41 78 703 00 33
      </p>
    </div>
  </div>
</template>
