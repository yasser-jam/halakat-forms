<template>
    <v-select
      placeholder="اختر مقدار التأخير"
      :items="existStatus"
    ></v-select>
  </template>
  
  <script setup lang="ts">
  const existStatus = ref<{ title: string; value: number }[]>([
    {
      title: "خمس دقائق",
      value: 5,
    },
    {
      title: "عشر دقائق",
      value: 10,
    },
    {
      title: "ربع ساعة",
      value: 15,
    },
    {
      title: "نصف ساعة",
      value: 30,
    },
    {
      title: "ساعة",
      value: 60,
    },
  ]);
  </script>
  