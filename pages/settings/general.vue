<template>
  <div class="text-xl font-semibold mb-6">المعلومات العامة</div>

  <v-row v-if="campaign">
    <v-col cols="12">
      <base-label>اسم الدورة</base-label>

      <v-text-field v-model="campaign.name" placeholder="اسم الدورة" />
    </v-col>

    <v-col cols="12" md="6">
      <base-label>تاريخ البداية</base-label>

      <base-datepicker v-model="campaign.startDate" />
    </v-col>

    <v-col cols="12" md="6">
      <base-label>تاريخ النهاية</base-label>

      <base-datepicker v-model="campaign.endDate" />
    </v-col>

    <v-col cols="12">
      <base-switch-input
        v-model="campaign.isCampaignContinous"
        title="الدورة مستمرة"
        subtitle="في حال كانت الدورة مستمرة سيتم نقل الحلقات تلقائياً وإلغاء تاريخ النهاية"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
const campaignStore = useCampaignStore();

const { campaign } = storeToRefs(campaignStore);
</script>
