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
      <div class="text-3xl font-semibold">معلومات الأستاذ</div>

      <div class="flex gap-2">
        <v-btn variant="plain" to="/teachers">إلغاء</v-btn>
        <v-btn color="primary" :disabled="!form" :loading @click="submit"
          >حفظ</v-btn
        >
      </div>
    </div>

    <v-tabs v-model="tab" class="mb-2">
      <v-tab>المعلومات العامة</v-tab>
      <v-tab>معلومات الحفظ</v-tab>
      <v-tab>معلومات الدراسة</v-tab>
    </v-tabs>

    <v-form v-model="form">
      <v-card>
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
                  <base-label>رقم موبايل الأستاذ</base-label>

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

                <v-col cols="12">
                  <base-label>مواهب مميزة</base-label>

                  <v-text-field
                    v-model="teacher.special_talent"
                    density="compact"
                    placeholder="كرة قدم، شعر، رسم..."
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-window-item>

            <v-window-item>
              <v-row>
                <v-col cols="6">
                  <base-label>الأجزاء المحفوظة</base-label>
                  <sys-parts-select
                    v-model="teacher.preserved_parts"
                    placeholder="الأجزاء المحفوظة"
                  ></sys-parts-select>
                </v-col>

                <v-col cols="6">
                  <base-label>الأجزاء المختبرة بالأوقاف</base-label>
                  <sys-parts-select
                    v-model="teacher.parts_tested_by_the_endowments"
                    placeholder="الأجزاء المختبرة بالأوقاف"
                  ></sys-parts-select>
                </v-col>

                <v-col cols="12">
                  <base-switch-input
                    v-model="teacher.is_mojaz"
                    title="هل الأستاذ مجاز بالقرآن الكريم؟"
                    color="primary"
                  ></base-switch-input>
                </v-col>

                <v-col cols="12" class="mt-4">
                  <base-switch-input
                    v-model="teacher.in_another_mosque"
                    title="هل للأستاذ جوامع أخرى؟"
                    subtitle="هل ساعد الأستاذ في دورة أو حلقة في مسجد آخر"
                    color="warning"
                  ></base-switch-input>
                </v-col>

                <Transition>
                  <v-col
                    v-if="teacher.in_another_mosque"
                    cols="12"
                    class="mt-4"
                  >
                    <base-label>أسماء الجوامع الأخرى</base-label>

                    <v-text-field
                      v-model="teacher.other_mosque_names"
                      density="compact"
                      placeholder="النابلسي، الحاجبية،..."
                    ></v-text-field>
                  </v-col>
                </Transition>
              </v-row>
            </v-window-item>

            <v-window-item>
              <v-row>
                <v-col cols="12">
                  <base-label>المستوى التعليمي</base-label>

                  <sys-education-select v-model="teacher.educational_level" />
                </v-col>

                <template v-if="['college', 'master', 'phd'].includes(teacher.educational_level)">
                  <v-col  cols="6">
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

                </template>

                <v-col cols="12" class="mb-4">
                  <base-switch-input
                    v-model="teacher.is_working"
                    title="هل يعمل الأستاذ"
                    subtitle="هل للأستاذ عمل أو وظيفة أو صنعة؟"
                    color="primary"
                  ></base-switch-input>
                </v-col>

                <Transition>
                  <v-col v-if="teacher.is_working" cols="6">
                    <base-label>اسم العمل</base-label>
                    <v-text-field
                      v-model="teacher.job_role"
                      placeholder="طبيب"
                    ></v-text-field>
                  </v-col>
                </Transition>

                <Transition>
                  <v-col v-if="teacher.is_working" cols="6">
                    <base-label>اسم مكان العمل</base-label>
                    <v-text-field
                      v-model="teacher.workplace_name"
                      placeholder="مشفى المواساة"
                    ></v-text-field>
                  </v-col>
                </Transition>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </v-form>

    <div class="flex gap-4 mt-8">
      <v-spacer></v-spacer>
      <v-btn v-if="tab > 0" @click="--tab" color="grey">العودة</v-btn>
      <v-btn v-if="tab < 2" :disabled="!form" @click="++tab">التالي</v-btn>
    </div>
  </v-container>
</template>

<script setup lang="ts">
const tab = ref<number>(0);
const form = ref<boolean>(false);
const loading = ref<boolean>(false);

const teacherStore = useTeacherStore();

const { teacher } = storeToRefs(teacherStore);

const route = useRoute();
const router = useRouter();

const teacherId = route.params.teacher_id as string;

const editMode = teacherId != "create";

const { pending } = useLazyAsyncData<Teacher>((): Promise<Teacher> => {
  if (editMode) return teacherStore.get(Number(teacherId));

  teacherStore.reset();

  return Promise.resolve({} as Teacher);
});

const submit = async () => {
  if (!form.value) return;

  loading.value = true;

  try {
    editMode
      ? await teacherStore.update(Number(teacherId))
      : await teacherStore.create();

    goBack();
  } finally {
    loading.value = false;
  }
};

const goBack = () => {
  router.replace("/teachers");
};
</script>
