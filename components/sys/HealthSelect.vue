<template>
  <v-select :items="healthStatus" placeholder="معافى"></v-select>
</template>

<script setup lang="ts">
const healthStatus = ref<{ title: string; value: string }[]>([
  {
    title: "معافى",
    value: "well-health",
  },
  {
    title: "مريض",
    value: "patient",
  },
]);
</script>
