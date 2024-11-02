<template>
  <v-card class="rounded-md">
    <v-card-text class="!p-0">
      <div
        class="flex items-center gap-4 bg-teal-50 text-primary font-semibold py-4 px-4"
        >

        <v-avatar
          icon="mdi-account-multiple"
          size="small"
          color="primary"
        ></v-avatar>

        <div class="">
          <div class="text-lg">اسم الحلقة</div>
          
          <div class="text-sm text-gray font-semibold">اسم الأستاذ</div>
        </div>

        <div class="flex justify-between items-center">
          <!-- <v-btn variant="text" icon="mdi-information"></v-btn> -->
        </div>
      </div>


      <div class="flex flex-col max-h-[200px] p-4 overflow-auto">
        <div class="text-sm font-semibold mb-4">طلاب الحلقة</div>

        <div class="flex flex-col gap-4">
          <student-inline-card v-for="i in 10" />
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
