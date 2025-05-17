<template>
    <v-card density="compact" class="rounded-sm">
      <v-card-text class="pa-2 bg-gray-100">
        <div class="flex items-center gap-2 ">
          <v-avatar size="small" rounded="full" color="primary " class="mr-3">
            <v-img
              v-if="teacher?.image_url"
              :src="teacher.image_url"
              :alt="teacher.first_name"
            />
            <v-icon v-else icon="mdi-account" />
          </v-avatar>
          
          <div class="flex-grow-1">
            <div class="text-subtitle-2 font-weight-medium">{{ `${teacher.first_name} ${teacher.last_name}` }}</div>
            <div class="text-caption text-grey">{{ teacher.mobile_phone_number }}</div>
          </div>
  
          <teacher-attend-chip :status="attendance" />
        </div>
      </v-card-text>
    </v-card>
  </template>
  
  <script setup lang="ts">
  interface Props {
    teacher: Teacher;
    attendance?: 'ATTEND' | 'DELAY' | 'MISSED';
  }
  
  const props = withDefaults(defineProps<Props>(), {
    attendance: 'DELAY'
  });
  </script>