<template>
  <v-app dir="rtl">
    <v-navigation-drawer v-model="drawer" location="right" color="primary-darken-3" permanent>
      <layout-sidebar />
    </v-navigation-drawer>

    <v-app-bar elevation="1">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>مسجد الشيخ علي الدقر</v-app-bar-title>
    </v-app-bar>

    <v-main class="bg-background">
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<script setup>
const drawer = ref(true);
</script>
