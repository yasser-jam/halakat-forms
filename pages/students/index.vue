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

        <v-data-table
          :headers="headers"
          :items="data"
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
                  {{ item.educational_class }}
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
              ></v-btn>
              <v-btn
                color="error"
                variant="tonal"
                size="x-small"
                :rounded="false"
                class="rounded-lg"
                icon="mdi-trash-can"
              ></v-btn>
            </div>
          </template>

          <!-- <template #bottom></template> -->
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>

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

const { pending, data, refresh } = useLazyAsyncData<Student[]>(() =>
  studentStore.list()
);

const search = () => {
  data.value = students.value.filter((stud) =>
    stud.first_name.includes(key.value)
  );
};
</script>
