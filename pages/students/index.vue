<template>
  <v-container>
    <v-card elevation="1">
      <v-card-title>
        <div class="flex justify-between items-center mt-4">
          <div class="text-2xl font-semibold">قائمة الطلاب</div>

          <v-btn color="primary" elevation="0" to="/students/create">إضافة طالب جديد</v-btn>
        </div>
      </v-card-title>

      <v-card-text>
        <v-data-table-server
          :headers="headers"
          :items="students"
          :items-length="studentsTotalCount"
          :loading="pending"
          v-model:options="paginationOptions"
          @update:options="refresh"
        >
      
        <template #item.name="{ item }">
          <div>
            name
          </div>
        </template>

        <template #item.phoneNumber="{ item }">
          <div>
            phone
          </div>
        </template>

        <template #item.actions="{ item }">
          <div>
            actions
          </div>
        </template>

      </v-data-table-server>
      </v-card-text>
    </v-card>
  </v-container>

  <NuxtPage />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useStudentStore } from '~/stores/student';


const studentStore = useStudentStore()

const { headers, paginationOptions, students, studentsTotalCount } = storeToRefs(studentStore)

const { pending, refresh } = useLazyAsyncData(() => studentStore.list())

</script>
