<template>
  <v-form v-model="form" @submit.prevent="submit">
    <v-window v-model="tab">
      <v-window-item>
        <div
          class="text-base text-gray-800 max-w-[80%] text-center leading-relaxed my-8 mx-auto"
        >
  
        انطلاقاً من قوله ﷺ: 
        <div class="font-bold"><<خيركم من تعلم القرآن وعلمه>></div>
        تدعوكم إدارة مسجد الشيخ علي الدقر للتسجيل بدورتها الصيفية لعام 1445هـ/2024م
        </div>
  
  
        <div class="w-[90%] h-[.5px] bg-gray-400 mx-auto"></div>
  
        <div class="flex flex-col items-center justify-center gap-6 mt-8">
          <div class="flex items-center gap-4">
            <div class="font-semibold text-gray-500">الأعمار المقبولة:</div>
            <v-chip size="small" color="primary">صف السابع فما فوق</v-chip>
          </div>
  
          <div class="flex items-center gap-4">
            <div class="font-semibold text-gray-500">الأيام:</div>
  
            <div class="flex items-center gap-1">
              <v-chip size="small" color="blue">السبت</v-chip>
              <v-chip size="small" color="blue">الاثنين</v-chip>
              <v-chip size="small" color="blue">الأربعاء</v-chip>
            </div>
          </div>
  
          <div class="flex items-center gap-4">
            <div class="font-semibold text-gray-500">الأوقات:</div>
  
            <v-chip size="small" color="warning">الساعة 5</v-chip>
            <v-icon color="primary">mdi-arrow-left</v-icon>
            <v-chip size="small" color="warning">الساعة 7</v-chip>
          </div>
  
          <v-btn color="primary" class="my-4" size="x-large" @click="tab++"
            >متابعة إلى التسجيل</v-btn
          >
        </div>
      </v-window-item>
  
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
              v-model="student.student_mobile_number"
              :rules="useValidate(student.student_mobile_number)"
              density="compact"
              placeholder="09********"
            ></v-text-field>
          </v-col>
  
          <v-col cols="12">
            <base-label>الحالةالصحية</base-label>
  
            <sys-health-select v-model="student.student_health_status" />
          </v-col>
  
          <!-- <v-col cols="12">
                      <base-label>اسم المرض</base-label>
  
                      <v-text-field placeholder="اسم المرض"></v-text-field>
                    </v-col> -->
  
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
          <v-col cols="12" md="6">
            <base-label>اسم الأب</base-label>
  
            <v-text-field v-model="student.father_name" placeholder="اسم الأب">
            </v-text-field>
          </v-col>
  
          <v-col cols="12" md="6">
            <base-label>حالة الأب</base-label>
  
            <sys-status-select v-model="student.father_status" />
          </v-col>
  
          <v-col cols="12" md="6">
            <base-label>وظيفة الأب</base-label>
  
            <v-text-field
              v-model="student.father_job"
              density="compact"
              placeholder="موظف"
            ></v-text-field>
          </v-col>
  
          <v-col cols="12" md="6">
            <base-label>دخل الأب الشهري</base-label>
  
            <sys-salary-select v-model="student.father_income_level" />
          </v-col>
  
          <v-col cols="12" md="6">
            <base-label>مستوى الأب التعليمي</base-label>
  
            <sys-education-select v-model="student.father_education_level" />
          </v-col>
  
          <v-col cols="12" md="6">
            <base-label>حالة الأب الصحية</base-label>
  
            <sys-health-select v-model="student.father_health_status" />
          </v-col>
  
          <v-col cols="12" md="6">
            <base-label>رقم هاتف الأب</base-label>
  
            <v-text-field
              v-model="student.father_phone_number"
              density="compact"
              placeholder="09********"
            ></v-text-field>
          </v-col>
  
          <!-- <v-col cols="12" md="6">
                  <base-label>رقم هاتف العمل</base-label>
  
                  <v-text-field
                    density="compact"
                    placeholder="09********"
                  ></v-text-field>
                </v-col> -->
  
          <v-col cols="12" md="6">
            <base-label>اسم الأم</base-label>
  
            <v-text-field
              v-model="student.mother_name"
              density="compact"
              placeholder="اسم الأم"
            ></v-text-field>
          </v-col>
  
          <v-col cols="12" md="6">
            <base-label>حالة الأم</base-label>
  
            <sys-status-select v-model="student.mother_status" />
          </v-col>
  
          <v-col cols="12" md="6">
            <base-label>وظيفة الأم</base-label>
  
            <v-text-field
              v-model="student.mother_job"
              placeholder="مدرسة"
            ></v-text-field>
          </v-col>
  
          <v-col cols="12" md="6">
            <base-label>دخل الأم</base-label>
  
            <sys-salary-select v-model="student.mother_income_level" />
          </v-col>
  
          <v-col cols="12" md="6">
            <base-label>مستوى الأم التعليمي</base-label>
  
            <sys-education-select v-model="student.mother_education_level" />
          </v-col>
  
          <v-col cols="12" md="6">
            <base-label>حالة الأم الصحية</base-label>
  
            <sys-health-select v-model="student.mother_health_status" />
          </v-col>
  
          <v-col cols="12" md="6">
            <base-label>رقم موبايل الأم</base-label>
  
            <v-text-field
              v-model="student.mother_phone_number"
              placeholder="09********"
            ></v-text-field>
          </v-col>
  
          <v-col cols="12">
            <base-label>حالة الزواج</base-label>
  
            <sys-marriage-select v-model="student.parent_marital_status" />
          </v-col>
  
          <!-- <v-col cols="12" md="6">
                  <base-label>الهاتف الأرضي</base-label>
  
                  <v-text-field
                  v-model="student.mother_phone_number"
                    placeholder="011*******"
                  ></v-text-field>
                </v-col> -->
        </v-row>
  
        <div class="flex justify-center md:justify-end gap-4 mt-4">
          <v-btn color="grey" @click="tab--">عودة</v-btn>
          <v-btn color="primary" @click="tab++">التالي</v-btn>
        </div>
      </v-window-item>
  
      <v-window-item>
        <v-row class="pt-12">
          <v-col cols="12">
            <base-label>منطقة السكن الأصلي</base-label>
  
            <v-text-field
              v-model="student.original_residence_address_area"
              placeholder="المهاجرين"
            ></v-text-field>
          </v-col>
  
          <v-col cols="12" md="6">
            <base-label>شارع السكن الأصلي</base-label>
  
            <v-text-field
              v-model="student.original_residence_address_street"
              placeholder="شورى"
            ></v-text-field>
          </v-col>
  
          <v-col cols="12" md="6">
            <base-label>بناء السكن الأصلي</base-label>
  
            <v-text-field
              v-model="student.original_residence_address_building"
              placeholder="بناء الزهور"
            ></v-text-field>
          </v-col>
  
          <v-col cols="12" md="6">
            <base-label>منطقة السكن الحالي</base-label>
  
            <v-text-field
              v-model="student.current_residence_address_area"
              :rules="useValidate(String(student.current_residence_address_area))"
              placeholder="الميدان"
            ></v-text-field>
          </v-col>
  
          <v-col cols="12" md="6">
            <base-label>شارع السكن الحالي</base-label>
  
            <v-text-field
              v-model="student.current_residence_address_street"
              placeholder="حي الزاهرة"
            ></v-text-field>
          </v-col>
  
          <v-col cols="12" md="6">
            <base-label>بناء السكن الحالي</base-label>
  
            <v-text-field
              v-model="student.current_residence_address_building"
              placeholder="بناء الزرعي"
            ></v-text-field>
          </v-col>
  
          <v-col cols="12" md="6">
            <base-label>طابق السكن الحالي</base-label>
  
            <v-text-field
              v-model="student.current_residence_address_floor"
              placeholder="الطابق الخامس"
            ></v-text-field>
          </v-col>
        </v-row>
  
        <div class="flex justify-center md:justify-end gap-4 mt-4">
          <v-btn color="grey" @click="tab--">عودة</v-btn>
          <v-btn color="primary" @click="tab++">التالي</v-btn>
        </div>
      </v-window-item>
  
      <v-window-item>
        <v-row class="pt-12">
          <v-col cols="12" md="6">
            <base-label>الصف الدراسي</base-label>
  
            <sys-class-select v-model="student.educational_class" />
          </v-col>
  
          <v-col cols="12" md="6">
            <base-label>اسم المدرسة</base-label>
  
            <v-text-field
              v-model="student.school"
              placeholder="مدرسة الإمام الشافعي"
            ></v-text-field>
          </v-col>
  
          <v-col cols="12">
            <base-label>مواهب مميزة</base-label>
  
            <v-text-field
              v-model="student.special_talent"
              density="compact"
              placeholder="كرة قدم، شعر، رسم..."
            ></v-text-field>
          </v-col>
  
          <v-col cols="12">
            <base-switch-input
              title="سجل الطالب في جوامع سابقة"
              subtitle="هل سجل الطالب في جوامع أو معاهد أو دورات قرآنية سابقة"
              color="primary"
            ></base-switch-input>
          </v-col>
  
          <v-col cols="12" class="mt-4">
            <base-label>أسماء الجوامع السابقة</base-label>
  
            <v-text-field
              v-model="student.other_mosque_names"
              density="compact"
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

            بانتظاركم إن شاء الله في <span class="text-base font-bold">2-6-2024م / 25-11-1445هـ</span> أول أيام الدورة.

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


const test = async () => {

  tab.value = 4

  student.value = {
    first_name: "test",
  last_name: "test",
  student_mobile_number: "332524",
  in_another_mosque: false,
  birth_date: '2024-05-25T08:38:37.459Z',
  current_residence_address_area: 'tersat',
  current_residence_address_street: 'tersat',
  current_residence_address_building: 'tersat',
  original_residence_address_area: 'tersat',
  original_residence_address_street: 'tersat',
  original_residence_address_building: 'tersat',

  father_name: 'test',
  father_job: 'test',
  father_status: 'ALIVE',
  father_income_level: 'test',
  father_phone_number: 'test',
  father_work_number : '3245243',

  mother_name: 'test',
  mother_education_level: 'test',
  mother_income_level: 'test',
  mother_status: 'ALIVE',
  parent_marital_status: 'MARRIED',

  educational_class: 'testss',
  student_health_status: 'ljfjadfs',

  preserved_parts: [],
  parts_tested_by_the_endowments: []

  }
}


</script>
