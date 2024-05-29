<template>
    <v-container>
      <div class="flex justify-between mt-4 mb-6">
        <div class="text-3xl font-semibold">الدورات</div>
  
        <v-btn color="primary" elevation="0" to="/campaigns/create"
          >إضافة دورة جديدة</v-btn
        >
      </div>

      <v-row>
        <v-col cols="4">
            <campaign-card></campaign-card>
        </v-col>

        <v-col cols="4">
          <campaign-card></campaign-card>
        </v-col>

        <v-col cols="4">
          <campaign-card></campaign-card>
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
  import { useStudentStore } from "~/stores/student";
  
  const studentStore = useStudentStore();
  
  const { headers, paginationOptions, students, studentsTotalCount } =
    storeToRefs(studentStore);
  
  const key = ref<string>("");
  
  const deleteToggler = ref<boolean>(false);
  const deletedId = ref<number>();
  const deleteLoading = ref<boolean>(false);
  
//   const { pending, data, refresh } = useLazyAsyncData<Student[]>(() =>
//     studentStore.list()
//   );
  
  const openDeleteDialog = (id: number) => {
    deletedId.value = id;
    deleteToggler.value = true;
  };
  
  const remove = async () => {
    deleteLoading.value = true;
  
    try {
      await studentStore.remove(deletedId.value as number);
  
      await refresh();
    } finally {
      deleteLoading.value = false;
      deleteToggler.value = false;
    }
  };
  </script>
  