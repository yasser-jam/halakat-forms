<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-text>
            <div class="flex items-center justify-between mb-6">
              <div class="text-xl font-semibold">توصيف الأخطاء الممكنة</div>

              <v-btn variant="tonal" color="primary" @click="addMistake"
                >إضافة خطأ</v-btn
              >
            </div>

            <v-form ref="errorForm" v-model="mistakeFormValid">
              <template v-if="mistakes?.length">
                <v-row v-for="mistake in mistakes" class="mb-2 items-center">
                  <v-col cols="7">
                    <base-label>الأخطاء</base-label>
                    <v-text-field
                      v-model="mistake.title"
                      :error-messages="useValidate(mistake.title, ['required'])"
                      outlined
                    />
                  </v-col>

                  <v-col cols="4">
                    <base-label>الدرجات المخصومة (من 100)</base-label>

                    <v-text-field
                      v-model.number="mistake.reduced_marks"
                      type="number"
                      :error-messages="
                        useValidate(String(mistake.reduced_marks), ['required'])
                      "
                    />
                  </v-col>

                  <v-col cols="1">
                    <v-btn
                      v-if="mistakes?.length"
                      variant="tonal"
                      rounded
                      size="small"
                      icon="mdi-minus"
                      color="red"
                      :disabled="mistake.is_related"
                      @click="removeMistake(mistake.title)"
                    >
                    </v-btn>
                  </v-col>
                </v-row>
                <v-btn
                  color="primary"
                  :loading
                  block
                  @click="create"
                  class="mt-2"
                >
                  حفظ
                </v-btn>
              </template>

              <template v-else>
                <base-not-found>
                  <template #subtitle>
                    <div class="font-semibold">لا يوجد أي خطأ حالياً</div>
                  </template>
                </base-not-found>
              </template>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-text>
            <div class="flex items-center justify-between mb-6">
              <div class="text-xl font-semibold">التقييمات المتاحة</div>

              <v-btn variant="tonal" color="primary" @click="addEvaluation"
                >إضافة تقييم</v-btn
              >
            </div>

            <template v-if="evaluations?.length">
              <v-row
                v-for="(evaluation, idx) in evaluations"
                class="mb-2 items-center"
              >
                <v-col cols="6">
                  <base-label>النتيجة</base-label>

                  <v-text-field
                    v-model="evaluation.title"
                    :error-messages="
                      useValidate(evaluation.title, ['required'])
                    "
                  />
                </v-col>
                <v-col cols="2">
                  <base-label>العلامة الدنيا</base-label>

                  <v-text-field
                    v-model.number="evaluation.minimum_marks"
                    type="number"
                    :error-messages="
                      useValidate(String(evaluation.minimum_marks), [
                        'required',
                      ])
                    "
                  />
                </v-col>

                <v-col cols="2">
                  <base-label>النقاط</base-label>

                  <v-text-field
                    v-model.number="evaluation.points"
                    type="number"
                    :error-messages="
                      useValidate(String(evaluation.points), ['required'])
                    "
                  />
                </v-col>

                <v-col cols="2">
                  <v-btn
                    v-if="evaluations?.length"
                    variant="tonal"
                    rounded
                    size="small"
                    icon="mdi-minus"
                    color="red"
                    :disabled="evaluation.is_related"
                    @click="removeEvaluation(evaluation.title)"
                  >
                  </v-btn>
                </v-col>
              </v-row>

              <v-btn
                color="primary"
                :loading="evaluationLoading"
                block
                @click="createEvaluations"
                class="mt-2"
              >
                حفظ
              </v-btn>
            </template>

            <template v-else>
              <base-not-found>
                <template #subtitle>
                  <div class="font-semibold">لا يوجد أي تقييم حالياً</div>
                </template>
              </base-not-found>
            </template>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { Mistake } from '~/types';

import useValidate from '@/composables/useValidate';

const mistakeStore = useMistakeStore();
const evaluationStore = useEvaluationStore();

const { mistakes } = storeToRefs(mistakeStore);
const { evaluations } = storeToRefs(evaluationStore);

const mistakeFormValid = ref(false);

const evaluationLoading = ref(false);
const loading = ref(false);

const { status } = useLazyAsyncData(() => mistakeStore.list());
const { status: evStatus } = useLazyAsyncData(() => evaluationStore.list());

const mistakesData = ref<Mistake[]>(
  mistakes.value?.length
    ? mistakes.value
    : [
        {
          title: '',
          reduced_marks: 0,
        },
      ]
);

const evaluationsData = ref<Evaluation[]>(
  evaluations.value?.length
    ? evaluations.value
    : [
        {
          title: '',
          points: 0,
          minimum_marks: 0,
        },
      ]
);

const addMistake = () => {
  mistakes.value?.push({
    title: '',
    reduced_marks: 0,
  });
};

const addEvaluation = () => {
  evaluations.value?.push({
    title: '',
    points: 0,
    minimum_marks: 0,
  });
};

// Todo: change title to something unique
const removeMistake = (title: string) => {
  mistakes.value = mistakes.value.filter((el) => el.title != title);
};

const removeEvaluation = (title: string) => {
  evaluations.value = evaluations.value.filter(
    (el) => el.title != title
  );
};

// Handle create by better api that takes array and delete and create
const create = async () => {
  loading.value = true;

  try {
    await mistakeStore.assert(mistakes.value);
  } catch {
    await mistakeStore.list();
  } finally {
    loading.value = false;
  }
};

// Handle create by better api that takes array and delete and create
const createEvaluations = async () => {
  evaluationLoading.value = true;

  try {
    await evaluationStore.assert(evaluations.value);
  } catch {
    await evaluationStore.list();
  } finally {
    evaluationLoading.value = false;
  }
};
</script>
