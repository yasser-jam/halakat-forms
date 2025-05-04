<template>
  <v-container>
    <v-row>
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
                  <base-label>النقاط</base-label>

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
            <div class="text-xl font-semibold mb-6">توصيف نتيجة الصفحة</div>

            <!-- <v-form ref="resultForm" v-model="resultFormValid">
              <v-row
                v-for="(result, idx) in resultLevels"
                class="mb-2"
              >
                <v-col cols="7">
                  <base-label>النتيجة</base-label>

                  <v-text-field
                    v-model="result.label"
                    :error-messages="useValidate(result.label, ['required'])"
                  />
                </v-col>
                <v-col cols="3">
                  <base-label>النقاط</base-label>

                  <v-text-field
                    v-model.number="result.points"
                    type="number"
                    :error-messages="
                      useValidate(String(result.points), ['required'])
                    "
                  />
                </v-col>

                <v-col cols="2">
                  <v-btn
                    variant="tonal"
                    rounded
                    size="small"
                    icon="mdi-delete"
                    color="red"
                    class="mt-6"
                    @click="removeResult(idx)"
                    v-if="errorPoints.length > 1"
                  >
                  </v-btn>
                </v-col>

              </v-row>
              <v-btn color="primary" @click="addMistake" class="mt-2">
                <v-icon left>mdi-plus</v-icon>
                إضافة مستوى
              </v-btn>
            </v-form> -->
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { Mistake } from "~/types";

const mistakeStore = useMistakeStore();

const { mistakes } = storeToRefs(mistakeStore);

const mistakeFormValid = ref(false);

const loading = ref(false);

const { status } = useLazyAsyncData(() => mistakeStore.list());

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

const addMistake = () => {
  mistakesData.value?.push({
    title: "",
    removed_points: 0,
  });
};

// Todo: change title to something unique
const removeMistake = (title: string) => {
  mistakesData.value = mistakesData.value.filter((el) => el.title != title);
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
</script>
