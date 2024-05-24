<template>
  <v-window v-model="tab">
    <v-window-item>
      <div
        class="text-base text-gray-800 max-w-[80%] text-center leading-relaxed my-8 mx-auto"
      >
        تدعوكم إدارة مسجد الشيخ علي الدقر إلى التسجيل بدوراتها الصيفية لعام
        <span>2024</span> متمنين الخير والتوفيق لنا ولكم تدعوكم إدارة مسجد الشيخ
        علي الدقر إلى التسجيل بدوراتها الصيفية لعام <span>2024</span> متمنين
        الخير والتوفيق لنا ولكم تدعوكم إدارة مسجد الشيخ علي الدقر إلى التسجيل
        بدوراتها الصيفية لعام <span>2024</span> متمنين الخير والتوفيق لنا ولكم
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
            placeholder="اسم الطالب"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <base-label>الكنية</base-label>

          <v-text-field
            v-model="student.last_name"
            placeholder="كنية الطالب"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <base-label>تاريخ الميلاد</base-label>

          <v-text-field
            v-model="student.birth_date"
            type="date"
            placeholder="تاريخ ميلاد الطالب"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <base-label>رقم موبايل الطالب</base-label>

          <v-text-field
            v-model="student.student_mobile_number"
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
        <v-btn color="primary" @click="tab++">التالي</v-btn>
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
            v-model="student.motehr_name"
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

          <sys-marriage-status v-model="student.parent_marital_status" />
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
        <v-btn color="primary" @click="submit">إرسال</v-btn>
      </div>
    </v-window-item>

    <v-window-item>
      <div class="flex flex-col justify-center items-center gap-4 my-6">
        <v-icon color="primary" size="3rem">mdi-check-circle</v-icon>

        <div
          class="text-base text-gray-800 max-w-[80%] text-center leading-relaxed"
        >
          تم تسجيل طلبكم، سيتم إرسال رسالة على الواتس اب لتأكيد التسجيل.
        </div>
      </div>
    </v-window-item>
  </v-window>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "public",
});

const tab = ref(0);

const studentStore = useStudentStore();

const { student } = storeToRefs(studentStore);

const loading = ref<boolean>(false);

const submit = async () => {
  loading.value = true;

  try {
    await studentStore.create();
  } finally {
    loading.value = false;
  }
};
</script>
