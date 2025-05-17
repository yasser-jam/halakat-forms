<template>

<base-loader v-if="status == 'pending'" />

<v-container v-else>
      <v-row>
        <v-col cols="12" class="mt-2">
          <home-hero />
        </v-col>
  
        <!-- <v-col cols="4">
                  <campaign-card></campaign-card>
              </v-col> -->
      </v-row>
  
      <!-- <div class="text-xl font-semibold mt-6 mb-4">أساتذة الحلقات</div>
  
      <v-row>
        <v-col cols="4">
          <teacher-card></teacher-card>
        </v-col>
  
        <v-col cols="4">
          <teacher-card></teacher-card>
        </v-col>
  
        <v-col cols="4">
          <teacher-card></teacher-card>
        </v-col>
      </v-row> -->
  
      <!-- <template v-if="!campaign?.id">

        <dashboard-no-current-campaign class="mt-4" />
      
      
        <div class="text-xl font-semibold mt-6 mb-4">قائمة الدورات المقامة</div>
      </template> -->
  
      <home-settings class="mt-6"></home-settings>

      <v-row class="mt-6">
        <v-col cols="12" md="6">
          <v-card>
            <v-card-text>

              <div class="text-xl font-semibold mb-2">سجل الأنشطة</div>
              
              <div class="flex flex-col gap-2 max-h-[200px] overflow-auto">
                <attend-log-card v-for="i in 10" class="shrink-0" />
              </div>
            </v-card-text>
          </v-card>

        </v-col>

        <v-col cols="12" md="6">
          <v-card>
            <v-card-text>

              <div class="text-xl font-semibold mb-2">الأساتذة الحاضرون</div>
              
              <div v-if="teachers?.length" class="flex flex-col gap-2 max-h-[200px] overflow-auto">
                <teacher-inline-card v-for="teacher in teachers" :teacher />
                
              </div>

              <base-not-found v-else />
            </v-card-text>
          </v-card>

        </v-col>
      </v-row>

      <div class="text-xl font-semibold mt-6 mb-4">حلقات الدورة</div>

        <v-row>
          <v-col v-for="group in groups" cols="4">
            <halakat-inline-card :group :is-active="Boolean(isCampaignCurrent)" />
          </v-col>
    
          <!-- <v-col cols="4">
            <halakat-inline-card />
          </v-col>
    
          <v-col cols="4">
            <halakat-inline-card />
          </v-col> -->
        </v-row>

        <div class="text-xl font-semibold mt-6 mb-4">أهم الإحصاءات</div>
  
      <v-row>
        <v-col cols="6">
          <v-card>
            <v-card-title class="!text-base">مجموع تسميع الحلقات</v-card-title>
            <v-card-text>
              <base-bar-chart></base-bar-chart>
            </v-card-text>
          </v-card>
        </v-col>
  
        <v-col cols="6">
          <v-card>
            <v-card-title class="!text-base">حضور الحلقات</v-card-title>
            <v-card-text>
              <base-bar-chart></base-bar-chart>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup lang="ts">
    const campaignStore = useCampaignStore()

    const campaignId = useCookie('campaign_id')

    const { status } = useLazyAsyncData(() => campaignStore.get(Number(campaignId.value)))
    
    useLazyAsyncData(() => groupStore.list())
    
    const groupStore = useGroupStore()

    const { groups } = storeToRefs(groupStore)

    const { campaign, campaigns, isCampaignCurrent } = storeToRefs(campaignStore)
  
    const teachers = computed<Teacher[]>(() => {
      let data : Teacher[] = []
      
      groups.value?.forEach(group => {
        if (group.currentTeacher) data.push(group.currentTeacher)
      })

      return data
    })
  
  
  </script>