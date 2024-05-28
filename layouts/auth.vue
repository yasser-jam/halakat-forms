<template>
  <v-row dir="rtl" class="min-h-screen overflow-y-hidden">
    <v-col cols="6" class="bg-primary-darken-3">
      <div class="flex flex-col justify-center items-center h-full">
        <v-icon color="white" size="6rem">mdi-mosque</v-icon>

        <div class="text-white text-6xl mt-4">جامع الشيخ علي الدقر</div>

        <div class="font-weight-bold text-sm text-gray-200 mt-12">
          تطبيق حلقات لإدارة الدورات القرآنية
        </div>
      </div>
    </v-col>

    <v-col class="flex flex-col justify-center items-center bg-primary-darken-3">
      <NuxtPage />
    </v-col>


    <base-toaster v-model="toasterShow">{{ toasterMsg }}</base-toaster>

  </v-row>
</template>

<script setup lang="ts">
const toasterStore = useToasterStore()

const { toasterMsg, toasterShow } = storeToRefs(toasterStore)
</script>
