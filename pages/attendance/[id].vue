<template>
  <base-dialog
    width="600"
    model-value="true"
    persistent
    @close="navigateTo('/attendance')"
    @save="submit"
  >
    <template #title> معلومات التفقد </template>

    <base-loader v-if="status == 'pending'" />

    <v-row v-else>
      <v-col cols="6">
        <base-label>الاسم</base-label>
        <v-text-field
          :model-value="
            attendance?.student?.first_name +
            ' ' +
            attendance?.student?.last_name
          "
          disabled
        ></v-text-field>
      </v-col>

      <v-col cols="6">
        <base-label>الحلقة</base-label>
        <v-text-field
          :model-value="attendance?.group?.title"
          disabled
        ></v-text-field>
      </v-col>

      <v-col cols="6">
        <base-label>الحالة</base-label>
        <sys-attend-select v-model="attendance.status" />
      </v-col>

      <v-col cols="6">
        <base-label>مقدار التأخر</base-label>
        <sys-delay-select
          :disabled="attendance.status != 'DELAY'"
          v-model="attendance.delay_time"
        />
      </v-col>
    </v-row>
  </base-dialog>
</template>

<script setup lang="ts">
const attendanceStore = useAttendanceStore();

const { attendance } = storeToRefs(attendanceStore);

const route = useRoute();

const attendId = route.params.id;

const { status } = useLazyAsyncData(() =>
  attendanceStore.get(Number(attendId))
);

const loading = ref(false);

const submit = async () => {
  loading.value = true;

  try {
    await attendanceStore.update(Number(attendId))

    await refreshNuxtData('list_attendances_for_campaign')


    navigateTo('/attendance')
  } finally {
    loading.value = false;
  }
};
</script>
