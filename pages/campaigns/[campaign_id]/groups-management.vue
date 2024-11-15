<template>
  <v-container>
    <div class="flex justify-between mt-4 mb-6">
      <div class="text-3xl font-semibold">حلقات الدورة</div>

      <div class="flex gap-2">
        <v-btn color="blue" variant="tonal" :to="`${baseRoute}/create`"
          >إضافة حلقة جديدة</v-btn
        >

        <v-btn color="primary" elevation="0">حفظ التعديلات</v-btn>
      </div>
    </div>

    <v-row>

      <div v-if="pending || groupsLoading">loading</div>

      <!-- <template v-else>
        <v-col cols="12" md="4">
          <v-card>
            <v-card-text>
              <div class="flex justify-between">
                <div class="text-xl font-semibold mb-8">قائمة الطلاب</div>
  
                <v-btn size="small" variant="outlined">توزيع حسب الصف</v-btn>
              </div>
  
              <base-label>اختيار الصف</base-label>
              <sys-class-select />
  
              <div class="flex flex-col gap-4 max-h-[400px] overflow-auto">
                <student-inline-card class="shrink-0" v-for="i in 10" />
              </div>
            </v-card-text>
          </v-card>
        </v-col>

      </template> -->

      <v-col v-else cols="12" md="12">
        <v-row>
          <v-col v-for="group in groups" md="4">
            <group-dist-card :group />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>

  <base-delete-dialog
    v-model="deleteToggler"
    :loading="deleteLoading"
    @delete="remove"
  ></base-delete-dialog>

  <NuxtPage />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useStudentStore } from '~/stores/student';
import type { Student } from '~/types';

const groupStore = useGroupStore()
const studentStore = useStudentStore();


const route = useRoute();
const campaignId = route.params.campaign_id;

const baseRoute = `/campaigns/${campaignId}/groups-management`;

const { students } =
  storeToRefs(studentStore);

  const { groups } = storeToRefs(groupStore)

const key = ref<string>('');

const deleteToggler = ref<boolean>(false);
const deletedId = ref<number>();
const deleteLoading = ref<boolean>(false);

const { pending, data, refresh } = useLazyAsyncData<Student[]>(() =>
  studentStore.listUnassigned(Number(campaignId))
);

// list groups
const { pending: groupsLoading } = useLazyAsyncData('list_groups', () => groupStore.list(Number(campaignId)))



const openDeleteDialog = (id: number) => {
  deletedId.value = id;
  deleteToggler.value = true;
};

const remove = async () => {
  deleteLoading.value = true;

  try {
    await studentStore.remove(deletedId.value as number);

    await refresh();
  } finally {
    deleteLoading.value = false;
    deleteToggler.value = false;
  }
};

const search = () => {
  data.value = students.value.filter((stud) =>
    stud.first_name.includes(key.value)
  );
};
</script>
