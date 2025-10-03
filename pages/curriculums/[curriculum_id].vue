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
        <v-btn variant="plain" to="/curriculums">إلغاء</v-btn>
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
                    variant="outlined"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <base-label>الوصف</base-label>
                  <v-textarea
                    v-model="curriculum.description"
                    placeholder="وصف المنهج"
                    variant="outlined"
                    rows="3"
                  ></v-textarea>
                </v-col>

                <v-col cols="12" v-if="editMode && curriculum.categories && curriculum.categories.length > 0">
                  <base-label>الفئات المرتبطة</base-label>
                  <div class="flex flex-wrap gap-2 mt-2">
                    <v-chip
                      v-for="category in curriculum.categories"
                      :key="category.id"
                      :color="category.color"
                      variant="tonal"
                    >
                      {{ category.name }}
                    </v-chip>
                  </div>
                </v-col>

                <v-col cols="12" v-if="editMode">
                  <div class="text-sm text-gray-600">
                    <div>تاريخ الإنشاء: {{ formatDate(curriculum.created_at) }}</div>
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
        <v-card>
          <v-card-title class="flex justify-between items-center">
            <span>قوالب المنهج</span>
            <v-btn
              color="primary"
              size="small"
              @click="openAddTemplateDialog"
            >
              إضافة قالب جديد
            </v-btn>
          </v-card-title>
          
          <v-card-text>
            <v-text-field
              v-model="templateSearch"
              prepend-inner-icon="mdi-magnify"
              placeholder="ابحث في القوالب..."
              variant="outlined"
              size="small"
              class="mb-4"
            />

            <client-only>
              <v-data-table-server
                :headers="templateHeaders"
                :items="curriculumTemplates"
                :items-length="curriculumTemplatesTotalCount"
                :loading="templatesLoading"
                :items-per-page="10"
                :page="1"
              >
                <template #item.name="{ item }">
                  <div class="flex items-center gap-4 my-2">
                    <div class="flex flex-col gap-1">
                      <div class="text-md font-weight-bold">
                        {{ item.name || item.curriculum?.name }}
                      </div>
                      <div v-if="item.notes" class="text-sm text-gray-600">
                        {{ item.notes }}
                      </div>
                    </div>
                  </div>
                </template>

                <template #item.campaign.name="{ item }">
                  <v-chip color="info" variant="tonal">
                    {{ item.campaign?.name || 'غير محدد' }}
                  </v-chip>
                </template>

                <template #item.nodes_count="{ item }">
                  <v-chip color="primary" variant="tonal">
                    {{ item.nodes?.length || 0 }} عقدة
                  </v-chip>
                </template>

                <template #item.created_at="{ item }">
                  <v-chip color="success" variant="tonal">
                    {{ formatDate(item.created_at) }}
                  </v-chip>
                </template>

                <template #item.actions="{ item }">
                  <div class="flex gap-2 justify-end">
                    <v-btn
                      color="green"
                      variant="tonal"
                      size="x-small"
                      :rounded="false"
                      class="rounded-lg"
                      icon="mdi-eye"
                      @click="viewTemplate(item)"
                      title="عرض العقد"
                    ></v-btn>
                    <v-btn
                      color="blue"
                      variant="tonal"
                      size="x-small"
                      :rounded="false"
                      class="rounded-lg"
                      icon="mdi-pencil"
                      @click="editTemplate(item)"
                      title="تعديل القالب"
                    ></v-btn>
                    <v-btn
                      color="error"
                      variant="tonal"
                      size="x-small"
                      :rounded="false"
                      class="rounded-lg"
                      icon="mdi-trash-can"
                      @click="openDeleteTemplateDialog(item.id as number)"
                      title="حذف القالب"
                    ></v-btn>
                  </div>
                </template>

                <template #bottom></template>
              </v-data-table-server>
            </client-only>
          </v-card-text>
        </v-card>
      </v-window-item>
    </v-window>

    <div class="flex gap-4 mt-8" v-if="tab === 0">
      <v-spacer></v-spacer>
      <v-btn v-if="editMode && tab === 0" @click="tab = 1" color="primary" variant="outlined">
        إدارة القوالب
      </v-btn>
    </div>
  </v-container>

  <!-- Add Template Dialog -->
  <base-dialog v-model="addTemplateDialog" title="إضافة قالب جديد" max-width="600">
    <v-form v-model="templateForm">
      <v-row>
        <v-col cols="12">
          <base-label>اسم القالب (اختياري)</base-label>
          <v-text-field
            v-model="curriculumTemplate.name"
            placeholder="اسم مخصص للقالب"
            variant="outlined"
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <base-label>الحملة</base-label>
          <v-select
            v-model="curriculumTemplate.campaign_id"
            :items="campaigns"
            item-title="name"
            item-value="id"
            placeholder="اختر الحملة"
            variant="outlined"
            :rules="useValidate(curriculumTemplate.campaign_id)"
          ></v-select>
        </v-col>

        <v-col cols="12">
          <base-label>ملاحظات (اختياري)</base-label>
          <v-textarea
            v-model="curriculumTemplate.notes"
            placeholder="ملاحظات خاصة بالحملة"
            variant="outlined"
            rows="3"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-form>

    <template #actions>
      <v-btn variant="plain" @click="addTemplateDialog = false">إلغاء</v-btn>
      <v-btn 
        color="primary" 
        :disabled="!templateForm"
        :loading="templateLoading"
        @click="createTemplate"
      >
        إضافة
      </v-btn>
    </template>
  </base-dialog>

  <!-- Delete Template Dialog -->
  <base-delete-dialog
    v-model="deleteTemplateDialog"
    :loading="deleteTemplateLoading"
    @delete="removeTemplate"
  ></base-delete-dialog>
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
const templateSearch = ref<string>('');

// Stores
const curriculumStore = useCurriculumStore();
const curriculumTemplateStore = useCurriculumTemplateStore();
const campaignStore = useCampaignStore();

const { curriculum } = storeToRefs(curriculumStore);
const { 
  curriculumTemplate, 
  curriculumTemplates, 
  curriculumTemplatesTotalCount,
  headers: templateHeaders 
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
  // Navigate to template view page (to be created later)
  console.log('View template:', template);
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
