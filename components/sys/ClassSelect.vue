<template>
  <v-select
    :items="classes"
    placeholder="الصف السابع"
  ></v-select>
</template>

<script setup lang="ts">
const classes = ref<{ title: string; value: string }[]>([
  {
    title: "الصف السابع",
    value: "7",
  },
  {
    title: "الصف الثامن",
    value: "8",
  },
  {
    title: "الصف التاسع",
    value: "9",
  },
  {
    title: "الصف العاشر",
    value: "10",
  },
  {
    title: "الصف الحادي عشر",
    value: "11",
  },
  {
    title: "بكالوريا",
    value: "12",
  },
]);
</script>
