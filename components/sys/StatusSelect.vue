<template>
  <v-select
    placeholder="اختر الحالة"
    :items="existStatus"
  ></v-select>
</template>

<script setup lang="ts">
const existStatus = ref<{ title: string; value: string }[]>([
  {
    title: "موجود",
    value: "ALIVE",
  },
  {
    title: "متوفى",
    value: "DEAD",
  },
  {
    title: "مفقود",
    value: "MISSED",
  },
]);
</script>
