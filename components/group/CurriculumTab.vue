<template>
  <div class="pa-4">
    <!-- Header Actions -->
    <div class="flex items-center justify-between mb-6">
      <div class="text-lg text-gray-600">
        إدارة قوالب المناهج المعينة للحلقة
      </div>
      
      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        @click="$emit('assign-template')"
      >
        تعيين قالب جديد
      </v-btn>
    </div>

    <!-- Template Grid -->
    <group-curriculum-template-grid
      :templates="templates"
      :loading="loading"
      @assign-template="$emit('assign-template')"
      @view-template="$emit('view-template', $event)"
      @view-nodes="handleViewNodes"
      @delete-template="$emit('delete-template', $event)"
    />

    <!-- Nodes List Dialog -->
    <group-nodes-list-dialog
      v-model="showNodesDialog"
      :template="selectedTemplate"
    />
  </div>
</template>

<script setup lang="ts">
import type { CurriculumTemplate } from '~/types';

interface Props {
  templates: CurriculumTemplate[];
  loading: boolean;
}

interface Emits {
  (e: 'assign-template'): void;
  (e: 'view-template', template: CurriculumTemplate): void;
  (e: 'delete-template', template: CurriculumTemplate): void;
}

defineProps<Props>();
defineEmits<Emits>();

// Dialog state
const showNodesDialog = ref(false);
const selectedTemplate = ref<CurriculumTemplate | null>(null);

// Methods
const handleViewNodes = (template: CurriculumTemplate) => {
  selectedTemplate.value = template;
  showNodesDialog.value = true;
};
</script>
