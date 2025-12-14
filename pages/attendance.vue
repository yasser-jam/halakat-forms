<template>
  
  <v-container>
    <div class="text-3xl font-semibold mb-8">سجل التفقد</div>
    
    <!-- <base-loader v-if="status == 'pending' && !campaignAttednace?.length" /> -->

    <template v-for="(item, index) in campaignAttednace">
      <div class="my-4">
        <div class="text-gray-800 font-semibold text-2xl">
          {{ item.groupTitle }}
        </div>

        <div v-for="teacher in item.groupTeachers" class="text-gray-500">
          {{ teacher }}
        </div>
      </div>
      <v-data-table :headers="generateHeaders(item.attendances)" :items="generateData(item.attendances)">

        <template #item.name="{ item }">
          <div class="font-semibold">
            {{ `${item.student?.first_name} ${item.student?.last_name}` }}
          </div>
        </template>

        <template #item.date="{ item, column }">
          <attend-chip
            :status="String(item.attendances?.find(attend => dayjs(attend.taken_date).format('MM-DD') == column.title)?.status)" @click="navigateTo(`/attendance/${item.attendances?.find(attend => dayjs(attend.taken_date).format('MM-DD') == column.title).id}`)" />

          </template>

      </v-data-table>
    </template>
  </v-container>

  <NuxtPage />
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
const groupStore = useGroupStore();
const attendanceStore = useAttendanceStore();
const campaignStore = useCampaignStore();

const { groups } = storeToRefs(groupStore);
const { attendances, campaignAttednace } = storeToRefs(attendanceStore);
const { campaign } = storeToRefs(campaignStore);

// Get campaign info first
const campaignId = useCookie('campaign_id');

// Get campaign days info
const campaignDaysInfo = computed(() => {
  if (!campaign.value || !campaign.value.days) return null;
  return getCampaignDays(campaign.value);
});

console.log(campaignDaysInfo.value);

const generateHeaders = (attendances: any[]) => {
  // Get unique dates
  let uniqueDates = Array.from(
    new Set(attendances?.map(el => dayjs(el.taken_date).format('MM-DD')))
  );

  // Filter dates based on campaign days
  if (campaignDaysInfo.value?.validDates) {
    uniqueDates = uniqueDates.filter(date => 
      campaignDaysInfo.value!.validDates.includes(date)
    );
  }

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
}

const generateData = (attendances: any[]) => {
  let students: Student[] = [];

  // Filter attendances based on campaign days
  let filteredAttendances = attendances;
  if (campaignDaysInfo.value?.validDates) {
    filteredAttendances = attendances.filter(attend => 
      campaignDaysInfo.value!.validDates.includes(dayjs(attend.taken_date).format('MM-DD'))
    );
  }

  filteredAttendances.forEach((el) => {
    if (students.findIndex(item => item.id == el.student_id) == -1) {
      students.push(el.student as Student);
    }
  });

  return students?.map(el => ({
    student: el,
    attendances: filteredAttendances?.filter(attend => attend.student_id == el.id)
  }));
}

</script>
