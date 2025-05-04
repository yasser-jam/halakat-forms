<template>
  <v-chip :color="delayStatus.color">{{ delayStatus.title }}</v-chip>
    {{ delayTime }}
</template>

<script setup lang="ts">
const props = defineProps<{
  status: "NOT_TAKEN" | "DELAY" | "ATTEND" | "MISSED" | string;
  delayTime: number;
}>();

const delayStatus = computed(() => {
  if (props.delayTime == 0)
    return {
      color: "success",
      title: "حاضر",
    };
  else if (props.delayTime == -1)
    return {
      color: "gray",
      title: "لم يؤخذ بعد",
    };
  else if (props.delayTime == 1000)
    return {
      color: "error",
      title: "غائب",
    };
  else
    return {
      color: "warning",
      title: "تأخر",
    };
});

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
