// vuetify.config.ts
import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration'
import type { ThemeDefinition } from 'vuetify'
import { ar } from 'vuetify/locale'

const stTheme: ThemeDefinition = {
  dark: false,

  colors: {
    primary: '#0D9488',
    'primary-darken-1': '#0F766E',
    'primary-darken-3': '#042F2E',
    secondary: '#06B6D4',
    'secondary-darken-1': '#0E7490',
    blue: '#14a6f8',
    dark: '#374151',
    success: '#50cd89',
    info: '#7239ea',
    warning: '#FFA800',
    error: '#f1416c',
    light: '#eef0f8',
    lighten: '#eff2f5',
    background: '#eef0f8',
    'blue-lighten-2': '#97def2',
    'blue-lighten-3': '#b5c1ef',
    'info-lighten-3': '#d0aee0',
    'warning-lighten-3': '#f7c78c',
    'secondary-lighten-3': '#a7d9b6',
    'secondary-darken': '#5ab2a3',
    'primary-lighten': '#f9e8f3',
    'primary-lighten-2': '#ffc2cf',
    'primary-lighten-3': '#f193aa',
    'primary-lighten-4': '#ed6b97',
    'red-lighten-2': '#ffbfae',
    'red-lighten-3': '#f4a99b',
    'on-surface': '#181C32'
  }
}

export default defineVuetifyConfiguration({
  locale: {
    locale: 'ar',
    fallback: 'en',
    messages: { ar }
  },

  defaults: {
    global: {
      ripple: false
    },

    VCard: {
      elevation: 8
    },

    VTextField: {
      variant: 'outlined',
      density: 'compact',
      bgColor: 'lighten'
    },

    VTextarea: {
      variant: 'outlined',
      density: 'compact',
      bgColor: 'lighten'
    },

    VSelect: {
      variant: 'outlined',
      density: 'compact',
      bgColor: 'lighten'
    },

    VBtn: {
      elevation: 0,
      color: 'primary'
    },

    VSwitch: {
      inset: true,
      color: 'blue',
      hideDetails: true
    },

    VTabs: {
      sliderColor: 'primary',
      density: 'compact'
    },

    VTab: {
      ripple: false
    },

    VChip: {
      rounded: "lg",
      density: 'compact',
      class: 'font-weight-bold'
    },

    VWindowItem: {
      transition: 'fade',
      reverseTransition: 'fade'
    },

    VRow: {
      dense: true
    },

    VDataTableServer: {
      itemsPerPageOptions: [
        { title: '10', value: 10 },
        { title: '25', value: 25 },
        { title: '50', value: 50 }
      ]
    },

    VDataTable: {
      itemsPerPageOptions: [
        { value: 10, title: '10' },
        { value: 25, title: '25' },
        { value: 50, title: '50' }
      ]
    }
  },

  theme: {
    defaultTheme: 'stTheme',
    themes: { stTheme }
  }
})
