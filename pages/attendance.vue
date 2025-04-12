<template>

<base-loader v-if="status == 'pending'" />

<v-container v-else>
        <div class="text-3xl font-semibold mb-8">سجل التفقد</div>



        <template v-for="group in groups">
            <div class="my-4">
                <div class="text-gray-800 font-semibold text-2xl">
                    {{ group.title }}
                </div>

                <div class="text-gray-500">
                    {{ `الأستاذ ${group.currentTeacher?.first_name} ${group.currentTeacher?.last_name}` }}
                </div>
            </div>

            <v-row>
                <v-col cols="2" class="m-0">
                    <div class="bg-white">
                        <div class="text-base font-semibold shrink-0 me-4 p-4 h-16">
                            الطالب \ التاريخ
                        </div>

                        <div v-for="students in group.students" class="text-sm font-semibold shrink-0 me-4 px-4 py-2 leading-none h-14">
                            {{ `${students.first_name} ${students.last_name}` }}
                        </div>
                    </div>
                </v-col>
    
                <v-col cols="10">
                    <div class="bg-white overflow-auto">
    
                        <div class="flex space-between items-center gap-2 p-4">
                            <v-chip v-for="date in campaignDates" :key="date.date.toISOString()" color="success" class="shrink-0">
                                {{ `${date.dayName} ${date.formattedDate}` }}
                            </v-chip>
                        </div>
    
                        <div>
                            <div v-for="student in group.students" :key="student.id" class="flex justify-between gap-2 p-4">
                                <attend-chip v-for="date in campaignDates" :key="date.date.toISOString()" status="MISSED" class="mx-2 shrink-0" />
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

const campaignStore = useCampaignStore()
const groupStore = useGroupStore()
const attendanceStore = useAttendanceStore();

const campaignId = useCookie('campaign_id');
const { campaign } = storeToRefs(campaignStore)

const { groups } = storeToRefs(groupStore)

const { status: campaignStatus } = useLazyAsyncData(() => campaignStore.get(Number(campaignId.value)))
const { status } = useLazyAsyncData(() => groupStore.list())

const generateCampaignDates = () => {
  if (!campaign.value?.startDate || !campaign.value?.days) return [];

  const startDate = new Date(campaign.value.startDate);
  const endDate = campaign.value.endDate ? new Date(campaign.value.endDate) : new Date();
  const selectedDays = campaign.value.days.split(',').map(day => day.trim().toLowerCase());
  
  const dates = [];
  const currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase();
    
    if (selectedDays.includes(dayName)) {
      dates.push({
        date: new Date(currentDate),
        dayName: currentDate.toLocaleDateString('ar-SA', { weekday: 'long' }),
        formattedDate: currentDate.toLocaleDateString('ar-SA', { day: 'numeric', month: 'numeric' })
      });
    }
    
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return dates;
};

const campaignDates = computed(() => generateCampaignDates());

const groupBy = ref([
    {
        key: 'teacher_name',
        order: 'asc',
    },
])

const headers = ref([
    {
        title: 'الاسم',
        align: 'start',
        sortable: false,
        key: 'name',
    },
    {
        title: 'التاريخ',
        align: 'center',
        children: [
            { title: 'الأربعاء 12/2', value: 'wed' },
            { title: 'السبت 15/2', value: 'sat' },
            { title: 'الاثنين 17/2', value: 'mon' },
        ],
    },
    { title: 'الحضور', key: 'attend' },
    { title: '', key: 'actions' },
])

const data = ref([
    {
        name: 'مسعود الطباع',
        attend: [{
            wed: 'MISSED',
            sat: 'ATTEND',
            mon: 'DELAY',
        }],
        teacher_name: 'ياسر جمال الدين'
    },
    {
        name: 'مرهف إحساس',
        attend: [{
            wed: 'MISSED',
            sat: 'ATTEND',
            mon: 'DELAY',
        }],
        teacher_name: 'ياسر جمال الدين',
    },
    {
        name: 'مبارك عيد',
        attend: [{
            wed: 'MISSED',
            sat: 'ATTEND',
            mon: 'DELAY',
        }],
        teacher_name: 'عمار عنوز'
    },
])


const deleteToggler = ref<boolean>(false);
const deletedId = ref<number>();
const deleteLoading = ref<boolean>(false);


const openDeleteDialog = (id: number) => {
    deletedId.value = id;
    deleteToggler.value = true;
};
</script>