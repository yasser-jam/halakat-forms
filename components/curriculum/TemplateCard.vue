<template>
  <v-card class="mb-4" elevation="2">
    <v-card-title class="bg-primary text-white d-flex align-center">
      <v-icon class="me-2">mdi-book-multiple</v-icon>
      <span>{{ template.curriculum?.name }}</span>
      <v-spacer></v-spacer>
      <v-chip
        color="white"
        text-color="primary"
        size="small"
        variant="flat"
      >
        {{ template.name || 'قالب افتراضي' }}
      </v-chip>
    </v-card-title>

    <v-card-text class="pa-3">
      <div v-if="template.notes" class="text-sm text-gray-600 mb-3">
        {{ template.notes }}
      </div>

      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-4">
          <div class="flex items-center">
            <v-icon size="small" class="me-1">mdi-format-list-numbered</v-icon>
            <span class="text-sm">{{ template.nodes?.length || 0 }} عقدة</span>
          </div>
          
          <div class="flex items-center">
            <v-icon size="small" class="me-1">mdi-calendar</v-icon>
            <span class="text-sm">{{ formatDate(template.created_at) }}</span>
          </div>
        </div>

        <div class="flex gap-2">
          <v-btn
            icon="mdi-eye"
            variant="text"
            size="small"
            color="primary"
            @click="$emit('view', template)"
          ></v-btn>
          
          <v-btn
            icon="mdi-trash-can"
            variant="text"
            size="small"
            color="error"
            @click="$emit('delete', template)"
          ></v-btn>
        </div>
      </div>

      <!-- Progress indicator if nodes exist -->
      <div v-if="template.nodes && template.nodes.length > 0" class="mb-3">
        <div class="flex justify-between items-center mb-1">
          <span class="text-xs">التقدم</span>
          <span class="text-xs">{{ completedNodesCount }}/{{ template.nodes.length }}</span>
        </div>
        <v-progress-linear
          :model-value="progressPercentage"
          color="success"
          height="6"
          rounded
        ></v-progress-linear>
      </div>

      <!-- Node status summary -->
      <div v-if="template.nodes && template.nodes.length > 0" class="flex gap-2 flex-wrap">
        <v-chip
          v-if="plannedNodesCount > 0"
          color="grey"
          variant="tonal"
          size="x-small"
        >
          <v-icon start size="12">mdi-clock-outline</v-icon>
          {{ plannedNodesCount }} مخطط
        </v-chip>
        
        <v-chip
          v-if="inProgressNodesCount > 0"
          color="warning"
          variant="tonal"
          size="x-small"
        >
          <v-icon start size="12">mdi-play</v-icon>
          {{ inProgressNodesCount }} قيد التنفيذ
        </v-chip>
        
        <v-chip
          v-if="completedNodesCount > 0"
          color="success"
          variant="tonal"
          size="x-small"
        >
          <v-icon start size="12">mdi-check</v-icon>
          {{ completedNodesCount }} مكتمل
        </v-chip>
        
        <v-chip
          v-if="skippedNodesCount > 0"
          color="error"
          variant="tonal"
          size="x-small"
        >
          <v-icon start size="12">mdi-skip-next</v-icon>
          {{ skippedNodesCount }} متخطى
        </v-chip>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { CurriculumTemplate, NodeStatus } from '~/types';

interface Props {
  template: CurriculumTemplate;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  view: [template: CurriculumTemplate];
  delete: [template: CurriculumTemplate];
}>();

// Computed properties for node statistics
const plannedNodesCount = computed(() => {
  return props.template.nodes?.filter(node => node.status === 'PLANNED').length || 0;
});

const inProgressNodesCount = computed(() => {
  return props.template.nodes?.filter(node => node.status === 'IN_PROGRESS').length || 0;
});

const completedNodesCount = computed(() => {
  return props.template.nodes?.filter(node => node.status === 'COMPLETED').length || 0;
});

const skippedNodesCount = computed(() => {
  return props.template.nodes?.filter(node => node.status === 'SKIPPED').length || 0;
});

const progressPercentage = computed(() => {
  const totalNodes = props.template.nodes?.length || 0;
  if (totalNodes === 0) return 0;
  return (completedNodesCount.value / totalNodes) * 100;
});

// Helper function to format date
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
</script>
