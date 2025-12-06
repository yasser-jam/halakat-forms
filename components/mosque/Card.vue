<template>
  <v-card class="relative">
    <v-card-text class="flex flex-col justify-center static">
      <v-chip
        color="primary"
        size="large"
        class="position-absolute left-4 top-4"
        >مسجد</v-chip
      >

      <div class="text-2xl font-weight-bold text-priamry mb-4">
        {{ mosque.name }}
      </div>

      <div class="flex items-center gap-2">
        <div class="text-base text-gray-400">
          المدينة:
          <v-chip color="blue">{{
            mosque.city
          }}</v-chip>
        </div>
  
        <div class="text-base text-gray-400">
          المنطقة:
          <v-chip color="success">{{
            mosque.address_area
          }}</v-chip>
        </div>

      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { Mosque } from '~/types';

defineProps<{
  mosque: Mosque;
}>();
</script>


