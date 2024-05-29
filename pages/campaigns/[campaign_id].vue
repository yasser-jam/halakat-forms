<template>
  <base-dialog width="600" @close="goBack">
    <template #title>معلومات الدورة</template>

    <v-form v-model="form"></v-form>

    <base-label>اسم الدورة</base-label>
    <v-text-field placeholder="الدورة الصيفية"> </v-text-field>

    <base-label>تاريخ بدء الدورة</base-label>
    <v-text-field type="date" placeholder="1/1/2024"> </v-text-field>
  </base-dialog>
</template>

<script setup lang="ts">


const goBack = () => {
    navigateTo('/campaigns')
}
</script>