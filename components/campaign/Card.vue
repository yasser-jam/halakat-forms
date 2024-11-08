<template>
  <v-card class="relative">
    <v-card-text class="flex flex-col justify-center static">
      <v-chip
        color="primary"
        size="large"
        class="position-absolute left-4 top-4"
        >قائمة</v-chip
      >

      <div class="text-2xl font-weight-bold text-priamry mb-4">
        {{ campaign.name }}
      </div>

      <div class="text-base text-gray-400">
        بدأت في:
        <v-chip color="blue">{{
          dayjs(campaign.startDate).format('YYYY-MM-DD')
        }}</v-chip>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';

defineProps<{
  campaign: any;
}>();
</script>
