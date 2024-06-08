<template>
  <v-card>
    <v-card-text class="flex flex-col items-center">
      <v-avatar
        icon="mdi-account-multiple"
        size="x-large"
        class="text-xl mb-4"
        color="primary"
      ></v-avatar>

      <div class="text-lg font-bold">حلقة {{ group.title }}</div>

      <div class="text-md text-gray-500">
        أ. {{ `${group.teacher?.first_name} ${group.teacher?.last_name}` }}
      </div>

      <v-chip color="blue" class="mt-4"
        >{{ group.students?.length }} طالب</v-chip
      >

      <div class="flex justify-between w-full gap-2 mt-4">
        <v-btn
          variant="tonal"
          size="x-small"
          rounded="lg"
          icon="mdi-delete"
          color="error"
        ></v-btn>
        <v-btn variant="text" :to="`halakat/${group.id}`">التفاصيل</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{
  group: Group;
}>();
</script>
