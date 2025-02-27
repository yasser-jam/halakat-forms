<template>
  <v-container>
    <div class="flex justify-between items-center mb-8">
      <div class="text-3xl font-semibold">إعدادات الدورة</div>

      <v-btn @click="save" :loading>حفظ</v-btn>
    </div>

    <v-tabs color="primary" v-model="activeTab">
      <v-tab prepend-icon="mdi-information-outline" text="عام" value="general"></v-tab>
      <v-tab prepend-icon="mdi-account-school-outline" text="التسجيل" value="assign"></v-tab>
      <v-tab prepend-icon="mdi-account-group-outline" text="الحلقات" value="group"></v-tab>
      <v-tab prepend-icon="mdi-book-outline" text="التسميع" value="preserve"></v-tab>
      <v-tab prepend-icon="mdi-help-box-multiple-outline" text="المسابقات" value="contest"></v-tab>
      <v-tab prepend-icon="mdi-license" text="المكافآت" value="award"></v-tab>
    </v-tabs>

    <v-tabs-window v-model="activeTab">

      <v-tabs-window-item value="general">
        <v-card>
          <v-card-text>
            <div class="text-xl font-semibold mb-6">المعلومات العامة</div>

            <v-row>
              <v-col cols="12">
                <base-label>اسم الدورة</base-label>

                <v-text-field placeholder="اسم الدورة" />
              </v-col>

              <v-col cols="12" md="6">
                <base-label>تاريخ البداية</base-label>

                <base-datepicker />
              </v-col>

              <v-col cols="12" md="6">
                <base-label>تاريخ النهاية</base-label>

                <base-datepicker />
              </v-col>

              <v-col cols="12" md="6">
                <base-label>تحديد ساعات الدوام</base-label>
                
                <div class="flex gap-2">
                  <v-card variant="outlined" elevation="0" class="flex items-center justify-center text-center border-opacity-100 border-6 border-dashed grow">
                    <v-card-text class="py-2">بالساعات</v-card-text>
                  </v-card>

                  <v-card variant="outlined" elevation="0" class="flex items-center justify-center text-center border-opacity-100 border-6 border-dashed grow">
                    <v-card-text class="py-2">أوقات الصلاة</v-card-text>
                  </v-card>
                </div>
              </v-col>

              <v-col cols="12" md="3">
                <base-label>وقت البداية</base-label>

                <v-select placeholder="اختر وقت البداية"></v-select>
              </v-col>

              <v-col cols="12" md="3">
                <base-label>وقت النهاية</base-label>

                <v-select placeholder="اختر وقت النهاية"></v-select>
              </v-col>

              <v-col cols="12" class="mb-6">
                <base-label>أيام الدوام</base-label>

                <div class="flex items-center gap-2">
                  <v-chip>الجمعة</v-chip>
                  <v-chip>السبت</v-chip>
                  <v-chip>الأحد</v-chip>
                  <v-chip>الاثنين</v-chip>
                  <v-chip>الثلاثاء</v-chip>
                  <v-chip>الأربعاء</v-chip>
                  <v-chip>الخميس</v-chip>
                </div>
              </v-col>


              <v-col cols="12">
                <base-switch-input :model-value="true" title="الدورة مستمرة"
                  subtitle="في حال كانت الدورة مستمرة سيتم نقل الحلقات تلقائياً وإلغاء تاريخ النهاية" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-tabs-window-item>

      <v-tabs-window-item value="assign">
        <v-card>
          <v-card-text>
            <div class="text-xl font-semibold mb-6">معلومات تسجيل الطلاب</div>

            <v-row>
              <v-col cols="12" md="6">
                <base-label>تاريخ بداية التسجيل</base-label>

                <base-datepicker />
              </v-col>

              <v-col cols="12" md="6">
                <base-label>تاريخ نهاية التسجيل</base-label>

                <base-datepicker />
              </v-col>

              <v-col cols="12">
                <base-switch-input :model-value="true" title="تقييض عدد معين للطلاب"
                  subtitle="يوجد عدد محدد للطلاب المقبولين" />
              </v-col>

              <v-col cols="12" class="mt-4">
                <base-label>عدد الطلاب المسموح</base-label>

                <v-text-field type="number" placeholder="عدد الطلاب المسموح" />
              </v-col>



              <v-col cols="12">
                <base-switch-input :model-value="true" color="secondary" title="التسجيل عن طريق الرابط"
                  subtitle="إتاحة رابط خارجي للتسجيل" />
              </v-col>

              <v-col cols="12" class="mt-4">
                <base-label>الإجراء المتبع عند اكتمال العدد</base-label>

                <v-row class="mt-4 items-streach">
                  <v-col cols="3">
                    <settings-select-card color="primary" icon="mdi-check-all" title="التسجيل بالمطلق"
                      subtitle="سيتم تسجيل جميع الطلاب المتقدمين بغض النظر عن اكتمال العدد أم لا"></settings-select-card>
                  </v-col>

                  <v-col cols="3">
                    <settings-select-card color="warning" icon="mdi-check" title="التسجيل المقيد"
                      subtitle="سيتم التسجيل لكن مع إعطاء تنبيه بالفائض العددي"></settings-select-card>
                  </v-col>

                  <v-col cols="3">
                    <settings-select-card color="info" icon="mdi-clock-outline" title="التسجيل المعلق"
                      subtitle="سيتم حفظ طلبات التسجيل دون إضافة الطلبات إلا عند الموافقة اليدوية لكل طالب"></settings-select-card>
                  </v-col>

                  <v-col cols="3">
                    <settings-select-card color="error" icon="mdi-cancel" title="إيقاف التسجيل"
                      subtitle="لن يتم إضافة الطلاب ولا حفظ طلبات التسجيل، سيتم رفض الطلبات مباشرة"></settings-select-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-tabs-window-item>
    </v-tabs-window>

  </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'no-sidebar'
})

const campaignStore = useCampaignStore()

const { campaign } = storeToRefs(campaignStore)

const route = useRoute()

const loading = ref(false)

const activeTab = ref('general')
const baseRoute = `/campaigns/${route.params.campaign_id}/settings`

const save = async () => {
  loading.value = true

  try {
    await campaignStore.create()

  } finally {
    loading.value = false
  }
}
</script>