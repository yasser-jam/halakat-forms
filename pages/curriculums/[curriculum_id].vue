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
      <div class="text-3xl font-semibold">
        {{ editMode ? 'تعديل المنهج' : 'إضافة منهج جديد' }}
      </div>

      <div class="flex gap-2">
        <v-btn 
          v-if="tab === 0"
          color="primary" 
          :disabled="!form" 
          :loading="loading"
          @click="submit"
        >
          حفظ
        </v-btn>
      </div>
    </div>

    <v-tabs v-model="tab" class="mb-2">
      <v-tab>معلومات المنهج</v-tab>
      <v-tab v-if="editMode">قوالب المنهج</v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <!-- Curriculum Info Tab -->
      <v-window-item>
        <v-form v-model="form">
          <v-card>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="6">
                  <base-label>اسم المنهج</base-label>
                  <v-text-field
                    v-model="curriculum.name"
                    :rules="useValidate(curriculum.name)"
                    placeholder="اسم المنهج"
                  ></v-text-field>
                </v-col>


                <v-col cols="12" md="6" v-if="editMode">
                  <base-label>الفئات المرتبطة</base-label>
                  <curriculum-categories-select v-model="curriculum.categories" />
                </v-col>

                <v-col cols="12" md="6">
                  <base-label>الوصف</base-label>
                  <v-textarea
                    v-model="curriculum.description"
                    placeholder="وصف المنهج"
                    rows="3"
                  ></v-textarea>
                </v-col>

                

                <v-divider></v-divider>

                <v-col cols="12" v-if="editMode">
                  <div class="text-sm text-gray-500">
                    <div class="my-2">تاريخ الإنشاء: {{ formatDate(curriculum.created_at) }}</div>
                    <div v-if="curriculum.updated_at">آخر تحديث: {{ formatDate(curriculum.updated_at) }}</div>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-form>
      </v-window-item>

      <!-- Curriculum Templates Tab -->
      <v-window-item v-if="editMode">
        <v-card class="bg-transparent">
          <v-card-title>

            <div class="flex justify-between items-center">
              <span class="text-xl font-semibold">قوالب المنهج</span>
              <v-btn
                color="primary"
                @click="openAddTemplateDialog"
              >
                إضافة قالب جديد
              </v-btn>
            </div>
          </v-card-title>
          
          <v-card-text>
            <div v-if="templatesLoading" class="flex justify-center my-8">
              <v-progress-circular
                color="primary"
                size="large"
                indeterminate
              ></v-progress-circular>
            </div>

            <base-not-found v-else-if="curriculumTemplates.length === 0" />

            <v-row v-else>
              <v-col
                v-for="template in curriculumTemplates"
                :key="template.id"
                cols="12"
                sm="6"
              >
                <v-card
                  class="h-100"
                >
                  <v-card-text class="pb-2">
                    <div class="flex items-start gap-3 mb-3">
                      <v-avatar
                        color="primary"
                        size="48"
                      >
                        <v-icon color="white">mdi-book-outline</v-icon>
                      </v-avatar>
                      
                      <div class="flex-1 min-w-0">
                        <div class="font-weight-bold text-xl text-truncate mb-1">
                          {{ template.name || template.curriculum?.name }}
                        </div>
                        <v-chip
                          color="info"
                          variant="tonal"
                          size="small"
                          class="mb-2"
                        >
                          {{ template.campaign?.name || 'غير محدد' }}
                        </v-chip>
                      </div>
                    </div>

                    <div v-if="template.notes" class="text-sm text-gray-500 mb-3">
                      {{ template.notes }}
                    </div>

                    <div class="flex items-center justify-between mb-3">
                      <v-chip
                        color="primary"
                        variant="tonal"
                        size="small"
                      >
                        <v-icon start size="16">mdi-sitemap</v-icon>
                        {{ template.nodes?.length || 0 }} عقدة
                      </v-chip>
                      
                      <v-chip
                        color="success"
                        variant="tonal"
                        size="small"
                      >
                        <v-icon start size="16">mdi-calendar</v-icon>
                        {{ formatDate(template.created_at) }}
                      </v-chip>
                    </div>
                  </v-card-text>

                  <v-card-actions class="pt-0">
                    <v-btn
                      color="green"
                      variant="tonal"
                      size="small"
                      @click="viewTemplate(template)"
                      title="عرض العقد"
                    >
                      <v-icon start>mdi-eye</v-icon>
                      عرض
                    </v-btn>
                    
                    <v-spacer></v-spacer>
                    
                    <v-btn
                      color="blue"
                      variant="tonal"
                      size="small"
                      icon="mdi-pencil"
                      @click="editTemplate(template)"
                      title="تعديل القالب"
                    ></v-btn>
                    
                    <v-btn
                      color="error"
                      variant="tonal"
                      size="small"
                      icon="mdi-trash-can"
                      @click="openDeleteTemplateDialog(template.id as number)"
                      title="حذف القالب"
                    ></v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-window-item>
    </v-window>
  </v-container>

  <!-- Add Template Dialog -->
  <base-dialog v-model="addTemplateDialog" hide-actions title="إضافة قالب جديد" max-width="600">
    <v-form v-model="templateForm">
      <v-row>
        <v-col cols="12">
          <base-label>اسم القالب (اختياري)</base-label>
          <v-text-field
            v-model="curriculumTemplate.name"
            placeholder="اسم مخصص للقالب"
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <base-label>ملاحظات (اختياري)</base-label>
          <v-textarea
            v-model="curriculumTemplate.notes"
            placeholder="ملاحظات خاصة بالحملة"
            rows="3"
          ></v-textarea>
        </v-col>
      </v-row>


      <div class="flex justify-end gap-2">

        <v-btn variant="plain" @click="addTemplateDialog = false">إلغاء</v-btn>
        <v-btn 
          color="primary" 
          :disabled="!templateForm"
          :loading="templateLoading"
          @click="createTemplate"
        >
          إضافة
        </v-btn>
      </div>
    </v-form>
  </base-dialog>

  <!-- Delete Template Dialog -->
  <base-delete-dialog
    v-model="deleteTemplateDialog"
    :loading="deleteTemplateLoading"
    @delete="removeTemplate"
  ></base-delete-dialog>

  <NuxtPage />
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { storeToRefs } from 'pinia';
import type { Curriculum, CurriculumTemplate, Campaign } from '~/types';

const tab = ref<number>(0);
const form = ref<boolean>(false);
const loading = ref<boolean>(false);
const templatesLoading = ref<boolean>(false);

// Template management
const templateForm = ref<boolean>(false);
const templateLoading = ref<boolean>(false);
const addTemplateDialog = ref<boolean>(false);
const deleteTemplateDialog = ref<boolean>(false);
const deleteTemplateLoading = ref<boolean>(false);
const deletedTemplateId = ref<number>();

// Stores
const curriculumStore = useCurriculumStore();
const curriculumTemplateStore = useCurriculumTemplateStore();
const campaignStore = useCampaignStore();

const { curriculum } = storeToRefs(curriculumStore);
const { 
  curriculumTemplate, 
  curriculumTemplates, 
  curriculumTemplatesTotalCount
} = storeToRefs(curriculumTemplateStore);

// Route and navigation
const route = useRoute();
const router = useRouter();

const curriculumId = route.params.curriculum_id as string;
const editMode = curriculumId !== "create";

// Campaigns for template creation
const campaigns = ref<Campaign[]>([]);

// Load data
const { pending } = useLazyAsyncData<Curriculum>(async (): Promise<Curriculum> => {
  if (editMode) {
    const curriculumData = await curriculumStore.get(Number(curriculumId));
    
    // Load templates for this curriculum
    await loadTemplates();
    
    // Load campaigns for template creation
    campaigns.value = await campaignStore.list();
    
    return curriculumData;
  }

  curriculumStore.reset();
  return Promise.resolve({} as Curriculum);
});

const loadTemplates = async () => {
  templatesLoading.value = true;
  try {
    // Filter templates by curriculum_id
    await curriculumTemplateStore.list();
    // Filter the results to show only templates for this curriculum
    curriculumTemplates.value = curriculumTemplates.value.filter(
      template => template.curriculum_id === Number(curriculumId)
    );
  } finally {
    templatesLoading.value = false;
  }
};

// Curriculum operations
const submit = async () => {
  if (!form.value) return;

  loading.value = true;

  try {
    editMode
      ? await curriculumStore.update(Number(curriculumId))
      : await curriculumStore.create();

    goBack();
  } finally {
    loading.value = false;
  }
};

// Template operations
const openAddTemplateDialog = () => {
  curriculumTemplateStore.reset();
  curriculumTemplate.value.curriculum_id = Number(curriculumId);
  addTemplateDialog.value = true;
};

const createTemplate = async () => {
  if (!templateForm.value) return;

  templateLoading.value = true;

  try {
    await curriculumTemplateStore.create();
    addTemplateDialog.value = false;
    await loadTemplates();
  } finally {
    templateLoading.value = false;
  }
};

const editTemplate = (template: CurriculumTemplate) => {
  // Navigate to template editing page (to be created later)
  console.log('Edit template:', template);
};

const viewTemplate = (template: CurriculumTemplate) => {
  navigateTo(`/curriculums/${curriculumId}/template/${template.id}`);
};

const openDeleteTemplateDialog = (id: number) => {
  deletedTemplateId.value = id;
  deleteTemplateDialog.value = true;
};

const removeTemplate = async () => {
  deleteTemplateLoading.value = true;

  try {
    await curriculumTemplateStore.remove(deletedTemplateId.value as number);
    await loadTemplates();
  } finally {
    deleteTemplateLoading.value = false;
    deleteTemplateDialog.value = false;
  }
};

const goBack = () => {
  router.replace("/curriculums");
};

const formatDate = (dateString?: string) => {
  if (!dateString) return '';
  return dayjs(dateString).format('YYYY/MM/DD');
};
</script>
