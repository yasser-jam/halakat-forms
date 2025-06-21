// // import this after install `@mdi/font` package
// import "@mdi/font/css/materialdesignicons.css";

// import 'vuetify/styles'
// import { createVuetify } from "vuetify";
// import { VTextField } from "vuetify/components";
import { ar } from 'vuetify/locale';

const test: ThemeDefinition = {
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
  },
};
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify, type ThemeDefinition } from 'vuetify';
export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    defaults: {
      global: {
        ripple: false,
      },

      VCard: {
        elevation: 8,
      },

      VTextField: {
        variant: 'filled',
        density: 'compact',
      },

      VTextarea: {
        variant: 'filled',
        density: 'compact',
        bgColor: 'lighten',
      },

      VSelect: {
        variant: 'outlined',
        density: 'compact',
        bgColor: 'lighten',
      },

      VBtn: {
        elevation: 0,
        color: 'primary',
      },

      VSwitch: {
        inset: true,
        color: 'blue',
        hideDetails: true,
      },

      VTabs: {
        sliderColor: 'primary',
        density: 'compact',
      },

      VTab: {
        ripple: false,
      },

      VWindowItem: {
        transition: 'fade',
        reverseTransition: 'fade',
      },

      VRow: {
        dense: true,
      },

      VDataTableServer: {
        itemsPerPageOptions: [
          { title: '10', value: 10 },
          { title: '25', value: 25 },
          { title: '50', value: 50 },
        ],
      },

      VDataTable: {
        itemsPerPageOptions: [
          { value: 10, title: '10' },
          { value: 25, title: '25' },
          { value: 50, title: '50' },
        ],
      },
    },
    locale: {
      locale: 'ar',
      fallback: 'ar',
      messages: { ar },
    },
    theme: {
      defaultTheme: 'test',
      themes: { test },
    },
  });

  app.vueApp.use(vuetify);
});

// export default defineNuxtPlugin((app) => {
//   const vuetify = createVuetify({
//     // ... your configuration

//     theme: {
//       defaultTheme: 'theme',
//       themes: {
//         theme
//       }
//     },

//     defaults: {
//       global: {
//         ripple: false
//       },

//       VCard: {
//         elevation: 8
//       },

//       VTextField: {
//         variant: 'filled',
//         density: 'compact',
//       },

//       VTextarea: {
//         variant: 'filled',
//         density: 'compact',
//         bgColor: 'lighten'
//       },

//       VSelect: {
//         variant: 'outlined',
//         density: 'compact',
//         bgColor: 'lighten'
//       },

//       VBtn: {
//         elevation: 0,
//         color: 'primary'
//       },

//       VSwitch: {
//         inset: true,
//         color: 'blue',
//         hideDetails: true
//       },

//       VTabs: {
//         sliderColor: 'primary',
//         density: 'compact'
//       },

//       VTab: {
//         ripple: false
//       },

//       VWindowItem: {
//         transition: 'fade',
//         reverseTransition: 'fade'
//       },

//       VRow: {
//         dense: true
//       },

//       VDataTableServer: {
//         itemsPerPageOptions: [
//           { title: '10', value: 10 },
//           { title: '25', value: 25 },
//           { title: '50', value: 50 }
//         ]
//       },

//       VDataTable: {
//         itemsPerPageOptions: [
//           { value: 10, title: '10' },
//           { value: 25, title: '25' },
//           { value: 50, title: '50' }
//         ]
//       }
//     },
//     locale: {
//       locale: 'ar',
//       fallback: 'ar',
//       messages: { ar },
//     },
//   });
//   app.vueApp.use(vuetify);
// });
