<template>
  <v-select
    :items="teachers"
    :item-title="(item) => `${item.first_name} ${item.last_name}`"
    item-value="id"
    :loading
    placeholder="اختر الأستاذ"
  >
    <template v-slot:selection="{ item }">
      <v-chip color="blue">
        {{ `${item.raw.first_name} ${item.raw.last_name}` }}</v-chip
      >
    </template>
  </v-select>
</template>

<script setup lang="ts">
const teacherStore = useTeacherStore();

const { pending: loading } = useLazyAsyncData<Teacher[]>(() =>
  teacherStore.list()
);

const { teachers } = storeToRefs(teacherStore);
</script>
