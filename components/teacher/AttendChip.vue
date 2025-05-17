<template>
    <v-chip :color="info?.color">{{ info?.title }}</v-chip>
  </template>
  
  <script setup lang="ts">
  const props = defineProps<{
    status: "NOT_TAKEN" | "DELAY" | "ATTEND" | "MISSED" | string;
    delayTime?: number;
  }>();
  
  const info = computed(() => {
    if (props.status == "ATTEND") {
      return {
        color: "success",
        title: "حاضر",
      };
    } else if (props.status == "MISSED") {
      return {
        color: "error",
        title: "غائب",
      };
    } else if (props.status == "DELAY") {
      return {
        color: "warning",
        title: "لم يحضر بعد",
      };
    }
  });
  </script>
  