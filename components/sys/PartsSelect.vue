<template>
  <v-select
    :items="parts"  
    multiple
    placeholder="الأجزاء المحفوظة"
    :model-value="parsedOptions"
    @update:model-value="emit('update:model-value', $event.join())"
  >
    <template v-slot:selection="{ item }">
      <v-chip color="primary">الجزء {{ item.title }}</v-chip>
    </template>
  </v-select>
</template>

<script setup lang="ts">
const emit = defineEmits(["update:model-value"]);

 
const props = defineProps<{
  modelValue: string;
}>()

const parsedOptions = computed(() => {
  
  if (!props.modelValue?.length) return []
  
  return props.modelValue?.split(',').map((item, index) => ({
    title: parts.value.find(el => el.value == Number(item))?.title,
    value: Number(item),
  }));
});

const parts = ref<{ title: string; value: number }[]>([
  { title: "الأول", value: 1 },
  { title: "الثاني", value: 2 },
  { title: "الثالث", value: 3 },
  { title: "الرابع", value: 4 },
  { title: "الخامس", value: 5 },
  { title: "السادس", value: 6 },
  { title: "السابع", value: 7 },
  { title: "الثامن", value: 8 },
  { title: "التاسع", value: 9 },
  { title: "العاشر", value: 10 },
  { title: "الحادي عشر", value: 11 },
  { title: "الثاني عشر", value: 12 },
  { title: "الثالث عشر", value: 13 },
  { title: "الرابع عشر", value: 14 },
  { title: "الخامس عشر", value: 15 },
  { title: "السادس عشر", value: 16 },
  { title: "السابع عشر", value: 17 },
  { title: "الثامن عشر", value: 18 },
  { title: "التاسع عشر", value: 19 },
  { title: "العشرون", value: 20 },
  { title: "الحادي والعشرون", value: 21 },
  { title: "الثاني والعشرون", value: 22 },
  { title: "الثالث والعشرون", value: 23 },
  { title: "الرابع والعشرون", value: 24 },
  { title: "الخامس والعشرون", value: 25 },
  { title: "السادس والعشرون", value: 26 },
  { title: "السابع والعشرون", value: 27 },
  { title: "الثامن والعشرون", value: 28 },
  { title: "التاسع والعشرون", value: 29 },
  { title: "الثلاثون", value: 30 },
]);
</script>
