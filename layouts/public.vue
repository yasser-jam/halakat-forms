<template>
  <div dir="rtl" class="flex items-center justify-center p-4 bg-light min-h-screen">
    <v-card class="rounded-lg">
      <v-card-text>
        <div class="flex flex-col justify-center items-center">
          <div class="flex justify-center items-center w-24 h-24 rounded-full bg-primary mb-4">
            <v-icon size="4rem">mdi-mosque</v-icon>
          </div>

          <div class="text-2xl font-bold">جامع الشيخ علي الدقر</div>
        </div>
        <NuxtPage />
      </v-card-text>

      <div class="w-full h-[.5px] bg-gray-400 mx-auto"></div>

      <div class="flex flex-col justify-between md:items-center gap-2 md:text-lg text-sm px-4 py-3">
        <div class="flex gap-2 items-center">
          <div class="text-gray-500">للتواصل:</div>
          <div dir="ltr" class="text-base tracking-widest font-bold">
            <a href="tel:0944705208" class="text-black decoration-none">0944-705-208</a>
            / 
            <a href="tel:0934612625" class="text-black decoration-none">0934-612-625</a>
          </div>
        </div>

        <div class="flex gap-2 items-center">
          <div class="text-gray-500">العنوان:</div>
          <div class="font-bold text-xs">
            كفرسوسة - ساحة - مقابل المقبرة
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>
