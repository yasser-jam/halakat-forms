<template>
  <v-menu v-model="menu" :close-on-content-click="false" offset-y>
    <template #activator="{ props }">
      <v-btn v-bind="props" icon="mdi-filter-variant" rounded="sm" size="small">
      </v-btn>
    </template>

    <v-card min-width="500">
      <v-card-title class="text-lg font-semibold">تصفية السجلات</v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <base-label>من تاريخ</base-label>
            <base-datepicker v-model="localFilters.dateFrom" />
          </v-col>
          <v-col cols="12" md="6">
            <base-label>إلى تاريخ</base-label>
            <base-datepicker v-model="localFilters.dateTo" />
          </v-col>
          <v-col cols="12" md="6">
            <base-label>الأستاذ</base-label>
            <teacher-select
              v-model="localFilters.teacherId"
              :only-unassigned="false"
            />
          </v-col>
          <v-col cols="12" md="6">
            <base-label>الطالب</base-label>
            <student-select
              v-model="localFilters.studentId"
              :multiple="false"
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="resetFilter">إعادة تعيين</v-btn>
        <v-btn variant="elevated" @click="applyFilter">تطبيق</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { useSavingSessionStore } from '~/stores/saving-session';
import baseDatepicker from '~/components/base/Datepicker.vue';
import teacherSelect from '~/components/teacher/Select.vue';
import studentSelect from '~/components/student/Select.vue';
import baseLabel from '~/components/base/Label.vue';

const menu = ref(false);
const savingSessionStore = useSavingSessionStore();
const { filters } = storeToRefs(savingSessionStore);

const localFilters = reactive({
  dateFrom: filters.value.dateFrom || '',
  dateTo: filters.value.dateTo || '',
  teacherId: filters.value.teacherId || null,
  studentId: filters.value.studentId || null,
});

const applyFilter = () => {
  filters.value.dateFrom = localFilters.dateFrom;
  filters.value.dateTo = localFilters.dateTo;
  filters.value.teacherId = localFilters.teacherId as number;
  filters.value.studentId = localFilters.studentId as number;
  menu.value = false;
  savingSessionStore.filter();
};

const resetFilter = () => {
  localFilters.dateFrom = '';
  localFilters.dateTo = '';
  localFilters.teacherId = null;
  localFilters.studentId = null;
  applyFilter();
};
</script>
