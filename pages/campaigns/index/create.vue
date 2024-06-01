<template>
  <base-dialog width="600" :loading @close="goBack" @save="save">
    <template #title>معلومات الدورة</template>

    <v-form v-model="form">
      <base-label>اسم الدورة</base-label>
      <v-text-field v-model="campaign.name" placeholder="الدورة الصيفية"> </v-text-field>
  
      <base-label>تاريخ بدء الدورة</base-label>
      <v-text-field v-model="campaign.startDate" type="date" placeholder="1/1/2024"> </v-text-field>
    </v-form>

  </base-dialog>
</template>

<script setup lang="ts">
const campaignStore = useCampaignStore()

const { campaign } = storeToRefs(campaignStore)

const form = ref<boolean>(false)

const loading = ref<boolean>(false)

const goBack = () => {
    navigateTo('/campaigns')
}

const save = async () => {

  loading.value = true

  try {
    await campaignStore.create()
  } finally {
    loading.value = false
  }
}
</script>