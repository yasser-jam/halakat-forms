<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="mt-2">
        <home-hero />
      </v-col>

      <!-- <v-col cols="4">
                <campaign-card></campaign-card>
            </v-col> -->
    </v-row>

    <div class="text-xl font-semibold mt-6 mb-4">أساتذة الحلقات</div>

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

    <div class="text-xl font-semibold mt-6 mb-4">قائمة الحلقات</div>

    <v-row>
      <v-col cols="4">
        <halakat-inline-card />
      </v-col>

      <v-col cols="4">
        <halakat-inline-card />
      </v-col>

      <v-col cols="4">
        <halakat-inline-card />
      </v-col>
    </v-row>

    <home-settings class="mt-6"></home-settings>
  </v-container>
</template>
