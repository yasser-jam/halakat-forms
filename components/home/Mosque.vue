<template>
  <v-card>
    <v-card-text>
      <div class="flex items-center gap-3 mb-4">
        <v-icon size="large" color="primary">mdi-mosque-outline</v-icon>
        <div class="text-2xl font-semibold">معلومات المسجد</div>
      </div>

      <!-- Campaign Name -->
      <div class="mb-4 p-3 bg-blue-50 rounded-lg">
        <div class="flex items-center gap-2 mb-2">
          <v-icon color="blue-darken-2">mdi-home-city-outline</v-icon>
          <span class="text-sm text-gray-600 font-semibold">اسم المسجد</span>
        </div>
        <div class="text-xl font-bold text-blue-900">
          {{ mosque?.name || 'غير محدد' }}
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';

const mosqueStore = useMosqueStore();
const { mosque } = storeToRefs(mosqueStore);
</script>
