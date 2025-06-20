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


      <div>
        <v-data-table :headers :items="computedData">

          <template #item.name="{ item }">
            <div class="font-semibold">
              {{ `${item.student?.first_name} ${item.student?.last_name}` }}
            </div>
          </template>

          <template #item.date="{ item, column }">
            <attend-chip :status="String(item.attendances?.find(attend => dayjs(attend.takenDate).format('MM-DD') == column.title)?.status)" />
          </template>

        </v-data-table>
      </div>

      <!-- <v-row>
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
      </v-row> -->
    </template>
  </v-container>

  <NuxtPage />
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
const groupStore = useGroupStore();
const attendanceStore = useAttendanceStore();


const { groups } = storeToRefs(groupStore);

const { attendances } = storeToRefs(attendanceStore);

const headers = computed(() => {
  // Get unique dates
  const uniqueDates = Array.from(
    new Set(attendances.value?.map(el => dayjs(el.takenDate).format('MM-DD')))
  );

  const dateHeaders = uniqueDates.map(date => ({
    title: date,
    key: 'date',
    sortable: false
  }));

  return [
    {
      title: 'الاسم',
      key: 'name',
      sortable: false
    },
    ...dateHeaders
  ];
})

const computedData = computed(() => {
  let students: Student[] = []
  
  attendances.value.forEach((el) => {
    if (students.findIndex(item => item.id == el.studentId) == -1) {
      students.push(el.student as Student)
    }
  })

  return students?.map(el => ({
    student: el,
    attendances: attendances.value?.filter(attend => attend.studentId == el.id)
  }))
})


useLazyAsyncData(() => groupStore.list());

const { status: attendanceStatus } = useLazyAsyncData("list_attendance", () =>
  attendanceStore.list(Number(groups.value?.[0]?.id || 1))
);

const deleteToggler = ref<boolean>(false);
const deletedId = ref<number>();
const deleteLoading = ref<boolean>(false);

const openDeleteDialog = (id: number) => {
  deletedId.value = id;
  deleteToggler.value = true;
};
</script>
