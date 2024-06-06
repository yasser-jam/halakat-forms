<template>
  <v-col cols="12 mt-6">
    <div class="flex justify-between items-center mb-4">
      <div class="text-2xl font-semibold">مدرسو الدورة</div>
      <v-btn>إضافة مدرس</v-btn>
    </div>

    <v-row>
      <v-col cols="4">
        <teacher-card></teacher-card>
      </v-col>

      <v-col cols="4">
        <teacher-card></teacher-card>
      </v-col>

      <v-col cols="4">
        <teacher-card></teacher-card>
      </v-col>
    </v-row>
  </v-col>

  <v-col cols="12 mt-6">
    <div class="flex justify-between items-center mb-4">
      <div class="text-2xl font-semibold">حلقات الدورة</div>
      <v-btn>إضافة حلقة</v-btn>
    </div>

    <v-row>
      <v-col cols="4">
        <halakat-card></halakat-card>
      </v-col>

      <v-col cols="4">
        <halakat-card></halakat-card>
      </v-col>

      <v-col cols="4">
        <halakat-card></halakat-card>
      </v-col>
    </v-row>
  </v-col>

  <v-col cols="12 mt-6">
    <div class="flex justify-between items-center mb-4">
      <div class="text-2xl font-semibold">مناهج الدورة</div>
      <v-btn>إضافة مقرر</v-btn>
    </div>

    <v-row>
      <v-col cols="4">
        <syllabus-card></syllabus-card>
      </v-col>

      <v-col cols="4">
        <syllabus-card></syllabus-card>
      </v-col>

      <v-col cols="4">
        <syllabus-card></syllabus-card>
      </v-col>
    </v-row>
  </v-col>
</template>
