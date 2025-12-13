<template>
  <v-card class="h-full">
    <v-card-text>
      <div class="flex items-center gap-3 mb-4">
        <v-icon size="large" color="primary">mdi-information-outline</v-icon>
        <div class="text-2xl font-semibold">معلومات الدورة</div>
      </div>

      <!-- Campaign Name -->
      <div class="mb-4 p-3 bg-blue-50 rounded-lg">
        <div class="flex items-center gap-2 mb-2">
          <v-icon color="blue-darken-2">mdi-book-open-page-variant</v-icon>
          <span class="text-sm text-gray-600 font-semibold">اسم الدورة</span>
        </div>
        <div class="text-xl font-bold text-blue-900">
          {{ campaign?.name || 'غير محدد' }}
        </div>
      </div>

      <!-- Campaign Duration -->
      <div class="mb-4 p-3 bg-green-50 rounded-lg">
        <div class="flex items-center gap-2 mb-3">
          <v-icon color="teal">mdi-calendar-range</v-icon>
          <span class="text-sm text-gray-600 font-semibold">فترة الدورة</span>
        </div>

        <div class="flex justify-between items-center">
          <div class="flex flex-col gap-4 font-semibold">
            <div class="flex items-center gap-3">
              <v-chip
                color="teal"
                variant="tonal"
                class="font-semibold"
                prepend-icon="mdi-calendar-start"
              >
                {{ dayjs(campaign?.start_date).format('DD/MM/YYYY') }}
              </v-chip>

              <v-icon>mdi-arrow-left-bold-outline</v-icon>

              <v-chip
                color="error"
                variant="tonal"
                class="font-semibold"
                prepend-icon="mdi-calendar-start"
              >
                {{ dayjs(campaign?.end_date).format('DD/MM/YYYY') }}
              </v-chip>
            </div>

            <div class="flex items-center gap-2">
              <v-chip
                color="teal"
                variant="tonal"
                prepend-icon="mdi-clock-outline"
              >
                {{ campaign?.start_time || '--:--' }}
              </v-chip>

              <v-icon>mdi-arrow-left-bold-outline</v-icon>

              <v-chip
                color="error"
                variant="tonal"
                prepend-icon="mdi-clock-outline"
              >
                {{ campaign?.end_time || '--:--' }}
              </v-chip>
            </div>
          </div>

          <div>
            <div class="text-gray-600">الأيام المتبقية</div>
            <span class="text-2xl text-primary">
              <span class="text-lg text-gray-600">170 /</span>
              <span class="font-semibold">
                {{
                  getRemainingDays(
                    campaign?.start_date as string,
                    campaign?.end_date as string
                  )
                }}
              </span>
            </span>
          </div>
        </div>
      </div>

      <!-- Days of Week -->
      <div
        v-if="campaign?.days?.length"
        class="p-3 bg-teal-lighten-5 rounded-lg"
      >
        <div class="flex items-center gap-2 mb-2">
          <v-icon color="teal-darken-2">mdi-calendar-week</v-icon>
          <span class="text-sm text-gray-600 font-semibold">أيام الدورة</span>
        </div>

        <div class="flex flex-wrap gap-2">
          <v-chip
            v-for="day in days"
            :key="day"
            color="primary"
            variant="flat"
            size="small"
          >
            {{ getDay(day as any) }}
          </v-chip>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';

const campaignStore = useCampaignStore();
const { campaign } = storeToRefs(campaignStore);

const days = campaign.value?.days?.toString()?.split(',')?.map((day: string) => day.trim().toLowerCase())

</script>
