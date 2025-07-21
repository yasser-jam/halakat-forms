<template>
    <v-form v-model="form" @submit.prevent="submit">
      <v-window v-model="tab">
        <v-window-item>
          <v-row class="pt-12">
            <v-col cols="12" sm="12" md="6">
              <base-label>الاسم</base-label>
    
              <v-text-field
                v-model="student.first_name"
                :rules="useValidate(student.first_name)"
                placeholder="اسم الطالب"
              ></v-text-field>
            </v-col>
    
            <v-col cols="12" md="6">
              <base-label>الكنية</base-label>
    
              <v-text-field
                v-model="student.last_name"
                :rules="useValidate(student.last_name)"
                placeholder="كنية الطالب"
              ></v-text-field>
            </v-col>
    
            <v-col cols="12" md="6">
              <base-label>تاريخ الميلاد</base-label>
    
              <v-text-field
                v-model="student.birth_date"
                :rules="useValidate(String(student.birth_date))"
                type="date"
                placeholder="تاريخ ميلاد الطالب"
              ></v-text-field>
            </v-col>
    
            <v-col cols="12" md="6">
              <base-label>رقم موبايل واتس</base-label>
    
              <v-text-field
                v-model="student.student_mobile"
                density="compact"
                placeholder="09********"
              ></v-text-field>
            </v-col>
    
            <v-col cols="12">
              <base-label>الحالةالصحية</base-label>
    
              <sys-health-select v-model="student.student_health_status" />
            </v-col>

    
            <v-col cols="12" md="6">
              <base-label>الأجزاء المحفوظة</base-label>
    
              <sys-parts-select v-model="student.preserved_parts" />
            </v-col>

            <v-col cols="12" md="6">
            <base-label>الأجزاء المختبرة بالأوقاف</base-label>
  
            <sys-parts-select
            v-model="student.parts_tested_by_the_endowments"
              placeholder="الأجزاء المختبرة بالأوقاف"
            />
          </v-col>
    
          </v-row>
    
          <div class="flex justify-center md:justify-end gap-4 mt-4">
            <v-btn color="grey" @click="tab--">عودة</v-btn>
            <v-btn color="primary" :disabled="!form" @click="tab++">التالي</v-btn>
          </div>
        </v-window-item>
    
        <v-window-item>
          <v-row class="pt-12">
            <v-col cols="12">
              <base-label>اسم الأب</base-label>
    
              <v-text-field v-model="student.father_name" placeholder="اسم الأب">
              </v-text-field>
            </v-col>
    
            <v-col cols="12">
              <base-label>وظيفة الأب</base-label>
    
              <v-text-field
                v-model="student.father_job"
                density="compact"
                placeholder="موظف"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <base-label>منطقة السكن</base-label>
    
              <v-text-field
                v-model="student.original_residence_address_area"
                placeholder="المهاجرين"
              ></v-text-field>
            </v-col>
          </v-row>
    
          <div class="flex justify-center md:justify-end gap-4 mt-4">
            <v-btn color="grey" @click="tab--">عودة</v-btn>
            <v-btn color="primary" @click="tab++">التالي</v-btn>
          </div>
        </v-window-item>
    
        <v-window-item class="w-64">
          <v-row class="pt-12">
            <v-col cols="12">
              <base-label>الصف الدراسي</base-label>
    
              <sys-class-select v-model="student.educational_class" />
            </v-col>
    
            <v-col cols="12">
              <base-label>اسم المدرسة</base-label>
    
              <v-text-field
                v-model="student.school"
                placeholder="مدرسة الإمام الشافعي"
              ></v-text-field>
            </v-col>
    

          </v-row>
    
          <div class="flex justify-center md:justify-end gap-4 mt-4">
            <v-btn color="grey" @click="tab--">عودة</v-btn>
            <v-btn color="primary" :loading @click="submit">إرسال</v-btn>
          </div>
        </v-window-item>
    
        <v-window-item>
          <div v-if="success" class="flex flex-col justify-center items-center gap-4 my-6">
            <v-icon color="primary" size="3rem">mdi-check-circle</v-icon>
    
            <div
              class="text-base text-gray-800 max-w-[80%] text-center leading-relaxed"
            >
              تم تسجيل طلبكم بنجاح.
  
              <div class="mt-2">تقبل الله منا ومنكم</div>
            </div>
          </div>
  
          <div v-else class="flex flex-col justify-center items-center gap-4 my-6">
            <v-icon color="error" size="3rem">mdi-close-circle</v-icon>
    
            <div
              class="text-base text-gray-800 max-w-[80%] text-center leading-relaxed"
            >
            عذراً، لكن حصل خطأ ما..رجاء قم بإعادة محاولة التسجيل
            
            <div class="text-gray-500 mt-4 text-sm">(يرجى التواصل مع الإدارة في حال تكرار حدوث الخطاً)</div>
  
            <v-btn color="primary" class="mt-4" @click="tab = 1">إعادة المحاولة</v-btn>
          </div>
          </div>
        </v-window-item>
      </v-window>
    </v-form>
  </template>
  
  <script setup lang="ts">
  definePageMeta({
    layout: "public",
  });
  
  const tab = ref(0);
  
  const form = ref(false)
  
  const success = ref(true)
  
  const studentStore = useStudentStore();
  
  const { student } = storeToRefs(studentStore);
  
  const loading = ref<boolean>(false);
  

  const route = useRoute()

  const campaignId = useCookie('campaign_id')

  campaignId.value = String(route.params.campaign_id)

  const submit = async () => {
    if (!form.value) return
  
    loading.value = true;
  
    try {
      
      await studentStore.create();
  
    } catch (error) {
      success.value = false
    } finally {
  
      tab.value++
  
      loading.value = false;
  
      // init
      initStudent()
    }
  };
  

  
  </script>
  