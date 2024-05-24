<template>
  <v-select :items="marriageStatus" placeholder="متزوجان"></v-select>
</template>

<script setup lang="ts">
const marriageStatus = ref<{ title: string; value: string }[]>([
  {
    title: "متزوجان",
    value: "MARRIED",
  },
  {
    title: "منفصلان",
    value: "SEPARATED",
  },
  {
    title: "مطلقان",
    value: "DIVORCED",
  },
]);
</script>
