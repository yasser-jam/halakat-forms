<template>
  <v-select
    :items="statusOptions"
    item-title="text"
    item-value="value"
    placeholder="اختر الحالة"
  >
    <template #selection="{ item }">
      <div class="flex items-center gap-2">
        <v-chip
          :color="getStatusColor(item.raw.value)"
          variant="flat"
          size="x-small"
        >
          {{ item.raw.text }}
        </v-chip>
      </div>
    </template>
    
    <template #item="{ props, item }">
      <v-list-item v-bind="props">
        <template #prepend>
          <v-chip
            :color="getStatusColor(item.raw.value)"
            variant="dot"
            size="small"
          >
            {{ item.raw.text }}
          </v-chip>
        </template>
      </v-list-item>
    </template>
  </v-select>
</template>

<script setup lang="ts">
import { NodeStatus } from '~/types';

// Status options
const statusOptions = [
  { text: 'مخطط', value: NodeStatus.PLANNED },
  { text: 'قيد التنفيذ', value: NodeStatus.IN_PROGRESS },
  { text: 'مكتمل', value: NodeStatus.COMPLETED },
  { text: 'متخطى', value: NodeStatus.SKIPPED },
];

// Helper function for status colors
const getStatusColor = (status: NodeStatus): string => {
  const colors: Record<NodeStatus, string> = {
    PLANNED: 'grey',
    IN_PROGRESS: 'warning',
    COMPLETED: 'success',
    SKIPPED: 'error',
  };
  return colors[status];
};
</script>
