<template>
  <v-container>
    <div class="flex justify-between my-4">

      <!-- <div class="flex gap-2">
        <v-btn variant="plain" to="/teachers">إلغاء</v-btn>
        <v-btn color="primary" :disabled="!form" :loading @click="submit"
          >حفظ</v-btn
        >
      </div> -->
    </div>

    <!-- <v-tabs v-model="tab" class="mb-2">
      <v-tab>المعلومات العامة</v-tab>
      <v-tab>معلومات الحفظ</v-tab>
      <v-tab>معلومات الدراسة</v-tab>
    </v-tabs> -->

    <v-form v-model="form">
      <v-card elevation="0" width="700">        
        <v-card-text>
            <v-window v-model="tab">
              <v-window-item>
                <v-row>
                  <v-col cols="6">
                    <base-label>الاسم</base-label>
  
                    <v-text-field
                      v-model="teacher.first_name"
                      :rules="useValidate(teacher.first_name)"
                      placeholder="اسم الأستاذ"
                    ></v-text-field>
                  </v-col>
  
                  <v-col cols="6">
                    <base-label>الكنية</base-label>
  
                    <v-text-field
                      v-model="teacher.last_name"
                      :rules="useValidate(teacher.last_name)"
                      placeholder="كنية الأستاذ"
                    ></v-text-field>
                  </v-col>
  
                  <v-col cols="6">
                    <base-label>اسم الأب</base-label>
  
                    <v-text-field
                      v-model="teacher.father_name"
                      :rules="useValidate(teacher.father_name)"
                      placeholder="اسم والد الأستاذ"
                    ></v-text-field>
                  </v-col>
  
                  <v-col cols="6">
                    <base-label>تاريخ الميلاد</base-label>
  
                    <v-text-field
                      v-model="teacher.birth_date"
                      :rules="useValidate(String(teacher.birth_date))"
                      type="date"
                      placeholder="تاريخ ميلاد الأستاذ"
                    ></v-text-field>
                  </v-col>
  
                  <v-col cols="6">
                    <base-label>رقم موبايل الأستاذ (مع واتس)</base-label>
  
                    <v-text-field
                      v-model="teacher.mobile_phone_number"
                      :rules="useValidate(teacher.mobile_phone_number)"
                      density="compact"
                      placeholder="09********"
                    ></v-text-field>
                  </v-col>
  
                  <v-col cols="6">
                    <base-label>منطقة السكن الحالي</base-label>
  
                    <v-text-field
                      v-model="teacher.current_residence_address_area"
                      :rules="
                        useValidate(
                          String(teacher.current_residence_address_area)
                        )
                      "
                      placeholder="الميدان"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-window-item>
  
              <v-window-item>
                <v-row>
                  <v-col cols="12">
                    <base-switch-input
                      v-model="teacher.is_mojaz"
                      title="هل الأستاذ مجاز بالقرآن الكريم؟"
                      color="primary"
                    ></base-switch-input>
                  </v-col>
                </v-row>
              </v-window-item>
  
              <v-window-item>
                <v-row>
                  <v-col cols="12">
                    <base-label>المستوى التعليمي</base-label>
  
                    <sys-education-select v-model="teacher.educational_level" />
                  </v-col>
  
                  <v-col cols="6">
                    <base-label>اسم المدرسة / الجامعة</base-label>
  
                    <v-text-field
                      v-model="teacher.university_name"
                      placeholder="جامعة دمشق"
                    ></v-text-field>
                  </v-col>
  
                  <v-col cols="6">
                    <base-label>اسم الكلية</base-label>
  
                    <v-text-field
                      v-model="teacher.college_name"
                      placeholder="كلية الطب البشري"
                    ></v-text-field>
                  </v-col>
                  </v-row>
              </v-window-item>
            </v-window>
            
            <div class="flex gap-4 mt-4">
              <v-spacer></v-spacer>
              <v-btn v-if="tab > 0" @click="--tab" type="button" color="grey">العودة</v-btn>
              <v-btn v-if="tab < 2" :disabled="!form" type="button" @click="++tab">التالي</v-btn>
              <v-btn v-if="tab == 2" :disabled="!form" :loading type="button" @click="submit">حفظ</v-btn>
            </div>
          </v-card-text>
      </v-card>
    </v-form>

  </v-container>
</template>

<script setup lang="ts">

definePageMeta({
layout: "public",
});

const tab = ref<number>(0);
const form = ref<boolean>(false);
const loading = ref<boolean>(false);

const teacherStore = useTeacherStore();

const { teacher } = storeToRefs(teacherStore);


// assign campaign id cookie
const campaignId = useCookie('campaign_id')



// reset
teacherStore.reset()

const submit = async () => {
  if (!form.value) return;

  loading.value = true;

  try {
    await teacherStore.create()

    navigateTo('/saving-teacher-success')

  } finally {
    loading.value = false;
  }
};
</script>
