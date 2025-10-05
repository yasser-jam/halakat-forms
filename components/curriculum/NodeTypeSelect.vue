<template>
  <v-select
    :items="nodeTypes"
    item-title="text"
    item-value="value"
    placeholder="اختر نوع العقدة"
  >
    <template #selection="{ item }">
      <div class="flex items-center gap-2">
        <v-icon :color="getNodeColor(item.raw.value)" size="16">
          {{ getNodeIcon(item.raw.value) }}
        </v-icon>
        <span>{{ item.raw.text }}</span>
      </div>
    </template>
    
    <template #item="{ props, item }">
      <v-list-item v-bind="props">
        <template #prepend>
          <v-icon :color="getNodeColor(item.raw.value)" size="20">
            {{ getNodeIcon(item.raw.value) }}
          </v-icon>
        </template>
      </v-list-item>
    </template>
  </v-select>
</template>

<script setup lang="ts">
// Node type options with icons and colors
const nodeTypes = [
  { text: 'فصل', value: 'chapter' },
  { text: 'قسم', value: 'section' },
  { text: 'درس', value: 'lesson' },
  { text: 'نشاط', value: 'activity' },
  { text: 'تقييم', value: 'assessment' },
  { text: 'مراجعة', value: 'review' },
];

// Helper functions for styling and display
const getNodeColor = (nodeType: string): string => {
  const colors: Record<string, string> = {
    chapter: 'deep-purple',
    section: 'indigo',
    lesson: 'teal',
    activity: 'orange',
    assessment: 'red',
    review: 'blue',
  };
  return colors[nodeType] || 'cyan';
};

const getNodeIcon = (nodeType: string): string => {
  const icons: Record<string, string> = {
    chapter: 'mdi-book',
    section: 'mdi-book-open',
    lesson: 'mdi-school',
    activity: 'mdi-puzzle',
    assessment: 'mdi-clipboard-check',
    review: 'mdi-refresh',
  };
  return icons[nodeType] || 'mdi-circle';
};
</script>
