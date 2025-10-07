<template>
  <v-dialog
    v-model="dialog"
    max-width="800"
    persistent
    scrollable
  >
    <v-card>
      <v-card-title class="d-flex align-center bg-primary text-white">
        <v-icon class="me-2">mdi-book-plus</v-icon>
        <span>تعيين قالب منهج للحلقة</span>
        <v-spacer></v-spacer>
        <v-btn
          icon="mdi-close"
          variant="text"
          @click="closeDialog"
        ></v-btn>
      </v-card-title>

      <v-card-text class="pa-0">
        <v-stepper
          v-model="currentStep"
          :items="steps"
          hide-actions
        >
          <!-- Step 1: Select Curriculum -->
          <template #item.1>
            <div class="pa-4">
              <div class="text-xl font-semibold mb-4">اختر المنهج</div>

              <div v-if="loading.curriculums" class="text-center py-4">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
                <div class="mt-2 text-base">جاري تحميل المناهج...</div>
              </div>

              <div v-else-if="curriculums.length === 0" class="text-center py-8">
                <v-icon size="64" color="grey">mdi-book-off</v-icon>
                <div class="text-xl font-semibold mt-2">لا توجد مناهج متاحة</div>
              </div>

              <v-list v-else class="max-height-400 overflow-y-auto">
                <v-list-item
                  v-for="curriculum in curriculums"
                  :key="curriculum.id"
                  :active="selectedCurriculum?.id === curriculum.id"
                  @click="selectCurriculum(curriculum)"
                  class="mb-2"
                  rounded
                >
                  <template #prepend>
                    <v-avatar color="primary" class="me-3">
                      <v-icon>mdi-book</v-icon>
                    </v-avatar>
                  </template>

                  <v-list-item-title class="font-bold">
                    {{ curriculum.name }}
                  </v-list-item-title>
                  
                  <v-list-item-subtitle v-if="curriculum.description">
                    {{ curriculum.description }}
                  </v-list-item-subtitle>

                  <template #append>
                    <v-chip
                      color="primary"
                      variant="tonal"
                      size="small"
                    >
                      {{ curriculum.categories?.length || 0 }} فئة
                    </v-chip>
                  </template>
                </v-list-item>
              </v-list>
            </div>
          </template>

          <!-- Step 2: Select Template -->
          <template #item.2>
            <div class="pa-4">
              <div class="flex items-center mb-4">
                <v-btn
                  icon="mdi-arrow-right"
                  variant="text"
                  @click="currentStep = 1"
                  class="me-2"
                ></v-btn>
                <div class="text-xl font-semibold">اختر القالب من منهج: {{ selectedCurriculum?.name }}</div>
              </div>

              <div v-if="loading.templates" class="text-center py-4">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
                <div class="mt-2 text-base">جاري تحميل القوالب...</div>
              </div>

              <div v-else-if="templates.length === 0" class="text-center py-8">
                <v-icon size="64" color="grey">mdi-file-document-outline</v-icon>
                <div class="text-xl font-semibold mt-2">لا توجد قوالب متاحة لهذا المنهج</div>
              </div>

              <v-list v-else class="max-height-400 overflow-y-auto">
                <v-list-item
                  v-for="template in templates"
                  :key="template.id"
                  :active="selectedTemplate?.id === template.id"
                  @click="selectTemplate(template)"
                  class="mb-2"
                  rounded
                >
                  <template #prepend>
                    <v-avatar color="secondary" class="me-3">
                      <v-icon>mdi-file-document</v-icon>
                    </v-avatar>
                  </template>

                  <v-list-item-title class="font-bold">
                    {{ template.name || 'قالب افتراضي' }}
                  </v-list-item-title>
                  
                  <v-list-item-subtitle v-if="template.notes">
                    {{ template.notes }}
                  </v-list-item-subtitle>

                  <template #append>
                    <div class="flex flex-col items-end">
                      <v-chip
                        color="secondary"
                        variant="tonal"
                        size="small"
                        class="mb-1"
                      >
                        {{ template.nodes?.length || 0 }} عقدة
                      </v-chip>
                      <span class="text-xs text-gray-500">
                        {{ formatDate(template.created_at) }}
                      </span>
                    </div>
                  </template>
                </v-list-item>
              </v-list>
            </div>
          </template>
        </v-stepper>
      </v-card-text>

      <v-card-actions class="pa-4">
        <v-spacer></v-spacer>
        
        <v-btn
          variant="text"
          @click="closeDialog"
        >
          إلغاء
        </v-btn>

        <v-btn
          v-if="currentStep === 1"
          color="primary"
          :disabled="!selectedCurriculum"
          @click="goToTemplateSelection"
        >
          التالي
          <v-icon end>mdi-arrow-left</v-icon>
        </v-btn>

        <v-btn
          v-if="currentStep === 2"
          color="primary"
          :disabled="!selectedTemplate"
          :loading="loading.assign"
          @click="assignTemplate"
        >
          تعيين القالب
          <v-icon end>mdi-check</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { Curriculum, CurriculumTemplate } from '~/types';

interface Props {
  modelValue: boolean;
  groupId: number;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'assigned': [];
}>();

// Stores
const curriculumStore = useCurriculumStore();
const curriculumTemplateStore = useCurriculumTemplateStore();

// Dialog state
const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

// Stepper state
const currentStep = ref(1);
const steps = [
  { title: 'اختيار المنهج', value: 1 },
  { title: 'اختيار القالب', value: 2 }
];

// Loading states
const loading = reactive({
  curriculums: false,
  templates: false,
  assign: false
});

// Selection states
const selectedCurriculum = ref<Curriculum | null>(null);
const selectedTemplate = ref<CurriculumTemplate | null>(null);

// Data
const curriculums = ref<Curriculum[]>([]);
const templates = ref<CurriculumTemplate[]>([]);

// Methods
const loadCurriculums = async () => {
  loading.curriculums = true;
  try {
    curriculums.value = await curriculumStore.list();
  } catch (error) {
    console.error('Error loading curriculums:', error);
  } finally {
    loading.curriculums = false;
  }
};

const loadTemplates = async (curriculumId: number) => {
  loading.templates = true;
  try {
    // Get all templates and filter by curriculum
    const allTemplates = await curriculumTemplateStore.list();
    templates.value = allTemplates.filter(template => template.curriculum_id === curriculumId);
  } catch (error) {
    console.error('Error loading templates:', error);
  } finally {
    loading.templates = false;
  }
};

const selectCurriculum = (curriculum: Curriculum) => {
  selectedCurriculum.value = curriculum;
};

const selectTemplate = (template: CurriculumTemplate) => {
  selectedTemplate.value = template;
};

const goToTemplateSelection = async () => {
  if (!selectedCurriculum.value) return;
  
  currentStep.value = 2;
  await loadTemplates(selectedCurriculum.value.id);
};

const assignTemplate = async () => {
  if (!selectedTemplate.value) return;
  
  loading.assign = true;
  try {
    await curriculumTemplateStore.assignToGroup(props.groupId, selectedTemplate.value.id!);
    emit('assigned');
    closeDialog();
  } catch (error) {
    console.error('Error assigning template:', error);
  } finally {
    loading.assign = false;
  }
};

const closeDialog = () => {
  dialog.value = false;
  // Reset state
  currentStep.value = 1;
  selectedCurriculum.value = null;
  selectedTemplate.value = null;
  templates.value = [];
};

const formatDate = (dateString?: string): string => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return '';
  }
};

// Watch dialog open to load curriculums
watch(dialog, (isOpen) => {
  if (isOpen) {
    loadCurriculums();
  }
});
</script>

<style scoped>
.max-height-400 {
  max-height: 400px;
}
</style>
