<template>
  <div class="pa-4">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-3xl font-bold mb-2">إدارة الحلقة</h1>
        <div class="text-lg text-gray-600">
          إدارة شاملة للحلقة: {{ group?.title }}
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <v-tabs v-model="activeTab" class="mb-6">
      <v-tab value="overview">
        <v-icon start>mdi-account-group</v-icon>
        نظرة عامة
      </v-tab>
      <v-tab value="curriculum">
        <v-icon start>mdi-book-multiple</v-icon>
        المناهج
      </v-tab>
      <v-tab value="achievements">
        <v-icon start>mdi-trophy</v-icon>
        الإنجازات
      </v-tab>
    </v-tabs>

    <!-- Tab Content -->
    <v-tabs-window v-model="activeTab">
      <!-- Overview Tab -->
      <v-tabs-window-item value="overview">
        <group-overview-tab />
      </v-tabs-window-item>

      <!-- Curriculum Tab -->
      <v-tabs-window-item value="curriculum">
        <group-curriculum-tab
          :templates="templates"
          :loading="loading"
          @assign-template="showAssignDialog = true"
          @view-template="viewTemplate"
          @delete-template="deleteTemplate"
        />
      </v-tabs-window-item>

      <!-- Achievements Tab -->
      <v-tabs-window-item value="achievements">
        <group-achievements-tab />
      </v-tabs-window-item>
    </v-tabs-window>

    <!-- Assign Template Dialog -->
    <curriculum-assign-template-dialog
      v-model="showAssignDialog"
      :group-id="groupId"
      @assigned="onTemplateAssigned"
    />

    <!-- Delete Confirmation Dialog -->
    <base-delete-dialog
      v-model="showDeleteDialog"
      :title="`حذف قالب ${templateToDelete?.curriculum?.name}`"
      :text="`هل أنت متأكد من إلغاء تعيين قالب '${templateToDelete?.name || 'القالب الافتراضي'}' من هذه الحلقة؟`"
      :loading="deleting"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script setup lang="ts">
import type { CurriculumTemplate, Group } from '~/types';

// Route params
const route = useRoute();
const groupId = Number(route.params.group_id);

// Stores
const curriculumTemplateStore = useCurriculumTemplateStore();
const groupStore = useGroupStore();

// State
const activeTab = ref('overview');
const loading = ref(true);
const deleting = ref(false);
const showAssignDialog = ref(false);
const showDeleteDialog = ref(false);
const templates = ref<CurriculumTemplate[]>([]);
const group = ref<Group | null>(null);
const templateToDelete = ref<CurriculumTemplate | null>(null);

// Methods
const loadTemplates = async () => {
  loading.value = true;
  try {
    templates.value = await curriculumTemplateStore.listByGroup(groupId);
  } catch (error) {
    console.error('Error loading templates:', error);
  } finally {
    loading.value = false;
  }
};

const loadGroup = async () => {
  try {
    group.value = await groupStore.get(groupId);
  } catch (error) {
    console.error('Error loading group:', error);
  }
};

const viewTemplate = (template: CurriculumTemplate) => {
  // Navigate to template details page
  navigateTo(`/curriculums/${template.curriculum_id}/template/${template.id}`);
};

const deleteTemplate = (template: CurriculumTemplate) => {
  templateToDelete.value = template;
  showDeleteDialog.value = true;
};

const confirmDelete = async () => {
  if (!templateToDelete.value) return;
  
  deleting.value = true;
  try {
    await curriculumTemplateStore.unassignFromGroup(groupId, templateToDelete.value.id!);
    await loadTemplates(); // Reload templates
    showDeleteDialog.value = false;
    templateToDelete.value = null;
  } catch (error) {
    console.error('Error deleting template:', error);
  } finally {
    deleting.value = false;
  }
};

const onTemplateAssigned = async () => {
  await loadTemplates(); // Reload templates after assignment
};

// Initialize data
onMounted(async () => {
  await Promise.all([
    loadTemplates(),
    loadGroup()
  ]);
});

// Set page title
useHead({
  title: `إدارة الحلقة - ${group.value?.title || 'الحلقة'}`
});
</script>