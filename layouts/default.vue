<template>
  <v-app dir="rtl">
    <v-navigation-drawer
      v-model="drawer"
      location="right"
      color="primary-darken-3"
      :temporary="$vuetify.display.mobile"
    >
      <!-- <layout-admin-sidebar v-if="isAdmin" /> -->
      <layout-sidebar />
    </v-navigation-drawer>

    <v-app-bar elevation="1">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>
        <div class="flex justify-between items-center">
          <div>
            <nuxt-link
            to="/" class="decoration-none text-dark font-semibold">
            
            {{ mosque?.name || 'منصة حلقات' }}
            
              </nuxt-link
            >

            <div class="text-sm text-gray-500">
              {{ campaign?.name }}
            </div>
          </div>

          <v-chip variant="tonal" color="primary" class="m-4">جارية الآن</v-chip>
        </div>
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

const mosqueId = useCookie('mosque_id');

const authStore = useAuthStore();
const toasterStore = useToasterStore();
const campaignStore = useCampaignStore();
const mosqueStore = useMosqueStore();

const { toasterMsg, toasterShow } = storeToRefs(toasterStore);
const { campaign } = storeToRefs(campaignStore);
const { mosque } = storeToRefs(mosqueStore);


// fetch initial data
useAsyncData(() => authStore.me());
useAsyncData(() => authStore.listPermissions());
useAsyncData(() => mosqueStore.get(Number(mosqueId.value)));

// change title
useHead({
  title: mosque?.value?.name ? `منصة حلقات - ${mosque?.value?.name}` : 'منصة حلقات'
})

</script>
