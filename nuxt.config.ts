
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

  modules: [
    '@unocss/nuxt',
    'vuetify-nuxt-module',
    '@pinia/nuxt',
  ],

  imports: {
    dirs: ['types/*.ts']
  },

  vuetify: {
    moduleOptions: {
      styles: { configFile: '/assets/vuetify/settings.scss' }
    },

    vuetifyOptions: './vuetify.config.ts'
  },  
});
