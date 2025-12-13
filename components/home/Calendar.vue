<template>
  <v-card>
    <v-card-text>
      <div class="flex items-center gap-3 mb-4">
        <v-icon size="large" color="primary">mdi-calendar-star</v-icon>
        <div class="text-2xl font-semibold">التقويم</div>
      </div>

      <v-date-picker hide-header></v-date-picker>

    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
  const modelValue = defineModel<unknown[]>()
</script>
