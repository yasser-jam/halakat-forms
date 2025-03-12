<template>
  <div class="text-xl font-semibold mb-6">إعدادات التسجيل</div>
</template>

<script setup lang="ts">
const campaignStore = useCampaignStore();

const { campaign } = storeToRefs(campaignStore);
</script>