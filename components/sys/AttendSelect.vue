<template>
  <v-select placeholder="اختر الحالة" :items="existStatus"></v-select>
</template>

<script setup lang="ts">
const existStatus = ref<{ title: string; value: string }[]>([
  {
    title: 'لم يؤخذ بعد',
    value: 'NOT_TAKEN',
  },
  {
    title: 'حاضر',
    value: 'ATTEND',
  },
  {
    title: 'غائب',
    value: 'MISS',
  },
  {
    title: 'متأخر',
    value: 'DELAY',
  },
]);
</script>
