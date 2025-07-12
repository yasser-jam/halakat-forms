<template>
  <v-container>
    <div class="flex justify-between mt-4 mb-6">
      <div class="text-3xl font-semibold">حلقات الدورة</div>

      <div class="flex gap-2">
        <v-btn color="blue" variant="tonal" to="/groups-management/create"
          >إضافة حلقة جديدة</v-btn
        >
      </div>
    </div>

    <template v-if="status == 'pending'">
      <base-loader />
    </template>



    <template v-else-if="groups?.length">
      <v-card v-for="group in groups" class="mb-4"">
        <v-card-title>
          <div class="flex items-center">
            <div>
              <v-icon size="small">mdi-account-multiple-outline</v-icon>
              <span class="text-lg font-semibold ms-2">{{
                group?.title
              }}</span>
  
              <v-chip size="small" class="ms-1" color="secondary">
                {{
                  `${group.currentTeacher?.first_name} ${group.currentTeacher?.last_name}`
                }}
              </v-chip>
            </div>
  
            <v-spacer></v-spacer>
  
            <div class="flex items-center gap-2">
              <v-btn color="error" @click="openDeleteDialog(Number(group.id))">إزالة الحلقة</v-btn>
  
              <student-add-menu
                :selected-students="group?.students"
                @select="assignStudents(group.id!, $event)"
              ></student-add-menu>
            </div>
  
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
    </template>


    <template v-else>
      <base-not-found>
      <template #action>

        <v-btn to="/groups-management/create" class="mt-4">إضافة حلقة</v-btn>
      </template>
    </base-not-found>
    </template>
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

const { status, data, refresh } = useLazyAsyncData<Student[]>(() =>
  studentStore.listUnassigned()

  // studentStore.list()
);

// list groups
const { pending: groupsLoading, refresh: refreshGroups } = useLazyAsyncData(
  'list_groups',
  () => groupStore.list()
);

const openDeleteDialog = (id: number) => {
  deletedId.value = id

  deleteToggler.value = true
}

const remove = async () => {
  deleteLoading.value = true;

  try {
    await groupStore.remove(deletedId.value as number);

    await refreshGroups();
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
        Number(stud.id)
      );
    }

    await refreshNuxtData('list_unassigned_students')

    await refreshGroups();

    useToasterStore().success('تم إضافة الطالب بنجاح');
  } finally {
    loading.value = false;
  }
};

const unAssignStudent = async (groupId: number, studentId: number) => {
  try {
    await groupStore.unassign(groupId, studentId);

    await refreshGroups();
  } finally {
  }
};
</script>
