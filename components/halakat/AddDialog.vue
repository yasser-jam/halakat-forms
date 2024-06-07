<template>
    <base-dialog width="600" @close="$emit('update:model-value', false)">
      <template #title> إضافة حلقة </template>
    
      <base-label>اختر حلقة</base-label>
      <v-select :items="halakat"></v-select>
      
    </base-dialog>
  </template>
  
  
  <script setup lang="ts">
  
  const route = useRoute()
  
  const halakat = ref([
      {
          title: 'الإمام النووي',
          value: 'test'
      },
      {
          title: 'الإمام النووي',
          value: 'test'
      },
  ])
  
  const goBack = () => navigateTo(`/campaigns/${route.params.campaign_id}/general`)
  
  </script>