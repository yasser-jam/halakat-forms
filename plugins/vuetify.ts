// // import this after install `@mdi/font` package
// import "@mdi/font/css/materialdesignicons.css";

// import 'vuetify/styles'
// import { createVuetify } from "vuetify";
// import { VTextField } from "vuetify/components";
// import { ar } from 'vuetify/locale'

// const theme = {
//   dark: false,
//   colors: {
//     background: '#FCFCFC',
//     surface: '#fefefe',
//     'surface-bright': '#FFFFFF',
//     'surface-light': '#EEEEEE',
//     'surface-variant': '#424242',
//     'on-surface-variant': '#EEEEEE',
//     primary: '#0D9488',
//     'primary-darken-1': '#0F766E',
//     'primary-darken-3': '#042F2E',
//     secondary: '#06B6D4',
//     'secondary-darken-1': '#0E7490',
//     error: '#DC2626',
//     info: '#4F46E5',
//     success: '#4CAF50',
//     warning: '#16A34A',
//   },
// }
export default defineNuxtPlugin(() => {
})

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
