<template>
  <v-select
    placeholder="بكالوريا، جامعي، ماجستير..."
    :items="scholarStatus"
  ></v-select>
</template>

<script setup lang="ts">
const scholarStatus = ref<{ title: string; value: string }[]>([
  {
    title: "غير متعلم",
    value: "none",
  },
  {
    title: "ابتدائية",
    value: "primary",
  },
  {
    title: "إعدادية",
    value: "secondary",
  },
  {
    title: "ثانوية",
    value: "high-school",
  },
  {
    title: "جامعة",
    value: "college",
  },
  {
    title: "ماجستير",
    value: "master",
  },
  {
    title: "دكتوراه",
    value: "phd",
  },
]);
</script>
