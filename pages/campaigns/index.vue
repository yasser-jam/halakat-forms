<template>
  <v-container>
    <div class="flex justify-between mt-4 mb-6">
      <div class="text-3xl font-semibold">الدورات</div>

      <v-btn color="primary" elevation="0" disabled to="/campaigns/create"
        >إضافة دورة جديدة</v-btn
      >
    </div>

    <v-row>
      <v-col v-for="campaign in campaigns" cols="6">
          <campaign-card :campaign @click="selectCampaign(String(campaign.id))" />
      </v-col>

    </v-row>

    <v-progress-circular v-if="loading" :indeterminate="loading"></v-progress-circular>

  </v-container>

  <base-delete-dialog
    v-model="deleteToggler"
    :loading="deleteLoading"
    @delete="remove"
  ></base-delete-dialog>

  <NuxtPage />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useStudentStore } from "~/stores/student";

definePageMeta({
  layout: 'no-sidebar'
})

const studentStore = useStudentStore();

const authStore = useAuthStore()
const campaignStore = useCampaignStore()

const { campaigns } = storeToRefs(campaignStore)

const key = ref<string>("");

const deleteToggler = ref<boolean>(false);
const deletedId = ref<number>();
const deleteLoading = ref<boolean>(false);

const campaignId = useCookie('campaign_id')

const loading = ref(false)

const { pending, data, refresh } = useLazyAsyncData<Campaign[]>(() =>
  campaignStore.list()
);

const selectCampaign = async (id: string) => {
  campaignId.value = id

  console.log(id);

  loading.value = true

  try {
    await authStore.listPermissions()
    navigateTo('/')
  } finally {
    loading.value = false
  }


}

const openDeleteDialog = (id: number) => {
  deletedId.value = id;
  deleteToggler.value = true;
};

const remove = async () => {
  deleteLoading.value = true;

  try {
    await studentStore.remove(deletedId.value as number);

  //   await refresh();
  } finally {
    deleteLoading.value = false;
    deleteToggler.value = false;
  }
};
</script>
