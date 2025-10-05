<template>
  <base-dialog
    model-value="true"
    :title="isEditMode ? `تعديل العقدة: ${node?.name || ''}` : 'إضافة عقدة جديدة'"
    max-width="800"
    :loading
    @close="navigateBack"
  >
    <v-form v-model="form" @submit.prevent="handleSubmit">
      <v-row>
        <!-- Node Name -->
        <v-col cols="12">
          <base-label required>اسم العقدة</base-label>
          <v-text-field
            v-model="node.name"
            placeholder="اسم العقدة"
            :rules="useValidate(node.name, ['required'])"
          ></v-text-field>
        </v-col>

        <!-- Description -->
        <v-col cols="12">
          <base-label>الوصف</base-label>
          <v-textarea
            v-model="node.description"
            placeholder="وصف العقدة (اختياري)"
            rows="3"
          ></v-textarea>
        </v-col>

        <!-- Node Type -->
        <v-col cols="12" md="6">
          <base-label>نوع العقدة</base-label>
          <curriculum-node-type-select
            v-model="node.node_type"
          />
        </v-col>

        <!-- Status -->
        <v-col cols="12" md="6">
          <base-label>الحالة</base-label>
          <curriculum-node-status-select
            v-model="node.status"
          />
        </v-col>

        <!-- Parent Node -->
        <v-col cols="12" md="6">
          <base-label>العقدة الأب</base-label>
          <v-select
            v-model="node.parent_id"
            :items="parentNodeOptions"
            item-title="name"
            item-value="id"
            placeholder="اختر العقدة الأب (اختياري)"
            clearable
          ></v-select>
        </v-col>

        <!-- Order Index -->
        <v-col cols="12" md="6">
          <base-label required>ترتيب العقدة</base-label>
          <v-text-field
            v-model.number="node.order_index"
            placeholder="ترتيب العقدة"
            type="number"
            :min="0"
            :rules="useValidate(node.order_index?.toString() || '', ['required'])"
          ></v-text-field>
        </v-col>

        <!-- Estimated Lessons Count -->
        <v-col cols="12" md="4">
          <base-label>عدد الدروس المتوقع</base-label>
          <v-text-field
            v-model.number="node.estimated_lessons_count"
            placeholder="عدد الدروس"
            type="number"
            :min="0"
          ></v-text-field>
        </v-col>

        <!-- Estimated Duration -->
        <v-col cols="12" md="4">
          <base-label>المدة المتوقعة (بالدقائق)</base-label>
          <v-text-field
            v-model.number="node.estimated_duration_minutes"
            placeholder="المدة بالدقائق"
            type="number"
            :min="0"
          ></v-text-field>
        </v-col>

        <!-- Lesson Span -->
        <v-col cols="12" md="4">
          <base-label>مدى الجلسات</base-label>
          <v-text-field
            v-model.number="node.lesson_span"
            placeholder="عدد الجلسات"
            type="number"
            :min="0"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>

    <template #actions>
      <v-btn variant="plain" @click="navigateBack">إلغاء</v-btn>
      <v-btn 
        color="primary" 
        :disabled="!form"
        :loading="submitting"
        @click="handleSubmit"
      >
        {{ isEditMode ? 'تحديث' : 'إضافة' }}
      </v-btn>
    </template>
  </base-dialog>
</template>

<script setup lang="ts">
import type { CurriculumTemplateNode } from '~/types';
import { NodeStatus } from '~/types';

const route = useRoute();
const curriculumId = route.params.curriculum_id as string;
const templateId = Number(route.params.templateId);
const nodeId = route.params.nodeId as string;

const isEditMode = nodeId !== 'create';

const curriculumTemplateStore = useCurriculumTemplateStore();
const { nodes, selectedNode } = storeToRefs(curriculumTemplateStore);

const form = ref(false);
const loading = ref(false);
const submitting = ref(false);

// Node data - use init function
const node = ref<CurriculumTemplateNode>(initCurriculumTemplateNode(templateId));


// Parent node options (exclude current node if editing)
const parentNodeOptions = computed(() => {
  if (!nodes.value) return [];
  
  return nodes.value
    .filter(n => isEditMode ? n.id !== Number(nodeId) : true)
    .map(n => ({
      id: n.id,
      name: n.name,
    }));
});

// Load data on mount
const { pending } = useLazyAsyncData(async () => {
  loading.value = true;
  try {
    // Load all nodes for parent selection
    await curriculumTemplateStore.getNodes(templateId);
    
    if (isEditMode) {
      // Load specific node for editing
      await curriculumTemplateStore.getNode(templateId, Number(nodeId));
      if (selectedNode.value) {
        node.value = { ...selectedNode.value };
      }
    } else {
      // For new nodes, set default order_index to be the highest + 1
      const maxOrder = nodes.value?.reduce((max, n) => Math.max(max, n.order_index), -1) ?? -1;
      node.value.order_index = maxOrder + 1;
    }
  } finally {
    loading.value = false;
  }
});

const handleSubmit = async () => {
  if (!form.value) return;

  submitting.value = true;
  try {
    if (isEditMode) {
      await curriculumTemplateStore.updateNode(templateId, Number(nodeId));
    } else {
      // Set the node data in store before creating
      curriculumTemplateStore.selectedNode = node.value;
      await curriculumTemplateStore.createNode(templateId);
    }
    
    navigateBack();
  } finally {
    submitting.value = false;
  }
};

const navigateBack = () => {
  navigateTo(`/curriculums/${curriculumId}/template/${templateId}`);
};

// Watch for changes in node data when editing
watch(() => node.value, (newValue) => {
  if (isEditMode) {
    curriculumTemplateStore.selectedNode = newValue;
  }
}, { deep: true });
</script>
