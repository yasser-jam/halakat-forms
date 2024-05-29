<template>
  <v-container>
    <div class="flex justify-between mt-4 mb-6">
      <div class="text-3xl font-semibold">قائمة الطلاب</div>

      <v-btn color="primary" elevation="0" to="/students/create"
        >إضافة طالب جديد</v-btn
      >
    </div>
    <v-card>
      <v-card-text>
        <v-text-field
          v-model="key"
          prepend-inner-icon="mdi-magnify"
          placeholder="ابحث..."
          variant="outlined"
          size="small"
          @update:model-value="search"
        />

        <client-only>
          <v-data-table-server
            :headers="headers"
            :items="students"
            :items-length="studentsTotalCount"
            :loading="pending"
            :items-per-page="10"
            :page="1"
          >
            <template #item.name="{ item }">
              <div class="flex items-center gap-4 my-2">
                <div class="w-12 h-12 rounded-full bg-gray-200"></div>
  
                <div class="flex flex-col gap-1">
                  <div class="text-md font-weight-bold">
                    {{ item.first_name + " " + item.last_name }}
                  </div>
                  <div class="text-xs font-bold text-gray-400">
                    الصف {{ item.educational_class }}
                  </div>
                </div>
              </div>
            </template>
  
            <template #item.halakah_name="{ item }">
              <v-chip color="blue">اسم الحلقة</v-chip>
            </template>
  
            <template #item.preserved_parts="{ item }">
              <v-chip color="warning">{{
                getParts(item.preserved_parts)
              }}</v-chip>
            </template>
  
            <template #item.points="{ item }">
              <v-chip color="info">250 نقطة</v-chip>
            </template>
  
            <template #item.phone_number="{ item }">
              <v-chip color="success">{{ item.student_mobile_number }}</v-chip>
            </template>
  
            <template #item.actions="{ item }">
              <div class="flex gap-2 justify-end">
                <v-btn
                  color="blue"
                  variant="tonal"
                  size="x-small"
                  :rounded="false"
                  class="rounded-lg"
                  icon="mdi-pencil"
                  :to="`students/${item.id}`"
                ></v-btn>
                <v-btn
                  color="error"
                  variant="tonal"
                  size="x-small"
                  :rounded="false"
                  class="rounded-lg"
                  icon="mdi-trash-can"
                  @click="openDeleteDialog(item.id as number)"
                ></v-btn>
              </div>
            </template>
  
            <template #bottom></template>
          </v-data-table-server>
        </client-only>

      </v-card-text>
    </v-card>
  </v-container>

  <base-delete-dialog v-model="deleteToggler" :loading="deleteLoading" @delete="remove"></base-delete-dialog>

  <NuxtPage />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useStudentStore } from "~/stores/student";
import type { Student } from "~/types";

const studentStore = useStudentStore();

const { headers, paginationOptions, students, studentsTotalCount } =
  storeToRefs(studentStore);

const key = ref<string>("");

const deleteToggler = ref<boolean>(false)
const deletedId = ref<number>()
const deleteLoading = ref<boolean>(false)

const { pending, data, refresh } = useLazyAsyncData<Student[]>(() =>
  studentStore.list()
);

const openDeleteDialog = (id: number) => {
  deletedId.value = id
  deleteToggler.value = true
}

const remove = async () => {
  
  deleteLoading.value = true
  
  try {
    await studentStore.remove(deletedId.value as number)
  
    await refresh()
  
  } finally {
    deleteLoading.value = false
    deleteToggler.value = false
  }
}

const search = () => {
  data.value = students.value.filter((stud) =>
    stud.first_name.includes(key.value)
  );
};
</script>
