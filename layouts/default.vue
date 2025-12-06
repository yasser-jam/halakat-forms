<template>
  <v-app dir="rtl">
    <v-navigation-drawer
      v-model="drawer"
      location="right"
      color="primary-darken-3"
      :temporary="$vuetify.display.mobile"
    >
      <layout-admin-sidebar v-if="isAdmin" />
      <layout-sidebar v-else />
    </v-navigation-drawer>

    <v-app-bar elevation="1">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>
        <nuxt-link to="/" class="decoration-none text-dark font-semibold">
          منصة حلقات</nuxt-link
        >
      </v-app-bar-title>
    </v-app-bar>

    <v-main class="bg-background">
      <NuxtPage />
    </v-main>
  </v-app>

  <base-toaster v-model="toasterShow">{{ toasterMsg }}</base-toaster>
</template>

<script setup>
const drawer = ref(true);

const authStore = useAuthStore();
const toasterStore = useToasterStore();

const { user } = storeToRefs(authStore);
const { toasterMsg, toasterShow } = storeToRefs(toasterStore);

const isAdmin = computed(() => user.value?.role === 'ORGANIZATION_ADMIN');

useAsyncData(() => authStore.me());
</script>
