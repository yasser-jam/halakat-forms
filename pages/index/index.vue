<template>
  <base-loader v-if="status == 'pending'" />

  <v-container v-else>
    <v-row>
      <v-col cols="12" class="mt-2">
        <!-- <home-hero /> -->
      </v-col>

      <v-col cols="8">
        <home-info />
      </v-col>

      <v-col cols="4">
        <home-calendar />
      </v-col>

      <v-col cols="3">
        <home-stat-card
          title="عدد الطلاب الكلي"
          value="25"
          icon="mdi-account-group"
        />
      </v-col>

      <v-col>
        <home-stat-card
          title="عدد الأساتذة الكلي"
          value="5"
          icon="mdi-account-supervisor"
        />
      </v-col>

      <v-col>
        <home-stat-card
          title="عدد الحلقات الكلي"
          value="5"
          icon="mdi-home-group"
        />
      </v-col>

      <v-col>
        <home-stat-card
          title="عدد الصفحات المُسمعة"
          value="250"
          icon="mdi-book-open-page-variant"
        />
      </v-col>
    </v-row>

    <v-col cols="12" class="mt-6">
      <v-card>
        <v-card-text>
          <div class="text-xl font-semibold mb-2">سجل الأنشطة</div>

          <div class="flex flex-col gap-2 max-h-[200px] overflow-auto">
            <attend-log-card v-for="i in 10" class="shrink-0" />
          </div>
        </v-card-text>
      </v-card>
    </v-col>
    <!-- <v-row class="mt-12">

      <v-col cols="12" md="6">
        <v-card>
          <v-card-text>
            <div class="text-xl font-semibold mb-2">الأساتذة الحاضرون</div>

            <div
              v-if="teachers?.length"
              class="flex flex-col gap-2 max-h-[200px] overflow-auto"
            >
              <teacher-inline-card v-for="teacher in teachers" :teacher />
            </div>

            <base-not-found v-else />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row> -->

    <div class="text-xl font-semibold mt-6 mb-4">حلقات الدورة</div>

    <v-row>
      <template v-if="groups?.length">
        <v-col v-for="group in groups" cols="4">
          <halakat-inline-card :group :is-active="Boolean(isCampaignCurrent)" />
        </v-col>
      </template>

      <template v-else>
        <v-col cols="12">
          <base-not-found />
        </v-col>
      </template>

      <!-- <v-col cols="4">
                <halakat-inline-card />
              </v-col>
        
              <v-col cols="4">
                <halakat-inline-card />
              </v-col> -->
    </v-row>
    <home-settings class="mt-6"></home-settings>

    <!-- <div class="text-xl font-semibold mt-6 mb-4">أهم الإحصاءات</div>
      
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
          </v-row> -->
  </v-container>
</template>

<script setup lang="ts">
const campaignStore = useCampaignStore();

const campaignId = useCookie('campaign_id');

const { status } = useLazyAsyncData(() =>
  campaignStore.get(Number(campaignId.value))
);

// useLazyAsyncData(() => groupStore.list())

const groupStore = useGroupStore();

const { groups } = storeToRefs(groupStore);

const { campaign, campaigns, isCampaignCurrent } = storeToRefs(campaignStore);

const teachers = computed<Teacher[]>(() => {
  let data: Teacher[] = [];

  groups.value?.forEach((group) => {
    if (group.currentTeacher) data.push(group.currentTeacher);
  });

  return data;
});
</script>
