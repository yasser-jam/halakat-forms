<template>
  <v-container>
    <div class="flex justify-between mt-4 mb-6">
      <div class="text-3xl font-semibold">المساجد</div>

      <v-btn color="primary" elevation="0" to="/mosque/create"
        >إضافة مسجد جديد</v-btn
      >
    </div>

    <v-row>
      <v-col v-for="mosque in mosques" cols="6">
        <mosque-card :mosque="mosque" />
      </v-col>
    </v-row>

  </v-container>

  <base-delete-dialog
    v-model="deleteToggler"
    :loading="deleteLoading"
    @delete="remove"
  ></base-delete-dialog>

  <NuxtPage />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

definePageMeta({
  layout: 'no-sidebar'
})

const mosqueStore = useMosqueStore()

const { mosques } = storeToRefs(mosqueStore)

const deleteToggler = ref<boolean>(false);
const deletedId = ref<number>();
const deleteLoading = ref<boolean>(false);

const { pending, data, refresh } = useLazyAsyncData<Mosque[]>(() =>
  mosqueStore.list()
);

const openDeleteDialog = (id: number) => {
  deletedId.value = id;
  deleteToggler.value = true;
};

const remove = async () => {
  deleteLoading.value = true;

  try {
    await mosqueStore.remove(deletedId.value as number);
    await refresh();
  } finally {
    deleteLoading.value = false;
    deleteToggler.value = false;
  }
};
</script>

