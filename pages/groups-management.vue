<template>
  <v-container>
    <div class="flex justify-between mt-4 mb-6">
      <div class="text-3xl font-semibold">حلقات الدورة</div>

      <div class="flex gap-2">
        <v-btn color="blue" variant="tonal" to="groups-management/create"
          >إضافة حلقة جديدة</v-btn
        >
      </div>
    </div>

    <v-row>
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

      <!-- Todo: apply draggable -->
      <v-col v-if="false" cols="12" md="3">
        <v-card :loading="pending || groupsLoading">
          <div class="flex justify-between bg-gray-100 p-4">
            <div class="text-lg font-semibold">أسماء الطلاب</div>

            <v-menu
              v-model="filterToggler"
              width="300"
              :close-on-content-click="false"
            >
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  variant="tonal"
                  rounded
                  size="small"
                  icon="mdi-filter-outline"
                ></v-btn>
              </template>

              <v-card>
                <v-card-text>
                  <div>
                    <div class="label mb-1">الاسم</div>
                    <v-text-field placeholder="اسم الطالب"></v-text-field>
                  </div>

                  <div>
                    <div class="label mb-1">الصف</div>
                    <sys-class-select />
                  </div>
                </v-card-text>
              </v-card>
            </v-menu>
          </div>

          <div class="max-h-[500px] overflow-auto">
            <template v-for="student in students">
              <div class="flex items-center gap-2 bg-white px-4 py-3">
                <v-icon>mdi-drag</v-icon>

                <div class="">
                  {{ `${student.first_name} ${student.last_name}` }}
                </div>
                <v-spacer></v-spacer>
                <v-chip size="small">{{
                  getClassName(Number(student.educational_class))
                }}</v-chip>
              </div>
              <v-divider></v-divider>
            </template>
          </div>
        </v-card>

        <!-- <v-row>
          <v-col v-for="group in groups" md="4">
            <group-dist-card :group />
          </v-col>
        </v-row> -->
      </v-col>

      <v-col cols="12">
        <!-- <div class="text-lg font-semibold">أسماء الحلقات</div> -->

        <v-card v-for="group in groups" class="mb-4">
          <v-card-title>
            <div class="flex items-center">
              <div>
                <v-icon size="small">mdi-account-multiple-outline</v-icon>
                <span class="text-lg font-semibold ms-2">{{
                  group.title
                }}</span>
                <!-- <v-chip size="small" color="secondary">{{ getClassName(Number(group.class)) }}</v-chip> -->
              </div>

              <v-spacer></v-spacer>

              <student-add-menu
                :selected-students="group.students"
                @select="assignStudents(group.id!, $event)"
              ></student-add-menu>
            </div>
          </v-card-title>
          
          <v-card-text>
            <div
              class="flex flex-col items-center gap-2 max-h-[300px] overflow-auto mt-2"
            >
              <template v-if="group.students?.length">
                <student-inline-card
                  v-for="student in group.students"
                  :student
                  class="w-full shrink-0"
                  @unlink="
                    unAssignStudent(Number(group.id), Number(student.id))
                  "
                />
                <!-- {{ `${student.first_name} ${student.last_name}` }} -->
              </template>

              <template v-else>
                <div>لا يوجد أي طالب</div>
                <student-list-menu
                  @select="assignStudents(group.id!, $event)"
                ></student-list-menu>
              </template>
            </div>
          </v-card-text>
        </v-card>
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
import { useStudentStore } from '~/stores/student';
import type { Student } from '~/types';

const studentsMenu = ref(false);

const groupStore = useGroupStore();
const studentStore = useStudentStore();

const route = useRoute();
const campaignId = useCookie('campaign_id');

const { students } = storeToRefs(studentStore);

const { groups } = storeToRefs(groupStore);

const key = ref<string>('');

const deleteToggler = ref<boolean>(false);
const deletedId = ref<number>();
const deleteLoading = ref<boolean>(false);

const loading = ref(false);

const filterToggler = ref(false);

const { pending, data, refresh } = useLazyAsyncData<Student[]>(() =>
  // studentStore.listUnassigned(Number(campaignId))

  studentStore.list()
);

// list groups
const { pending: groupsLoading, refresh: refreshGroups } = useLazyAsyncData(
  'list_groups',
  () => groupStore.list()
);

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

const assignStudents = async (groupId: number, students: Student[]) => {
  loading.value = true;

  try {
    for (let stud of students) {
      await groupStore.assign(
        groupId,
        Number(stud.id),
        Number(campaignId.value)
      )
    }

    await refreshGroups();

    useToasterStore().success('تم إضافة الطالب بنجاح');
  
  } finally {
    loading.value = false;
  }
};

const unAssignStudent = async (groupId: number, studentId: number) => {
  try {
    await groupStore.unassign(groupId, studentId, Number(campaignId.value));

    await refreshGroups();
  } finally {
  }
};
</script>
