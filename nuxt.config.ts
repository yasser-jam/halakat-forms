import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'


// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    '@mdi/font/css/materialdesignicons.min.css',
    'vuetify/styles',
    'assets/styles/main.scss'
  ],

  app: {
    head: {
      title: 'حلقات - مسجد علي الدقر'
    },
  },

  runtimeConfig: {
    public: {
      apiUrl: 'halakat-backend.vercel.app'
    }
  },

  build: {
    transpile: ['vuetify'],
  },
  modules: [
    '@unocss/nuxt',
    '@pinia/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true, styles: { configFile: '/assets/vuetify/settings.scss' } }))
      })
    },
    //...
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  imports: {
    dirs: ['types/*.ts']
  },
});
