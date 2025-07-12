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
  } else if (props.status == "MISS") {
    return {
      color: "error",
      title: "غائب",
    };
  } else if (props.status == "DELAY") {
    return {
      color: "warning",
      title: "متأخر",
    };
  } else if (props.status == "NOT_TAKEN") {
    return {
      color: "accent",
      title: "لم يؤخذ",
    };
  }
});
</script>
