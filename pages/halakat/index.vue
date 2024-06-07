<template>
  <v-container>
    <div class="flex justify-between mt-4 mb-6">
      <div class="text-3xl font-semibold">قائمة الحلقات</div>

      <v-btn color="primary" elevation="0" to="/students/create">
        إضافة حلقة جديدة
      </v-btn>
    </div>

    <v-row>
      <v-col cols="12" md="4">
        <halakat-card></halakat-card>
      </v-col>

      <v-col cols="12" md="4">
        <halakat-card></halakat-card>
      </v-col>

      <v-col cols="12" md="4">
        <halakat-card></halakat-card>
      </v-col>
    </v-row>
  </v-container>
</template>
