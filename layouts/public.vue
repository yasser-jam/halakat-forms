<template>
  <div dir="rtl" class="flex items-center justify-center p-4 bg-light min-h-screen">
    <v-card class="rounded-lg">
      <v-card-text>
        <div class="flex flex-col justify-center items-center">
          <div class="w-32 h-32 bg-gray-300 rounded-full mb-4"></div>

          <div class="text-2xl font-bold">جامع الشيخ علي الدقر</div>
        </div>
        <NuxtPage />
      </v-card-text>

      <div class="w-full h-[.5px] bg-gray-400 mx-auto"></div>

      <div class="flex flex-col justify-between md:items-center gap-2 md:text-lg text-sm px-4 py-3">
        <div class="flex gap-2 items-center">
          <div class="text-gray-500">للتواصل:</div>
          <div class="text-base tracking-widest font-bold">
            0993544811 / 0993544811
          </div>
        </div>

        <div class="flex gap-2 items-center">
          <div class="text-gray-500">العنوان:</div>
          <div class="font-bold text-xs">
            حي كفرسوسة - جانب مدرسة الإمام الشافعي
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>
