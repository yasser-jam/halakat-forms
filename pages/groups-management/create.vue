<template>
  <base-dialog width="700" :loading @save="create" @close="goBack">
    <template #title> معلومات الحلقة </template>

    <v-row>
      <v-col cols="12">
        <base-label>اسم الحلقة</base-label>

        <v-text-field
          v-model="group.title"
          placeholder="حلقة الحفاظ"
        ></v-text-field>
      </v-col>

      <!-- <v-col cols="12">
          <base-label>الصف</base-label>
  
          <sys-class-select v-model="group.class" />
        </v-col> -->

      <v-col cols="12">
        <base-label>اسم الأستاذ</base-label>

        <teacher-select v-model="group.currentTeacherId" only-unassigned />
      
      </v-col>
    </v-row>
  </base-dialog>
</template>

<script setup lang="ts">
const groupStore = useGroupStore();
const teacherStore = useTeacherStore();

const { group, groups } = storeToRefs(groupStore);
const { teachers } = storeToRefs(teacherStore);

const loading = ref(false);

const confirmToggler = ref(false);

const route = useRoute();

const campaignId = useCookie('campaign_id');

groupStore.reset();

// list groups to get all current teachers
await useLazyAsyncData(() => groupStore.list());

const unAssignedTeachers = computed(() =>
  teachers.value?.filter(
    (teacher) =>
      groups.value?.findIndex((el) => el.currentTeacherId == teacher.id) == -1
  )
);

const create = async () => {
  loading.value = true;

  try {
    await groupStore.create();

    await groupStore.list()

    navigateTo('/groups-management');
  } finally {
    loading.value = false;
  }
};

const checkTeacher = () => {};

const goBack = () => navigateTo('/groups-management');
</script>
