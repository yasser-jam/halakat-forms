<template>
  <div class="pa-4">
    <!-- Placeholder for achievements -->
    <base-not-found>
      <template #subtitle>
        <div class="text-xl font-semibold mt-2">الإنجازات قيد التطوير</div>
        <div class="text-gray-600 mt-2">سيتم إضافة قسم الإنجازات والجوائز قريباً</div>
      </template>
      
      <template #action>
        <v-btn
          color="primary"
          class="mt-4"
          prepend-icon="mdi-trophy"
          disabled
        >
          إضافة إنجاز
        </v-btn>
      </template>
    </base-not-found>
  </div>
</template>

<script setup lang="ts">
// This component will be populated later with achievements and awards
</script>
