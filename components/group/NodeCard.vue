<template>
  <v-card
    :class="[
      'mb-3 transition-all duration-200 hover:shadow-md',
      getCardClass(node.node_type, node.status)
    ]"
    :elevation="2"
    variant="elevated"
  >
    <v-card-text class="py-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3 flex-1">
          <!-- Node Icon -->
          <v-avatar 
            :color="getNodeColor(node.node_type)" 
            size="40"
            class="shadow-sm"
          >
            <v-icon color="white" size="22">{{
              getNodeIcon(node.node_type)
            }}</v-icon>
          </v-avatar>

          <!-- Node Info -->
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <span class="font-weight-bold text-base text-gray-800">{{
                node.name
              }}</span>
              
              <!-- Status Badge -->
              <v-chip
                :color="getStatusColor(node.status)"
                :variant="getStatusVariant(node.status)"
                size="small"
                class="font-weight-medium"
              >
                <v-icon 
                  :icon="getStatusIcon(node.status)" 
                  size="14" 
                  class="me-1"
                />
                {{ getStatusText(node.status) }}
              </v-chip>
            </div>

            <div
              v-if="node.description"
              class="text-sm text-grey-darken-1 mb-2 line-clamp-2"
            >
              {{ node.description }}
            </div>

            <!-- Node Details -->
            <div class="flex items-center text-gray-600 gap-4 text-sm">
              <span
                v-if="node.estimated_lessons_count"
                class="flex items-center gap-1"
              >
                <v-icon size="14" color="primary">mdi-book-open-page-variant</v-icon>
                {{ node.estimated_lessons_count }} درس
              </span>

              <span
                v-if="node.estimated_duration_minutes"
                class="flex items-center gap-1"
              >
                <v-icon size="14" color="warning">mdi-clock-outline</v-icon>
                {{ node.estimated_duration_minutes }} دقيقة
              </span>

              <span v-if="node.lesson_span" class="flex items-center gap-1">
                <v-icon size="14" color="info">mdi-calendar-range</v-icon>
                {{ node.lesson_span }} جلسة
              </span>
            </div>
          </div>
        </div>

        <!-- Node Type Badge -->
        <div class="flex flex-col items-end gap-2">
          <v-chip
            :color="getNodeColor(node.node_type)"
            variant="tonal"
            size="small"
            class="font-weight-medium"
          >
            <v-icon 
              :icon="getNodeIcon(node.node_type)" 
              size="14" 
              class="me-1"
            />
            {{ getNodeTypeText(node.node_type) }}
          </v-chip>
          
          <!-- Order Index -->
          <v-chip
            color="grey-lighten-1"
            variant="outlined"
            size="x-small"
          >
            #{{ node.order_index }}
          </v-chip>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { CurriculumTemplateNode, NodeStatus } from '~/types';

interface Props {
  node: CurriculumTemplateNode;
}

defineProps<Props>();

// Helper functions for styling and display
const getNodeColor = (nodeType?: string): string => {
  const colors: Record<string, string> = {
    chapter: 'deep-purple',
    section: 'indigo',
    lesson: 'teal',
    activity: 'orange',
    assessment: 'red',
    review: 'blue',
  };
  return colors[nodeType || ''] || 'cyan';
};

const getNodeIcon = (nodeType?: string): string => {
  const icons: Record<string, string> = {
    chapter: 'mdi-book',
    section: 'mdi-book-open',
    lesson: 'mdi-school',
    activity: 'mdi-puzzle',
    assessment: 'mdi-clipboard-check',
    review: 'mdi-refresh',
  };
  return icons[nodeType || ''] || 'mdi-circle';
};

const getNodeTypeText = (nodeType?: string): string => {
  const texts: Record<string, string> = {
    chapter: 'فصل',
    section: 'قسم',
    lesson: 'درس',
    activity: 'نشاط',
    assessment: 'تقييم',
    review: 'مراجعة',
  };
  return texts[nodeType || ''] || nodeType || 'عام';
};

const getStatusColor = (status: NodeStatus): string => {
  const colors: Record<NodeStatus, string> = {
    PLANNED: 'grey',
    IN_PROGRESS: 'warning',
    COMPLETED: 'success',
    SKIPPED: 'error',
  };
  return colors[status];
};

const getStatusText = (status: NodeStatus): string => {
  const texts: Record<NodeStatus, string> = {
    PLANNED: 'مخطط',
    IN_PROGRESS: 'قيد التنفيذ',
    COMPLETED: 'مكتمل',
    SKIPPED: 'متخطى',
  };
  return texts[status];
};

const getStatusIcon = (status: NodeStatus): string => {
  const icons: Record<NodeStatus, string> = {
    PLANNED: 'mdi-clock-outline',
    IN_PROGRESS: 'mdi-play-circle',
    COMPLETED: 'mdi-check-circle',
    SKIPPED: 'mdi-skip-next-circle',
  };
  return icons[status];
};

const getStatusVariant = (status: NodeStatus): string => {
  const variants: Record<NodeStatus, string> = {
    PLANNED: 'tonal',
    IN_PROGRESS: 'flat',
    COMPLETED: 'flat',
    SKIPPED: 'tonal',
  };
  return variants[status];
};

const getCardClass = (nodeType?: string, status?: NodeStatus): string => {
  let classes = 'border-l-4 ';
  
  // Border color based on status
  switch (status) {
    case 'COMPLETED':
      classes += 'border-l-success ';
      break;
    case 'IN_PROGRESS':
      classes += 'border-l-warning ';
      break;
    case 'SKIPPED':
      classes += 'border-l-error ';
      break;
    default:
      classes += 'border-l-grey ';
  }
  
  // Background tint based on node type
  switch (nodeType) {
    case 'lesson':
      classes += 'bg-teal-lighten-5';
      break;
    case 'chapter':
      classes += 'bg-deep-purple-lighten-5';
      break;
    case 'section':
      classes += 'bg-indigo-lighten-5';
      break;
    case 'activity':
      classes += 'bg-orange-lighten-5';
      break;
    case 'assessment':
      classes += 'bg-red-lighten-5';
      break;
    case 'review':
      classes += 'bg-blue-lighten-5';
      break;
    default:
      classes += 'bg-grey-lighten-5';
  }
  
  return classes;
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
