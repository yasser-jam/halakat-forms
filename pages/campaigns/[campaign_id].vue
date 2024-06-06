<template>
  <v-container>

    <div class="text-3xl font-semibold mb-4">دورة التقوية</div>

    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <div class="flex items-center gap-2">
                  <div>:اسم الدورة</div>
                  <v-chip color="primary">دورة التقوية</v-chip>
                </div>
              </v-col>

              <v-col cols="6">
                <div class="flex items-center gap-2">
                  <div>تاريخ الدورة:</div>
                  <v-chip color="blue">12-2-2003</v-chip>

                  <v-icon>mdi-arrow-left</v-icon>

                  <v-chip color="blue">12-2-2005</v-chip>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-tabs>
          <v-tab :to="`/campaigns/${route.params.campaign_id}/general`">معلومات عامة</v-tab>
          <v-tab :to="`/campaigns/${route.params.campaign_id}/stats`">إحصاءات</v-tab>
        </v-tabs>
      </v-col>


      <NuxtPage />
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const route = useRoute()
</script>