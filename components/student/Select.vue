<template>
  <v-select
    multiple
    :items="students"
    :item-title="(item) => `${item.first_name} ${item.last_name}`"
    item-value="id"
    :loading
    placeholder="اختر الطلاب"
  >
    <template v-slot:selection="{ item }">
      <v-chip color="primary">
        {{ `${item.raw.first_name} ${item.raw.last_name}` }}</v-chip
      >
    </template>
  </v-select>
</template>

<script setup lang="ts">
const studentStore = useStudentStore();

const { pending: loading } = useLazyAsyncData<Student[]>(() =>
  studentStore.list()
);

const { students } = storeToRefs(studentStore);
</script>
