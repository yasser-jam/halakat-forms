<template>
  <base-loader v-if="attendanceStatus == 'pending'" />

  <v-container v-else>
    <div class="text-3xl font-semibold mb-8">سجل التفقد</div>

    <template v-for="group in groups" :key="group.id">
      <div class="my-4">
        <div class="text-gray-800 font-semibold text-2xl">
          {{ group.title }}
        </div>

        <div class="text-gray-500">
          {{
            `الأستاذ ${group.currentTeacher?.first_name} ${group.currentTeacher?.last_name}`
          }}
        </div>
      </div>

      <v-row>
        <v-col cols="2" class="m-0">
          <div class="bg-white">
            <div class="text-base font-semibold shrink-0 me-4 p-4 h-16">
              الطالب \ التاريخ
            </div>

            <div
              v-for="students in group.students"
              class="text-sm font-semibold shrink-0 me-4 px-4 py-2 leading-none h-14"
            >
              {{ `${students.first_name} ${students.last_name}` }}
            </div>
          </div>
        </v-col>

        <v-col cols="10">
          <div class="bg-white overflow-auto">
            <div class="flex space-between items-center gap-2 p-4">
              <v-chip
                v-for="date in dates"
                color="success"
                class="shrink-0"
              >
              {{ getFormatDate(String(date)) }}
              </v-chip>
            </div>

            <div>
              <div
                v-for="student in group.students"
                :key="student.id"
                class="flex justify-between gap-2 p-4"
              >
                <attend-chip
                  v-for="attend in getAttendances(Number(student.id))"
                  :status="attend.status"
                  :delay-time="attend.delayTime"
                  class="mx-2 shrink-0"
                />
              </div>

              <v-divider></v-divider>
            </div>
          </div>
        </v-col>
      </v-row>
    </template>
  </v-container>

  <NuxtPage />
</template>

<script setup lang="ts">
const campaignStore = useCampaignStore();
const groupStore = useGroupStore();
const attendanceStore = useAttendanceStore();

const campaignId = useCookie("campaign_id");
const { campaign } = storeToRefs(campaignStore);

const { groups } = storeToRefs(groupStore);

const { attendances } = storeToRefs(attendanceStore);

// Compute unique dates from attendances
const dates = computed(() => {
  return new Set(attendances.value?.map((el) => el.takenDate));
});


// Get attendances filtered by student ID
const getAttendances = (id: number) =>
  attendances.value.filter((el) => el.studentId == id);

// Get attendance status for specific student and date
const getAttendanceStatus = (studentId: number, date: string) => {
  // Check if attendances.value exists before using it
  if (!attendances.value) return "MISSED";

  const studentAttendance = attendances.value.find(
    (attend) =>
      attend.studentId === studentId &&
      String(attend.takenDate) === String(date)
  );

  return studentAttendance ? studentAttendance.status : "MISSED";
};

const { status: campaignStatus } = useLazyAsyncData(() =>
  campaignStore.get(Number(campaignId.value))
);
useLazyAsyncData(() => groupStore.list());

const { status: attendanceStatus } = useLazyAsyncData("list_attendance", () =>
  attendanceStore.list(Number(groups.value?.[0]?.id))
);

const getFormatDate = (date: string) =>
  `${new Date(date).toLocaleDateString("ar-SA", {
    weekday: "long",
  })} ${new Date(date).toLocaleDateString("en", {
    day: "numeric",
    month: "numeric",
  })}`;

const deleteToggler = ref<boolean>(false);
const deletedId = ref<number>();
const deleteLoading = ref<boolean>(false);

const openDeleteDialog = (id: number) => {
  deletedId.value = id;
  deleteToggler.value = true;
};
</script>
