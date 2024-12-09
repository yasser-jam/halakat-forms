<template>
    <v-container>
        <div class="flex justify-between mt-4 mb-6">
            <div class="text-3xl font-semibold">حلقات الدورة</div>

            <div class="flex gap-2">
                <v-btn color="blue" variant="tonal" :to="`${baseRoute}/create`">إضافة حلقة جديدة</v-btn>

                <v-btn color="primary" elevation="0">حفظ التعديلات</v-btn>
            </div>
        </div>

        <v-row>

            <!-- <div v-if="pending || groupsLoading">loading</div> -->

            <v-col cols="12" md="12">
                <v-data-table :group-by="groupBy" :headers="headers" :items="data" item-value="teacher_name">

                    <template #item.attend="{ item }">
                        <attend-chip :status="item.attend" />
                    </template>

                </v-data-table>
            </v-col>
        </v-row>
    </v-container>

    <NuxtPage />
</template>

<script setup lang="ts">
import type { Student } from '~/types';

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
    { title: 'الحضور', key: 'attend' },
    { title: '', key: 'actions' },
])

const data = ref([
    {
        name: 'مسعود الطباع',
        attend: 'ATTEND',
        teacher_name: 'ياسر جمال الدين'
    },
    {
        name: 'مرهف إحساس',
        attend: 'DELAY',
        teacher_name: 'ياسر جمال الدين'
    },
    {
        name: 'مبارك عيد',
        attend: 'MISSED',
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