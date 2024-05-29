<template>
  <div
    class="flex justify-between items-center border-1 border-dashed  md:py-4 px-4"
    :class="`${colorsClasses.text} ${colorsClasses.bg} ${colorsClasses.border}`"
  >
    <div>
      <div class="text-sm md:text-lg font-semibold">{{ title }}</div>
      <div class="hidden md:block text-md text-gray-400 font-semibold mt-2">
        {{ subtitle }}
      </div>
    </div>

    <v-switch :model-value="modelValue" :color @update:model-value="$emit('update:model-value', $event)"></v-switch>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: boolean,
    title: string;
    subtitle?: string;
    color?: "primary" | "secondary" | "warning";
  }>(),
  {
    color: "primary",
  }
);

const colorsClasses = computed(() => {
  switch (props.color) {
    case "primary":
      return {
        text: "text-primary",
        border: "border-primary",
        bg: "bg-[#EFFEFD]",
      };

    case "warning":
      return {
        text: "text-warning",
        border: "border-warning",
        bg: "bg-[#FFF9EE]",
      };

    default:
      return {
        text: "text-primary",
        border: "border-primary",
        bg: "bg-[#EFFEFD]",
      };
  }
});
</script>
