<template>
  <v-card>
    <v-card-text>
      <div class="flex flex-col justify-center items-center gap-2 mb-2">
        <v-avatar color="primary" size="48">
            <v-icon size="32">{{ icon }}</v-icon>
        </v-avatar>
        <span class="text-lg text-gray-600 font-semibold">{{ title }}</span>
        <div class="text-2xl font-bold text-primary">
          {{ value }}
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  value: string;
  icon?: string;
}>();
</script>
