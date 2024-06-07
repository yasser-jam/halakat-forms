<template>
  <v-col cols="12" class="mt-4">
    <div class="text-2xl font-semibold mb-4">مدرسو الدورة</div>

    <client-only>
      <swiper-container
        slides-per-view="1"
        space-between="10"
        :breakpoints="{
          768: {
            slidesPerView: 3,
          },
        }"
      >
        <swiper-slide>
          <teacher-card></teacher-card>
        </swiper-slide>

        <swiper-slide>
          <teacher-card></teacher-card>
        </swiper-slide>

        <swiper-slide>
          <teacher-card></teacher-card>
        </swiper-slide>
      </swiper-container>
    </client-only>
  </v-col>

  <v-col cols="12 mt-6">
    <div class="flex justify-between items-center mb-4">
      <div class="text-2xl font-semibold">حلقات الدورة</div>
      <v-btn @click="addHalakatDialog = true">إضافة حلقة</v-btn>
    </div>

    <v-row>
      <v-col cols="4">
        <halakat-inline-card></halakat-inline-card>
      </v-col>

      <v-col cols="4">
        <halakat-inline-card></halakat-inline-card>
      </v-col>

      <v-col cols="4">
        <halakat-inline-card></halakat-inline-card>
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

  <halakat-add-dialog v-model="addHalakatDialog"></halakat-add-dialog>

  <NuxtPage />
</template>

<script setup lang="ts">
const route = useRoute();
const addHalakatDialog = ref(false);
</script>
