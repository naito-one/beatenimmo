import tailwindcss from '@tailwindcss/vite'
import { defineLocalBusiness } from 'nuxt-schema-org/schema'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // https://nuxt.com/modules
  modules: [
    '@nuxthub/core',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    'nuxt-auth-utils',
    'nuxt-workmailer',
  ],

  // https://devtools.nuxt.com
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },

  colorMode: {
    preference: 'light',
  },

  nodemailer: {
    from: 'support@naito.one',
    host: 'mail.infomaniak.com',
    port: 465,
    secure: true,
    auth: {
      user: 'support@naito.one',
      pass: '',
    },
  },

  /*
  hooks: {
    'pages:extend'(pages) {
      pages.push({
        name: 'rent',
        path: '/rent',
        file: '~/pages/index.vue',
      })
    },
  },
  */

  runtimeConfig: {
    adminPassword: '',
    contactTo: '',
  },

  nitro: {
    experimental: {
      tasks: true,
      openAPI: true,
    },
  },

  // https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2025-03-01',

  // https://hub.nuxt.com/docs/getting-started/installation#options
  hub: {
    blob: true,
    database: true,
  },

  app: {
    head: {
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },

  schemaOrg: {
    identity: defineLocalBusiness({
      '@type': 'RealEstateAgent', // Choose from https://schema.org/LocalBusiness#subtypes

      logo: '/img/logo.svg',
      telephone: '+41 78 703 00 33',
      email: 'info@beatenimmo.ch',
      areaServed: 'Berner Oberland',
      sameAs: [
        'https://www.instagram.com/beatenimmo.ch',
        'https://www.facebook.com/beatenimmo.ch',
      ],

      // Location (Required)
      address: {
        streetAddress: 'Schmockenstrasse 49',
        addressLocality: 'Beatenberg',
        addressRegion: 'BE',
        postalCode: '3803',
        addressCountry: 'CH',
      },
    }),
  },

  i18n: {
    baseUrl: 'https://beatenimmo.nuxt.dev/', // https://beatenimmo.ch
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        language: 'en-US',
        file: 'en.ts',
      },
      {
        code: 'de',
        language: 'de-CH',
        file: 'de.ts',
      },
    ],
  },
})
