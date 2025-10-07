<template>
  <v-row class="mb-6">
    <v-col cols="12" md="3">
      <v-card color="primary" variant="tonal">
        <v-card-text class="text-center">
          <v-icon size="48" class="mb-2">mdi-book-multiple</v-icon>
          <div class="text-3xl font-bold">{{ totalTemplates }}</div>
          <div class="text-sm">إجمالي القوالب</div>
        </v-card-text>
      </v-card>
    </v-col>
    
    <v-col cols="12" md="3">
      <v-card color="success" variant="tonal">
        <v-card-text class="text-center">
          <v-icon size="48" class="mb-2">mdi-check-circle</v-icon>
          <div class="text-3xl font-bold">{{ completedTemplates }}</div>
          <div class="text-sm">قوالب مكتملة</div>
        </v-card-text>
      </v-card>
    </v-col>
    
    <v-col cols="12" md="3">
      <v-card color="warning" variant="tonal">
        <v-card-text class="text-center">
          <v-icon size="48" class="mb-2">mdi-progress-clock</v-icon>
          <div class="text-3xl font-bold">{{ inProgressTemplates }}</div>
          <div class="text-sm">قيد التنفيذ</div>
        </v-card-text>
      </v-card>
    </v-col>
    
    <v-col cols="12" md="3">
      <v-card color="info" variant="tonal">
        <v-card-text class="text-center">
          <v-icon size="48" class="mb-2">mdi-format-list-numbered</v-icon>
          <div class="text-3xl font-bold">{{ totalNodes }}</div>
          <div class="text-sm">إجمالي العقد</div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
interface Props {
  totalTemplates: number;
  completedTemplates: number;
  inProgressTemplates: number;
  totalNodes: number;
}

defineProps<Props>();
</script>
