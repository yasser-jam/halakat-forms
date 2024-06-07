<template>
  <v-card>
    <v-card-text class="flex flex-col items-center">
      <v-avatar
        icon="mdi-account-multiple"
        size="x-large"
        class="text-xl mb-4"
        color="primary"
      ></v-avatar>

      <div class="text-lg font-bold">حلقة الإمام النووي</div>

      <div class="text-md text-gray-500">أ. محمد مسوتي</div>

      <v-chip color="blue" class="mt-4">30 طالب</v-chip>

      <div class="flex justify-between w-full gap-2 mt-4">
        <v-btn
          variant="tonal"
          size="x-small"
          rounded="lg"
          icon="mdi-delete"
          color="error"
        ></v-btn>
        <v-btn variant="text">التفاصيل</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>
