<template>
  <div v-if="pending" class="flex justify-center my-4">
    <v-progress-circular
      color="primary"
      size="large"
      indeterminate
    ></v-progress-circular>
  </div>

  <v-container v-else>
    <div class="flex justify-between mt-4 mb-6">
      <div class="text-3xl font-semibold">قائمة الحلقات</div>

      <v-btn color="primary" elevation="0" to="/halakat/create">
        إضافة حلقة جديدة
      </v-btn>
    </div>

    <v-row>
      <v-col v-for="group in groups" cols="12" md="4">
        <halakat-card :group></halakat-card>
      </v-col>
    </v-row>
  </v-container>

  <NuxtPage />
</template>

<script setup lang="ts">
const groupStore = useGroupStore();

const { groups } = storeToRefs(groupStore);

const { pending } = useLazyAsyncData(() => groupStore.list())

</script>
