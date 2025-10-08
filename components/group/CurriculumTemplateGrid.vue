<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
      <div class="mt-4 text-xl font-semibold">جاري تحميل القوالب...</div>
    </div>

    <!-- No Templates State -->
    <base-not-found v-else-if="templates.length === 0">
      <template #subtitle>
        <div class="text-xl font-semibold mt-2">لا توجد قوالب معينة لهذه الحلقة</div>
      </template>
      
      <template #action>
        <v-btn
          color="primary"
          class="mt-4"
          prepend-icon="mdi-plus"
          @click="$emit('assign-template')"
        >
          تعيين قالب منهج
        </v-btn>
      </template>
    </base-not-found>

    <!-- Templates Grid -->
    <div v-else>
      <!-- Stats Cards -->
      <group-curriculum-stats-cards
        :total-templates="templates.length"
        :completed-templates="completedTemplatesCount"
        :in-progress-templates="inProgressTemplatesCount"
        :total-nodes="totalNodesCount"
      />

      <!-- Templates Grid -->
      <v-row>
        <v-col
          v-for="template in templates"
          :key="template.id"
          cols="12"
          md="6"
          lg="4"
        >
          <curriculum-template-card
            :template="template"
            @view="$emit('view-template', template)"
            @view-nodes="$emit('view-nodes', template)"
            @delete="$emit('delete-template', template)"
          />
        </v-col>
      </v-row>
    </div>
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
  (e: 'view-nodes', template: CurriculumTemplate): void;
  (e: 'delete-template', template: CurriculumTemplate): void;
}

const props = defineProps<Props>();
defineEmits<Emits>();

// Computed properties for statistics
const completedTemplatesCount = computed(() => {
  return props.templates.filter(template => {
    const nodes = template.nodes || [];
    return nodes.length > 0 && nodes.every(node => node.status === 'COMPLETED');
  }).length;
});

const inProgressTemplatesCount = computed(() => {
  return props.templates.filter(template => {
    const nodes = template.nodes || [];
    return nodes.some(node => node.status === 'IN_PROGRESS');
  }).length;
});

const totalNodesCount = computed(() => {
  return props.templates.reduce((total, template) => {
    return total + (template.nodes?.length || 0);
  }, 0);
});
</script>
