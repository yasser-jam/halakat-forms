<template>
  <base-dialog width="700" :loading @save="create">
    <template #title> معلومات الحلقة </template>

    <v-row>
      <v-col cols="12">
        <base-label>اسم الحلقة</base-label>

        <v-text-field
          v-model="group.title"
          placeholder="حلقة الحفاظ"
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <base-label>الصف</base-label>

        <sys-class-select v-model="group.class" />
      </v-col>

      <v-col cols="12">
        <base-label>اسم الأستاذ</base-label>

        <teacher-select v-model="group.currentTeacherId" />
      </v-col>
    </v-row>
  </base-dialog>
</template>

<script setup lang="ts">
const groupStore = useGroupStore();

const { group } = storeToRefs(groupStore);

const loading = ref(false);

const route = useRoute();

const campaignId = route.params.campaign_id;

const create = async () => {
  loading.value = true;

  try {
    await groupStore.create(Number(campaignId));

    navigateTo(`/campaigns/${campaignId}/groups-management`);
  } finally {
    loading.value = false;
  }
};
</script>
