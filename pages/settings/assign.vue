<template>
  <v-card>
    <v-card-text>
      <div class="text-xl font-semibold mb-6">إعدادات التسجيل</div>

      <v-row v-if="campaign">
        <v-col cols="12" md="6">
          <base-label>تاريخ بداية التسجيل</base-label>
    
          <base-datepicker v-model="campaign.assign_start_date" />
        </v-col>
    
        <v-col cols="12" md="6">
          <base-label>تاريخ نهاية التسجيل</base-label>
    
          <base-datepicker v-model="campaign.assign_end_date" />
        </v-col>
    
        <v-col cols="12">
          <base-switch-input
            v-model="campaign.limited_students_count"
            title="تقييض عدد معين للطلاب"
            subtitle="يوجد عدد محدد للطلاب المقبولين"
          />
        </v-col>
    
        <transition>
          <v-col v-if="campaign.limited_students_count" cols="12" class="mt-4">
            <base-label>عدد الطلاب المسموح</base-label>
    
            <v-text-field
              v-model.number="campaign.students_count"
              type="number"
              placeholder="عدد الطلاب المسموح"
            />
          </v-col>
        </transition>
    
        <transition>
          <v-col v-if="campaign.limited_students_count" cols="12" class="mt-4">
            <base-label>الإجراء المتبع عند اكتمال العدد</base-label>
    
            <v-row class="mt-4 items-streach">
              <v-col cols="3">
                <settings-select-card
                  icon="mdi-check-all"
                  title="التسجيل بالمطلق"
                  subtitle="سيتم تسجيل جميع الطلاب المتقدمين بغض النظر عن اكتمال العدد أم لا"
                  :active="campaign.complete_count_approach == 'UNLIMIT_ASSIGN'"
                  @click="campaign.complete_count_approach = 'UNLIMIT_ASSIGN'"
                  ></settings-select-card>
              </v-col>
    
              <v-col cols="3">
                <settings-select-card
                  icon="mdi-check"
                  title="التسجيل المقيد"
                  subtitle="سيتم التسجيل لكن مع إعطاء تنبيه بالفائض العددي"
                  :active="campaign.complete_count_approach == 'HOLD_ASSIGN'"
                  @click="campaign.complete_count_approach = 'HOLD_ASSIGN'"
                  ></settings-select-card>
              </v-col>
    
              <v-col cols="3">
                <settings-select-card
                  icon="mdi-clock-outline"
                  title="التسجيل المعلق"
                  subtitle="سيتم حفظ طلبات التسجيل دون إضافة الطلبات إلا عند الموافقة اليدوية لكل طالب"
                  :active="campaign.complete_count_approach == 'PEND_ASSIGN'"
                  @click="campaign.complete_count_approach = 'PEND_ASSIGN'"
                  ></settings-select-card>
              </v-col>
    
              <v-col cols="3">
                <settings-select-card
                  icon="mdi-cancel"
                  title="إيقاف التسجيل"
                  subtitle="لن يتم إضافة الطلاب ولا حفظ طلبات التسجيل، سيتم رفض الطلبات مباشرة"
                  :active="campaign.complete_count_approach == 'STOP_ASSIGN'"
                  @click="campaign.complete_count_approach = 'STOP_ASSIGN'"
                  ></settings-select-card>
              </v-col>
            </v-row>
          </v-col>
        </transition>
    
        <v-col cols="12">
          <base-switch-input
            v-model="campaign.assign_by_link"
            color="secondary"
            title="التسجيل عن طريق الرابط"
            subtitle="إتاحة رابط خارجي للتسجيل"
          />
        </v-col>
    
        <v-col v-if="campaign.assign_by_link" cols="12">
          <base-label>رابط التسجيل</base-label>
          <v-text-field model-value="https://google.com" readonly></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>

</template>

<script setup lang="ts">
const campaignStore = useCampaignStore();

const { campaign } = storeToRefs(campaignStore);
</script>
