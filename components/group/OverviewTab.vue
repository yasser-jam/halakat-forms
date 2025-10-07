<template>
  <div class="pa-4">
    <!-- Placeholder for future teacher and student lists with stats -->
    <base-not-found>
      <template #subtitle>
        <div class="text-xl font-semibold mt-2">قائمة المعلمين والطلاب قيد التطوير</div>
        <div class="text-gray-600 mt-2">سيتم إضافة قوائم المعلمين والطلاب مع الإحصائيات قريباً</div>
      </template>
      
      <template #action>
        <v-btn
          color="primary"
          class="mt-4"
          prepend-icon="mdi-account-group"
          disabled
        >
          إدارة الأعضاء
        </v-btn>
      </template>
    </base-not-found>
  </div>
</template>

<script setup lang="ts">
// This component will be populated later with teacher and student lists
// along with relevant statistics
</script>
