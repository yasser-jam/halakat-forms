<template>
  <v-select placeholder="الدخل الشهري" :items="salaryRanges"></v-select>
</template>

<script setup lang="ts">
const salaryRanges = ref<{ title: string; value: string }[]>([
  {
    title: "أقل من 500 ألف",
    value: "< 500 000",
  },
  {
    title: "500 ألف - 1 مليون",
    value: "> 500 000 & < 1000 000",
  },
  {
    title: "1 مليون - 2 مليون",
    value: "> 1000 000 & < 2000 000",
  },
  {
    title: "2 مليون - 4 مليون",
    value: "> 2000 000 & < 4000 000",
  },
  {
    title: "أكثر من 4 مليون",
    value: "> 4000 000",
  },
]);
</script>
