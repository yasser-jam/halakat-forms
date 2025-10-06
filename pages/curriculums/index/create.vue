<template>
  <base-dialog
    model-value="true"
    title="إضافة منهج جديد"
    max-width="600"
    :loading="loading"
    hide-actions
    @close="navigateBack"
  >
    <v-form v-model="form" @submit.prevent="handleSubmit">
      <v-row>
        <!-- Curriculum Name -->
        <v-col cols="12">
          <base-label required>اسم المنهج</base-label>
          <v-text-field
            v-model="curriculum.name"
            placeholder="اسم المنهج"
            :rules="useValidate(curriculum.name, ['required'])"
          ></v-text-field>
        </v-col>

        <!-- Description -->
        <v-col cols="12">
          <base-label>الوصف</base-label>
          <v-textarea
            v-model="curriculum.description"
            placeholder="وصف المنهج (اختياري)"
            rows="4"
          ></v-textarea>
        </v-col>
      </v-row>

      <div class="flex justify-end gap-2">
        <v-btn variant="plain" @click="navigateBack">إلغاء</v-btn>
        <v-btn 
          color="primary" 
          :disabled="!form"
          :loading="submitting"
          @click="handleSubmit"
        >
          إضافة
        </v-btn>
      </div>
    </v-form>
  </base-dialog>
</template>

<script setup lang="ts">
import type { Curriculum } from '~/types';

const curriculumStore = useCurriculumStore();
const { curriculum } = storeToRefs(curriculumStore);

const form = ref(false);
const loading = ref(false);
const submitting = ref(false);

// Initialize curriculum data
curriculumStore.reset();

const handleSubmit = async () => {
  if (!form.value) return;

  submitting.value = true;
  try {
    await curriculumStore.create();
    
    await curriculumStore.list();

    navigateBack();
  } finally {
    submitting.value = false;
  }
};

const navigateBack = () => {
  navigateTo('/curriculums');
};

// Watch for changes in curriculum data and sync with store
watch(() => curriculum.value, (newValue) => {
  curriculumStore.curriculum = newValue;
}, { deep: true });
</script>
