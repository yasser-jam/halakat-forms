<template>
  <v-card class="relative" >
    <v-card-text class="flex flex-col justify-center static">

        <v-chip color="primary" size="large" class="position-absolute left-4 top-4">قائمة</v-chip>

      <div class="text-2xl font-weight-bold text-priamry mb-4">
        الدورة الاستثنائية
      </div>

      <div class="text-base text-gray-400">
        بدأت في: <v-chip  color="blue">12/12/2012</v-chip>
      </div>

      <!-- <div class="flex flex-col self-start gap-4 mt-8">
        <div class="flex items-center gap-4">
            <div class="text-sm text-gray-500">عدد الطلاب: </div>
            <v-chip color="primary">200 طالب</v-chip>
        </div>

        <div class="flex items-center gap-4">
            <div class="text-sm text-gray-500">عدد الأساتذة: </div>
            <v-chip color="info">20 أستاذ</v-chip>
        </div>

        <div class="flex items-center gap-4">
            <div class="text-sm text-gray-500">عدد الحلقات: </div>
            <v-chip color="warning">10 حلقات</v-chip>
        </div>
      </div> -->
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">

defineProps<{
    campaign: any
}>()

</script>