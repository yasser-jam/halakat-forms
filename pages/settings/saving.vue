<template>
  <v-container>
    <v-row>

      <v-col cols="12">
        <!-- <base-info-card>
          <div class="text-xl">
              كل صفحة مُسمعة تحسب لها علامة من 100 درجة
          </div>
        </base-info-card> -->

      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-text>

            <div class="flex items-center justify-between mb-6">
              <div class="text-xl font-semibold">توصيف الأخطاء الممكنة</div>

              <v-btn variant="tonal" color="primary" @click="addMistake">إضافة خطأ</v-btn>

            </div>

            <v-form ref="errorForm" v-model="mistakeFormValid">
              <v-row v-for="mistake in mistakesData" class="mb-2 items-center">
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
                    v-model.number="mistake.removed_points"
                    type="number"
                    :error-messages="
                      useValidate(String(mistake.removed_points), ['required'])
                    "
                  />
                </v-col>

                <v-col cols="1">
                  <v-btn
                    v-if="mistakesData?.length"
                    variant="tonal"
                    rounded
                    size="small"
                    icon="mdi-minus"
                    color="red"
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
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-text>
            <div class="flex items-center justify-between mb-6">
              <div class="text-xl font-semibold">التقييمات المتاحة</div>

              <v-btn variant="tonal" color="primary" @click="addEvaluation">إضافة تقييم</v-btn>

            </div>

            <!-- <v-form ref="resultForm"> -->
              <v-row
                v-for="(evaluation, idx) in evaluationsData"
                class="mb-2 items-center"
              >
                <v-col cols="6">
                  <base-label>النتيجة</base-label>

                  <v-text-field
                    v-model="evaluation.title"
                    :error-messages="useValidate(evaluation.title, ['required'])"
                  />
                </v-col>
                <v-col cols="2">
                  <base-label>العلامة الدنيا</base-label>

                  <v-text-field
                    v-model.number="evaluation.reducedAmount"
                    type="number"
                    :error-messages="
                      useValidate(String(evaluation.reducedAmount), ['required'])
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
                    v-if="evaluationsData?.length"
                    variant="tonal"
                    rounded
                    size="small"
                    icon="mdi-minus"
                    color="red"
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
            <!-- </v-form> -->
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { Mistake } from "~/types";

import useValidate from "@/composables/useValidate";

const mistakeStore = useMistakeStore();
const evaluationStore = useEvaluationStore()

const { mistakes } = storeToRefs(mistakeStore);
const { evaluations } = storeToRefs(evaluationStore)

const mistakeFormValid = ref(false);

const evaluationLoading = ref(false)
const loading = ref(false);

const { status } = useLazyAsyncData(() => mistakeStore.list());
const { status: evStatus } = useLazyAsyncData(() => evaluationStore.list());

const mistakesData = ref<Mistake[]>(
  mistakes.value?.length
    ? mistakes.value
    : [
        {
          title: "",
          removed_points: 0,
        },
      ]
);

const evaluationsData = ref<Evaluation[]>(
  evaluations.value?.length
    ? evaluations.value
    : [
        {
          title: "",
          points: 0,
          reducedAmount: 0,
        },
      ]
)

const addMistake = () => {
  mistakesData.value?.push({
    title: "",
    removed_points: 0,
  });
};

const addEvaluation = () => {
  evaluationsData.value?.push({
    title: "",
    points: 0,
    reducedAmount: 0
  });
}

// Todo: change title to something unique
const removeMistake = (title: string) => {
  mistakesData.value = mistakesData.value.filter((el) => el.title != title);
};

const removeEvaluation = (title: string) => {
  evaluationsData.value = evaluationsData.value.filter((el) => el.title != title);
};

// Handle create by better api that takes array and delete and create
const create = async () => {
  loading.value = true;

  try {
    await mistakeStore.assert(mistakesData.value);
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
    await evaluationStore.assert(evaluationsData.value);
  } catch {
    await evaluationStore.list();
  } finally {
    evaluationLoading.value = false;
  }
};
</script>
