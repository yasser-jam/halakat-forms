<template>
    <v-container>
        <div class="text-3xl font-semibold mb-8">سجل التفقد</div>



        <template v-for="i in 3">
            <div class="my-4">
                <div class="text-gray-800 font-semibold text-2xl">
                    حلقة الصف الثامن
                </div>

                <div class="text-gray-500">
                    الأستاذ سعيد السعدان
                </div>
            </div>

            <v-row>
                <v-col cols="2" class="m-0">
                    <div class="bg-white">
                        <div class="text-base font-semibold shrink-0 me-4 p-4 h-16">
                            الطالب \ التاريخ
                        </div>
                        <div v-for="i in 5" class="text-base font-semibold shrink-0 me-4 p-4 h-16">
                            أحمد المساهم
                        </div>
                    </div>
                </v-col>
    
                <v-col cols="10">
                    <div class="bg-white overflow-auto">
    
                        <div class="flex space-between items-center gap-2 p-4">
                            <v-chip v-for="i in 20" color="success" class="shrink-0">12/2/2024</v-chip>
                        </div>
    
                        <div>
                            <div v-for="i in 5" class="flex justify-between gap-2 p-4">
    
                                <attend-chip v-for="i in 20" status="MISSED" class="mx-2 shrink-0" />
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

const attendanceStore = useAttendanceStore();

const route = useRoute();
const campaignId = route.params.campaign_id;

const baseRoute = `/campaigns/${campaignId}/groups-management`;

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