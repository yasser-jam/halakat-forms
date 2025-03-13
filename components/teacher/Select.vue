<template>
  <v-select
    :items="computedValue"
    :item-title="(item: Teacher) => `${item.first_name} ${item.last_name}`"
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
const props = defineProps<{
  onlyUnassigned: boolean;
}>();

const teacherStore = useTeacherStore();

const { pending: loading } = useLazyAsyncData<Teacher[]>(() =>
  teacherStore.list()
);

const { teachers } = storeToRefs(teacherStore);

const computedValue = computed(() =>
  props.onlyUnassigned
    ? teachers.value.filter((el) => !el.groups?.length)
    : teachers.value
);
</script>
