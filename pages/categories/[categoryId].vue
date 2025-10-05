<template>
  <base-dialog
    model-value="true"
    :title="isEditMode ? `تعديل الفئة: ${category?.name || ''}` : 'إضافة فئة جديدة'"
    max-width="600"
    :loading
    hide-actions
    @close="navigateBack"
  >
    <v-form v-model="form" @submit.prevent="handleSubmit">
      <v-row>
        <!-- Category Name -->
        <v-col cols="12">
          <base-label required>اسم الفئة</base-label>
          <v-text-field
            v-model="category.name"
            placeholder="اسم الفئة"
            :rules="useValidate(category.name, ['required'])"
          ></v-text-field>
        </v-col>

        <!-- Description -->
        <v-col cols="12">
          <base-label>الوصف</base-label>
          <v-textarea
            v-model="category.description"
            placeholder="وصف الفئة (اختياري)"
            rows="3"
          ></v-textarea>
        </v-col>

        <!-- Color -->
        <!-- <v-col cols="12">
          <base-label required>اللون</base-label>
          <div class="flex items-center gap-4">
            <v-text-field
              v-model="category.color"
              placeholder="#000000"
              :rules="useValidate(category.color, ['required'])"
              class="flex-1"
            ></v-text-field>
            <div 
              class="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
              :style="{ backgroundColor: category.color }"
              @click="showColorPicker = !showColorPicker"
            ></div>
          </div>
          
          <div v-if="showColorPicker" class="mt-4 p-4 border rounded-lg">
            <div class="text-sm font-semibold mb-2">اختر لوناً:</div>
            <div class="grid grid-cols-8 gap-2">
              <div
                v-for="color in predefinedColors"
                :key="color"
                class="w-8 h-8 rounded cursor-pointer border-2"
                :class="category.color === color ? 'border-gray-800' : 'border-gray-300'"
                :style="{ backgroundColor: color }"
                @click="selectColor(color)"
              ></div>
            </div>
          </div>
        </v-col> -->
      </v-row>

      <div class="flex justify-end gap-2">
        <v-btn variant="plain" @click="navigateBack">إلغاء</v-btn>
        <v-btn 
          color="primary" 
          :disabled="!form"
          :loading="submitting"
          @click="handleSubmit"
        >
          {{ isEditMode ? 'تحديث' : 'إضافة' }}
        </v-btn>
      </div>
    </v-form>
  </base-dialog>
</template>

<script setup lang="ts">
import type { Category } from '~/types';

const route = useRoute();
const categoryId = route.params.categoryId as string;

const isEditMode = categoryId !== 'create';

const categoryStore = useCategoryStore();
const { selectedCategory } = storeToRefs(categoryStore);

const form = ref(false);
const loading = ref(false);
const submitting = ref(false);
const showColorPicker = ref(false);

// Category data - use init function
const category = ref<Category>(initCategory());

// Predefined colors for easy selection
const predefinedColors = [
  '#FF5722', '#E91E63', '#9C27B0', '#673AB7',
  '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4',
  '#009688', '#4CAF50', '#8BC34A', '#CDDC39',
  '#FFEB3B', '#FFC107', '#FF9800', '#FF5722',
  '#795548', '#9E9E9E', '#607D8B', '#000000'
];

// Load data on mount
const { pending } = useLazyAsyncData(async () => {
  loading.value = true;
  try {
    if (isEditMode) {
      // Load specific category for editing
      await categoryStore.get(Number(categoryId));
      if (selectedCategory.value) {
        category.value = { ...selectedCategory.value };
      }
    }
  } finally {
    loading.value = false;
  }
});

const selectColor = (color: string) => {
  category.value.color = color;
  showColorPicker.value = false;
};

const handleSubmit = async () => {
  if (!form.value) return;

  submitting.value = true;
  try {
    // Set the category data in store
    categoryStore.category = category.value;
    
    if (isEditMode) {
      await categoryStore.update(Number(categoryId));
    } else {
      await categoryStore.create();
    }
    
    navigateBack();
  } finally {
    submitting.value = false;
  }
};

const navigateBack = () => {
  navigateTo('/categories');
};

// Watch for changes in category data and sync with store
watch(() => category.value, (newValue) => {
  categoryStore.category = newValue;
  if (isEditMode) {
    categoryStore.selectedCategory = newValue;
  }
}, { deep: true });
</script>
