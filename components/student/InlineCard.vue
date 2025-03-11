<template>
  <v-card variant="outlined" elevation="0" color="blue">
    <v-card-text class="py-2">
      <div class="flex items-center">
        <img
          src="~/assets/images/placeholder/student.jpg"
          class="w-12 h-12 rounded-full me-4"
          alt=""
        />

        <div>
          <div class="text-sm font-semibold">
            {{ `${student.first_name} ${student.last_name}` }}
          </div>
          <div class="text-gray text-sm">{{ getClassName(Number(student.educational_class)) }}</div>
        </div>

        <v-spacer></v-spacer>

        <v-btn variant="tonal" icon="mdi-link-off" color="error" size="x-small" rounded @click="$emit('unlink', student)"></v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{
  student: Student;
}>();
</script>
