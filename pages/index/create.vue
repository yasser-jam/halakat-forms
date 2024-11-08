<template>
  <base-dialog width="700" :loading @save="create">

    <template #title>
        معلومات الدورة
    </template>


    <v-row>
      <v-col cols="12">
        <base-label>اسم الدورة</base-label>

        <v-text-field
          v-model="campaign.name"
          placeholder="دورة الحفاظ 2024"
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <base-label>موعد بداية الدورة</base-label>

        <base-datepicker v-model="campaign.startDate"></base-datepicker>
      </v-col>

      <v-col cols="12">
        <base-switch-input :model-value="true" title="الدورة مستمرة" subtitle="لا يوجد تاريخ توقف للدورة وستتجدد المعلومات تلقائياً"></base-switch-input>
      </v-col>
    </v-row>
  </base-dialog>
</template>

<script setup lang="ts">
const campaignStore = useCampaignStore();

const { campaign } = storeToRefs(campaignStore);

const loading = ref(false)

const create = async () => {
    loading.value = true

    try {
    
        await campaignStore.create()

        navigateTo('/')

    } finally {
        loading.value = false
    }
}
</script>
