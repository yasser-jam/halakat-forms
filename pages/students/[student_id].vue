<template>
  <div v-if="pending" class="flex justify-center my-4">
    <v-progress-circular
      color="primary"
      size="large"
      indeterminate
    ></v-progress-circular>
  </div>

  <v-container v-else>
    <div class="flex justify-between mb-4">
      <div class="text-3xl font-semibold">معلومات الطالب</div>

      <div class="flex gap-2">
        <v-btn variant="plain" to="/students">إلغاء</v-btn>
        <v-btn color="primary" :disabled="!form" :loading @click="submit"
          >حفظ</v-btn
        >
      </div>
    </div>

    <v-tabs v-model="tab" class="mb-2">
      <v-tab>المعلومات العامة</v-tab>
      <v-tab>معلومات الأهل</v-tab>
      <v-tab>معلومات السكن</v-tab>
      <v-tab>الحالة التعليمية</v-tab>
    </v-tabs>

    <v-form v-model="form">
      <v-window v-model="tab">
        <v-window-item>
          <v-card>
            <v-card-text>
              <v-row>
                <v-col cols="6">
                  <base-label>الاسم</base-label>

                  <v-text-field
                    v-model="student.first_name"
                    :rules="useValidate(student.first_name)"
                    placeholder="اسم الطالب"
                  ></v-text-field>
                </v-col>

                <v-col cols="6">
                  <base-label>الكنية</base-label>

                  <v-text-field
                    v-model="student.last_name"
                    :rules="useValidate(student.last_name)"
                    placeholder="كنية الطالب"
                  ></v-text-field>
                </v-col>

                <v-col cols="6">
                  <base-label>تاريخ الميلاد</base-label>

                  <v-text-field
                    v-model="student.birth_date"
                    :rules="useValidate(String(student.birth_date))"
                    type="date"
                    placeholder="تاريخ ميلاد الطالب"
                  ></v-text-field>
                </v-col>

                <v-col cols="6">
                  <base-label>رقم موبايل الطالب</base-label>

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

                <v-col cols="6">
                  <base-label>الأجزاء المحفوظة</base-label>

                  <sys-parts-select v-model="student.preserved_parts" />
                </v-col>

                <v-col cols="6">
                  <base-label>الأجزاء المختبرة بالأوقاف</base-label>

                  <sys-parts-select
                    v-model="student.parts_tested_by_the_endowments"
                    placeholder="الأجزاء المختبرة بالأوقاف"
                  />
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
                    :rules="useValidate(String(student.father_name))"
                    placeholder="اسم الأب"
                  >
                  </v-text-field>
                </v-col>

                <v-col cols="6">
                  <base-label>حالة الأب</base-label>

                  <sys-status-select v-model="student.father_status" />
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

                  <sys-salary-select v-model="student.father_income_level" />
                </v-col>

                <v-col cols="6">
                  <base-label>مستوى الأب التعليمي</base-label>

                  <sys-education-select
                    v-model="student.father_education_level"
                  />
                </v-col>

                <v-col cols="6">
                  <base-label>حالة الأب الصحية</base-label>

                  <sys-health-select v-model="student.father_health_status" />
                </v-col>

                <v-col cols="12">
                  <base-label>رقم هاتف الأب</base-label>

                  <v-text-field
                    v-model="student.father_phone_number"
                    density="compact"
                    placeholder="09******** (يجب توافر واتس اب)"
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
                    v-model="student.mother_name"
                    density="compact"
                    placeholder="اسم الأم"
                  ></v-text-field>
                </v-col>

                <v-col cols="6">
                  <base-label>حالة الأم</base-label>

                  <sys-status-select v-model="student.mother_status" />
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

                  <sys-salary-select v-model="student.mother_income_level" />
                </v-col>

                <v-col cols="6">
                  <base-label>مستوى الأم التعليمي</base-label>

                  <sys-education-select
                    v-model="student.mother_education_level"
                  />
                </v-col>

                <v-col cols="6">
                  <base-label>حالة الأم الصحية</base-label>

                  <sys-health-select v-model="student.mother_health_status" />
                </v-col>

                <v-col cols="12">
                  <base-label>رقم هاتف الأم</base-label>

                  <v-text-field
                    v-model="student.mother_phone_number"
                    placeholder="09******** (الأفضل توافر واتس اب)"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <base-label>حالة الزواج</base-label>

                  <sys-marriage-select
                    v-model="student.parent_marital_status"
                  />
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
                    :rules="
                      useValidate(
                        String(student.current_residence_address_area)
                      )
                    "
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

                  <sys-class-select v-model="student.educational_class" />
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
    </v-form>

    <div class="flex gap-4 mt-8">
      <v-spacer></v-spacer>
      <v-btn v-if="tab > 0" @click="tab--" color="grey">العودة</v-btn>
      <v-btn v-if="tab < 3" :disabled="!form" @click="tab++">التالي</v-btn>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import type { Student } from "~/types";

const tab = ref<number>(0);
const form = ref<boolean>(false);
const loading = ref<boolean>(false);

const studentStore = useStudentStore();

const { student } = storeToRefs(studentStore);

const route = useRoute();
const router = useRouter();

const studentId = route.params.student_id as string;

const editMode = studentId != "create";

const { pending } = useLazyAsyncData<Student>((): Promise<Student> => {
  if (editMode) return studentStore.get(Number(route.params.student_id));

  studentStore.reset();

  return Promise.resolve({} as Student);
});

const submit = async () => {
  if (!form.value) return;

  loading.value = true;

  try {
    editMode
      ? await studentStore.update(Number(studentId))
      : await studentStore.create();

    goBack();
  } finally {
    loading.value = false;
  }
};

const goBack = () => {
  router.replace("/students");
};

const testData = {
  first_name: "ياسر",
  last_name: "جمال الدين",
  student_mobile_number: "0993544811",
  in_another_mosque: false,
  preserved_parts: [1, 2],
  parts_tested_by_the_endowments: [1, 2],
  birth_date: "2003-04-29",
  student_health_status: "well-health",
  father_name: "أنس",
  current_residence_address_area: "الجبة",
  educational_class: "12",
  special_talent: "الشعر",
  other_mosque_names: "الحاجبية",
  school: "السعادة",
  original_residence_address_area: "الميدان",
  original_residence_address_building: "الزرعي",
  original_residence_address_street: "القاعة",
  current_residence_address_street: "النابلسي",
  current_residence_address_building: "الدبس",
  current_residence_address_floor: "3",
  father_status: "ALIVE",
  father_job: "متعهد",
  father_income_level: "> 500 000 & < 1000 000",
  father_education_level: "college",
  father_health_status: "well-health",
  father_phone_number: "0941452104",
  mother_name: "هناده",
  mother_status: "ALIVE",
  mother_job: "مدرسة",
  mother_income_level: "< 500 000",
  mother_education_level: "college",
  mother_health_status: "well-health",
  mother_phone_number: "0945644678",
  parent_marital_status: "MARRIED",
};
</script>
