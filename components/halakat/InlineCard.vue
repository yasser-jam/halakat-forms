<template>
  <v-card>
    <v-card-text class="flex justify-between items-center relative">
      <div>
        <div class="text-lg font-semibold mb-1">حلقة الإمام النووي</div>

        <div class="flex gap-2 mt-4">
          <v-chip color="primary">أ. محمد مسوتي</v-chip>
          <v-chip color="info">12 طالب</v-chip>
        </div>
      </div>

      <div v-if="isActive" class="flex flex-col gap-2 text-sm text-gray-500">
        <div class="flex items-center justify-between" :class="{ 'text-success': isLessonStart }">
          <div>بدأ الدرس</div>
          <v-icon>{{ isLessonStart ? 'mdi-check-circle' : 'mdi-circle-outline' }}</v-icon>
        </div>
        
        <div class="flex items-center justify-between" :class="{ 'text-success': isAttendenceCheck }">
          <div> التفقد</div>
          <v-icon>{{ isAttendenceCheck ? 'mdi-check-circle' : 'mdi-circle-outline' }}</v-icon>
        </div>

        <div class="flex items-center justify-between" :class="{ 'text-success': isHospitalityGive }">
          <div> الضيافة</div>
          <v-icon>{{ isHospitalityGive ? 'mdi-check-circle' : 'mdi-circle-outline' }}</v-icon>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import Group from '~/pages/settings/group.vue'

const isAttendenceCheck = ref(false)
const isLessonStart = ref(true)
const isHospitalityGive = ref(false)

const props = defineProps<{
  group: Group
  isActive: boolean
}>()

const campaignStore = useCampaignStore()

</script>

<style scoped>

</style>