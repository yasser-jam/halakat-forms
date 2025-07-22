<template>
  <v-select :items="classes" placeholder="الصف السابع"></v-select>
</template>

<script setup lang="ts">
const classes = ref<{ title: string; value: number }[]>([
  {
    title: 'الصف الأول',
    value: 1,
  },
  {
    title: 'الصف الثاني',
    value: 2,
  },
  {
    title: 'الصف الثالث',
    value: 3,
  },
  {
    title: 'الصف الرابع',
    value: 4,
  },
  {
    title: 'الصف الخامس',
    value: 5,
  },
  {
    title: 'الصف السادس',
    value: 6,
  },
  {
    title: 'الصف السابع',
    value: 7,
  },
  {
    title: 'الصف الثامن',
    value: 8,
  },
  {
    title: 'الصف التاسع',
    value: 9,
  },
  {
    title: 'الصف العاشر',
    value: 10,
  },
  {
    title: 'الصف الحادي عشر',
    value: 11,
  },
  {
    title: 'بكالوريا',
    value: 12,
  },
  {
    title: 'جامعة',
    value: 13,
  },
]);
</script>
