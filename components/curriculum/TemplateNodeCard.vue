<template>
  <v-card
    :class="[
      'mb-2 bg-red-100 transition-all duration-200',
      { 'ml-4': level > 0, 'ml-8': level > 1, 'ml-12': level > 2 },
    ]"
    elevation="0"
    variant="tonal"
    color="transparent"
  >
    <v-card-text class="py-1 rounded-sm mb-2 bg-gray-50">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3 flex-1">
          <!-- Expand/Collapse Button -->
          <v-btn
            v-if="hasChildren"
            :icon="isExpanded ? 'mdi-chevron-down' : 'mdi-chevron-right'"
            variant="text"
            size="small"
            @click="toggleExpand"
          ></v-btn>
          <div v-else class="w-10"></div>

          <!-- Node Icon -->
          <v-avatar :color="getNodeColor(node.node_type)" size="36">
            <v-icon color="white" size="20">{{
              getNodeIcon(node.node_type)
            }}</v-icon>
          </v-avatar>

          <!-- Node Info -->
          <div class="flex-1 py-2">
            <div class="flex items-center gap-2 mb-1">
              <span class="font-weight-bold text-base text-gray-600">{{
                node.name
              }}</span>
              <v-chip
                :color="getStatusColor(node.status)"
                variant="tonal"
                size="x-small"
              >
                {{ getStatusText(node.status) }}
              </v-chip>
            </div>

            <div
              v-if="node.description"
              class="text-sm text-grey-darken-1 mb-2"
            >
              {{ node.description }}
            </div>

            <div class="flex items-center text-gray-500 gap-3 text-sm">
              <span
                v-if="node.estimated_lessons_count"
                class="flex items-center gap-1"
              >
                <v-icon size="14">mdi-book-open-page-variant</v-icon>
                {{ node.estimated_lessons_count }} درس
              </span>

              <span
                v-if="node.estimated_duration_minutes"
                class="flex items-center gap-1"
              >
                <v-icon size="14">mdi-clock-outline</v-icon>
                {{ node.estimated_duration_minutes }} دقيقة
              </span>

              <span v-if="node.lesson_span" class="flex items-center gap-1">
                <v-icon size="14">mdi-calendar-range</v-icon>
                {{ node.lesson_span }} جلسة
              </span>

              <span class="flex items-center gap-1">
                <v-icon size="14">mdi-sort-numeric-ascending</v-icon>
                ترتيب: {{ node.order_index }}
              </span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center gap-2">
          <!-- Node Type Badge -->
          <v-chip
            v-if="node.node_type"
            :color="getNodeColor(node.node_type)"
            variant="tonal"
            size="small"
          >
            {{ getNodeTypeText(node.node_type) }}
          </v-chip>

          <!-- Edit Button -->
          <v-btn
            icon="mdi-pencil"
            variant="text"
            size="small"
            color="primary"
            @click="$emit('edit', node)"
          ></v-btn>

          <!-- Delete Button -->
          <v-btn
            icon="mdi-delete"
            variant="text"
            size="small"
            color="error"
            @click="$emit('delete', node)"
          ></v-btn>
        </div>
      </div>
    </v-card-text>

    <!-- Children Nodes -->
    <v-expand-transition>
      <div v-if="isExpanded && hasChildren" class="px-4 pb-3">
        <template v-for="child in node.children" :key="child.id">
          <curriculum-template-node-card
            :node="child"
            :level="level + 1"
            @expand="$emit('expand', $event)"
          />
        </template>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script setup lang="ts">
import type { CurriculumTemplateNode, NodeStatus } from '~/types';

interface Props {
  node: CurriculumTemplateNode;
  level: number;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  expand: [nodeId: number];
  edit: [node: CurriculumTemplateNode];
  delete: [node: CurriculumTemplateNode];
}>();

const isExpanded = ref(false);

const hasChildren = computed(() => {
  return props.node.children && props.node.children.length > 0;
});

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
  emit('expand', props.node.id!);
};

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
</script>
