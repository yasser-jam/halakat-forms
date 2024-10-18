<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col cols="12" class="mb-4">
          <div class="text-lg text-gray-400 mb-2">دورة صيف</div>
          <div class="text-3xl font-semibold">الاثنين 12 / 21 / 1998</div>
        </v-col>

        <v-col cols="4">
          <v-btn
          variant="tonal"
            color="secondary"
            size="x-large"
            class="w-full"
          >
            أستاذ جديد
          </v-btn>
        </v-col>

        <v-col cols="4">
          <v-btn variant="tonal" color="error" size="x-large" class="w-full">
            مسابقة جديدة
          </v-btn>
        </v-col>

        <v-col cols="4">
          <v-btn
          variant="tonal"
            color="primary"
            size="x-large"
            class="w-full"
            to="/students/create"
          >
            طالب جديد
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>

    <!-- <v-card-actions>
      <v-btn>حفظ</v-btn>
      <v-btn varaint="outlined">إلغاء</v-btn>
    </v-card-actions> -->
  </v-card>
</template>
