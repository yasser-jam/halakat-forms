<template>
  <base-dialog
    width="500"
    :loading="status == 'pending'"
    @save="assign"
    @close="goBack"
  >
    <template #title>إضافة طالب</template>

    <v-row>
      <v-col cols="12">
        <base-label>الصف</base-label>

        <sys-class-select v-model="studentClass" />
      </v-col>

      <v-col cols="12">
        <base-label>الطلاب</base-label>

        <v-select
          v-model="studentId"
          :items="students"
          item-value="id"
          :item-title="(stud: Student) => `${stud.first_name} ${stud.last_name}`"
          placeholder="اختر الطلاب"
        ></v-select>
      </v-col>
    </v-row>
  </base-dialog>
</template>

<script setup lang="ts">
const groupStore = useGroupStore();
const studentStore = useStudentStore();

const { students } = storeToRefs(studentStore);

const route = useRoute();

const campaignId = route.params.campaign_id;
const groupId = route.params.group_id

const studentClass = ref();

const studentId = ref();

const { status } = useLazyAsyncData(() =>
  studentStore.listUnassigned(Number(campaignId))
);

const assign = async () => {
  status.value = 'pending';

  try {
    await groupStore.assign(
      Number(groupId),
      studentId.value,
      Number(campaignId)
    );

    await refreshNuxtData('list_groups')

  } finally {
    status.value = 'idle';
  }
};

const goBack = () => {
  navigateTo(`/campaigns/${campaignId}/groups-management`);
};
</script>
