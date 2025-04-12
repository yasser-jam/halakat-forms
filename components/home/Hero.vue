<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col cols="12" class="flex justify-between mb-4">
          
          <div>
            <div class="text-3xl font-semibold">{{ new Date().toLocaleDateString('ar-SA', { weekday: 'long' }) }}</div>
            <div class="text-3xl font-semibold">{{ new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }) }}</div>
          
            <div class="flex items-center gap-2 text-base text-gray-500 mt-2">
              <v-icon size="small">mdi-clock-outline</v-icon>
              <div>{{ campaign.startTime }}</div>

              <v-icon size="small">mdi-arrow-left</v-icon>

              <div>{{ campaign.endTime }}</div>
            </div>


          </div>
        
          <v-chip v-if="isCurrent" color="primary">جار الآن</v-chip>
        
        </v-col>
        
        <v-col cols="4">
          <v-btn
            variant="tonal"
            color="primary"
            size="x-large"
            class="w-full"
            to="/students/create"
          >
            طالب جديد
          </v-btn>
        </v-col>

        <v-col cols="4">
          <v-btn
          variant="tonal"
            color="secondary"
            size="x-large"
            class="w-full"
            to="/teachers/create"
          >
            أستاذ جديد
          </v-btn>
        </v-col>

        <v-col cols="4">
          <v-btn variant="tonal" color="error" size="x-large" class="w-full" disabled>
            مسابقة جديدة
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>

    <!-- <v-card-actions>
      <v-btn>حفظ</v-btn>
      <v-btn varaint="outlined">إلغاء</v-btn>
    </v-card-actions> -->
  </v-card>
</template>


<script setup lang="ts">
const campaignStore = useCampaignStore()

const { campaign } = storeToRefs(campaignStore)

const { data:isCurrent } = useLazyAsyncData(() => campaignStore.isCurrent(Number(campaign.value?.id)))

</script>