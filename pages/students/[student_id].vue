<template>
  <v-container>
    <div class="flex justify-between mb-4">
      <div class="text-3xl font-semibold">معلومات الطالب</div>

      <div class="flex gap-2">
        <v-btn variant="plain">إلغاء</v-btn>
        <v-btn color="primary" elevation="0">حفظ</v-btn>
      </div>
    </div>

    <v-tabs v-model="tab" class="mb-2">
      <v-tab>المعلومات العامة</v-tab>
      <v-tab>معلومات الأهل</v-tab>
      <v-tab>معلومات السكن</v-tab>
      <v-tab>الحالة التعليمية</v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item>
        <v-card>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <base-label>الاسم</base-label>

                <v-text-field
                  v-model="student.first_name"
                  placeholder="اسم الطالب"
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <base-label>الكنية</base-label>

                <v-text-field
                  v-model="student.last_name"
                  placeholder="كنية الطالب"
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <base-label>تاريخ الميلاد</base-label>

                <v-text-field
                  v-model="student.birth_date"
                  type="date"
                  placeholder="تاريخ ميلاد الطالب"
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <base-label>رقم موبايل الطالب</base-label>

                <v-text-field
                  v-model="student.student_mobile"
                  density="compact"
                  placeholder="09********"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <base-label>الحالةالصحية</base-label>

                <v-select
                  v-model="student.student_health_status"
                  :items="healthStatus"
                  placeholder="معافى"
                ></v-select>
              </v-col>

              <!-- <v-col cols="12">
                    <base-label>اسم المرض</base-label>

                    <v-text-field placeholder="اسم المرض"></v-text-field>
                  </v-col> -->

              <v-col cols="6">
                <base-label>الأجزاء المحفوظة</base-label>

                <v-select
                  v-model="student.preserved_parts"
                  :items="parts"
                  multiple
                  chips
                  placeholder="الأجزاء المحفوظة"
                ></v-select>
              </v-col>

              <v-col cols="6">
                <base-label>الأجزاء المختبرة بالأوقاف</base-label>

                <v-select
                  v-model="student.parts_tested_by_the_endowments"
                  :items="parts"
                  multiple
                  chips
                  placeholder="الأجزاء المختبرة بالأوقاف"
                ></v-select>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-window-item>

      <v-window-item>
        <v-card>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <base-label>اسم الأب</base-label>

                <v-text-field
                  v-model="student.father_name"
                  placeholder="اسم الأب"
                >
                </v-text-field>
              </v-col>

              <v-col cols="6">
                <base-label>حالة الأب</base-label>

                <v-select
                  v-model="student.father_status"
                  placeholder="حالة الأب"
                  :items="existStatus"
                ></v-select>
              </v-col>

              <v-col cols="6">
                <base-label>وظيفة الأب</base-label>

                <v-text-field
                  v-model="student.father_job"
                  density="compact"
                  placeholder="موظف"
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <base-label>دخل الأب الشهري</base-label>

                <v-select
                  v-model="student.father_income_level"
                  placeholder="الدخل الشهري"
                  :items="salaryRanges"
                ></v-select>
              </v-col>

              <v-col cols="6">
                <base-label>مستوى الأب التعليمي</base-label>
                <v-select
                  v-model="student.father_education_level"
                  placeholder="بكالوريا، جامعي، ماجستير..."
                  :items="scholarStatus"
                ></v-select>
              </v-col>

              <v-col cols="6">
                <base-label>حالة الأب الصحية</base-label>

                <v-select
                  v-model="student.father_health_status"
                  :items="healthStatus"
                  placeholder="معافى"
                ></v-select>
              </v-col>

              <v-col cols="6">
                <base-label>رقم هاتف الأب</base-label>

                <v-text-field
                  v-model="student.father_phone_number"
                  density="compact"
                  placeholder="09********"
                ></v-text-field>
              </v-col>

              <!-- <v-col cols="6">
                <base-label>رقم هاتف العمل</base-label>

                <v-text-field
                  density="compact"
                  placeholder="09********"
                ></v-text-field>
              </v-col> -->

              <v-col cols="6">
                <base-label>اسم الأم</base-label>

                <v-text-field
                  v-model="student.motehr_name"
                  density="compact"
                  placeholder="اسم الأم"
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <base-label>حالة الأم</base-label>

                <v-select
                  v-model="student.mother_status"
                  placeholder="حالة الأم"
                  :items="existStatus"
                ></v-select>
              </v-col>

              <v-col cols="6">
                <base-label>وظيفة الأم</base-label>

                <v-text-field
                  v-model="student.mother_job"
                  placeholder="مدرسة"
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <base-label>دخل الأم</base-label>

                <v-select
                  v-model="student.mother_income_level"
                  :items="salaryRanges"
                  placeholder="الدخل الشهري"
                ></v-select>
              </v-col>

              <v-col cols="6">
                <base-label>مستوى الأم التعليمي</base-label>

                <v-select
                  v-model="student.mother_education_level"
                  :items="scholarStatus"
                  placeholder="بكالوريا، جامعي، ماجستير..."
                ></v-select>
              </v-col>

              <v-col cols="6">
                <base-label>حالة الأم الصحية</base-label>

                <v-select
                  v-model="student.mother_health_status"
                  :items="healthStatus"
                  placeholder="معافى"
                ></v-select>
              </v-col>

              <v-col cols="6">
                <base-label>رقم موبايل الأم</base-label>

                <v-text-field
                  v-model="student.mother_phone_number"
                  placeholder="09********"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <base-label>حالة الزواج</base-label>

                <v-text-field
                  v-model="student.parent_marital_status"
                  placeholder="متزوجان"
                ></v-text-field>
              </v-col>

              <!-- <v-col cols="6">
                <base-label>الهاتف الأرضي</base-label>

                <v-text-field
                v-model="student.mother_phone_number"
                  placeholder="011*******"
                ></v-text-field>
              </v-col> -->
            </v-row>
          </v-card-text>
        </v-card>
      </v-window-item>

      <v-window-item>
        <v-card>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <base-label>منطقة السكن الأصلي</base-label>

                <v-text-field
                  v-model="student.original_residence_address_area"
                  placeholder="المهاجرين"
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <base-label>شارع السكن الأصلي</base-label>

                <v-text-field
                  v-model="student.original_residence_address_street"
                  placeholder="شورى"
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <base-label>بناء السكن الأصلي</base-label>

                <v-text-field
                  v-model="student.original_residence_address_building"
                  placeholder="بناء الزهور"
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <base-label>منطقة السكن الحالي</base-label>

                <v-text-field
                  v-model="student.current_residence_address_area"
                  placeholder="الميدان"
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <base-label>شارع السكن الحالي</base-label>

                <v-text-field
                  v-model="student.current_residence_address_street"
                  placeholder="حي الزاهرة"
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <base-label>بناء السكن الحالي</base-label>

                <v-text-field
                  v-model="student.current_residence_address_building"
                  placeholder="بناء الزرعي"
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <base-label>طابق السكن الحالي</base-label>

                <v-text-field
                  v-model="student.current_residence_address_floor"
                  placeholder="الطابق الخامس"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-window-item>

      <v-window-item>
        <v-card>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <base-label>الصف الدراسي</base-label>

                <v-select
                  v-model="student.educational_class"
                  :items="classes"
                  placeholder="الصف السابع"
                ></v-select>
              </v-col>

              <v-col cols="6">
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
          </v-card-text>
        </v-card>
      </v-window-item>
    </v-window>

    <div class="flex gap-4 mt-8">
      <v-spacer></v-spacer>
      <v-btn v-if="tab > 0" @click="tab--" color="grey">العودة</v-btn>
      <v-btn v-if="tab < 3" @click="tab++">التالي</v-btn>
    </div>
  </v-container>
</template>

<script setup lang="ts">
const tab = ref<number>(0);

const studentStore = useStudentStore();

const { student } = storeToRefs(studentStore);

const classes = ref([
  {
    title: "الصف السابع",
    value: "7",
  },
  {
    title: "الصف الثامن",
    value: "8",
  },
  {
    title: "الصف التاسع",
    value: "9",
  },
  {
    title: "الصف العاشر",
    value: "10",
  },
  {
    title: "الصف الحادي عشر",
    value: "11",
  },
  {
    title: "بكالوريا",
    value: "12",
  },
]);

const existStatus = ref([
  {
    title: "موجود",
    value: "exist",
  },
  {
    title: "متوفى",
    value: "dead",
  },
  {
    title: "مفقود",
    value: "missed",
  },
]);

const healthStatus = ref([
  {
    title: "معافى",
    value: "well-health",
  },
  {
    title: "مريض",
    value: "patient",
  },
]);

const salaryRanges = ref([
  {
    title: "أقل من 500 ألف",
    value: "< 500 000",
  },
  {
    title: "500 ألف - 1 مليون",
    value: "> 500 000 & < 1000 000",
  },
  {
    title: "1 مليون - 2 مليون",
    value: "> 1000 000 & < 2000 000",
  },
  {
    title: "2 مليون - 4 مليون",
    value: "> 2000 000 & < 4000 000",
  },
  {
    title: "أكثر من 4 مليون",
    value: "> 4000 000",
  },
]);

const scholarStatus = ref([
  {
    title: "غير متعلم",
    value: "none",
  },
  {
    title: "ابتدائية",
    value: "primary",
  },
  {
    title: "إعدادية",
    value: "secondary",
  },
  {
    title: "ثانوية",
    value: "high-school",
  },
  {
    title: "جامعة",
    value: "college",
  },
  {
    title: "ماجستير",
    value: "master",
  },
  {
    title: "دكتوراه",
    value: "phd",
  },
]);

const parts = [
    { title: "الأول", value: 1 },
    { title: "الثاني", value: 2 },
    { title: "الثالث", value: 3 },
    { title: "الرابع", value: 4 },
    { title: "الخامس", value: 5 },
    { title: "السادس", value: 6 },
    { title: "السابع", value: 7 },
    { title: "الثامن", value: 8 },
    { title: "التاسع", value: 9 },
    { title: "العاشر", value: 10 },
    { title: "الحادي عشر", value: 11 },
    { title: "الثاني عشر", value: 12 },
    { title: "الثالث عشر", value: 13 },
    { title: "الرابع عشر", value: 14 },
    { title: "الخامس عشر", value: 15 },
    { title: "السادس عشر", value: 16 },
    { title: "السابع عشر", value: 17 },
    { title: "الثامن عشر", value: 18 },
    { title: "التاسع عشر", value: 19 },
    { title: "العشرون", value: 20 },
    { title: "الحادي والعشرون", value: 21 },
    { title: "الثاني والعشرون", value: 22 },
    { title: "الثالث والعشرون", value: 23 },
    { title: "الرابع والعشرون", value: 24 },
    { title: "الخامس والعشرون", value: 25 },
    { title: "السادس والعشرون", value: 26 },
    { title: "السابع والعشرون", value: 27 },
    { title: "الثامن والعشرون", value: 28 },
    { title: "التاسع والعشرون", value: 29 },
    { title: "الثلاثون", value: 30 }
];

const marriageStatus = ref([
  {
    title: 'متزوجان',
    value: 'married'
  },
  {
    title: 'منفصلان',
    value: 'divorced'
  },
])
</script>
