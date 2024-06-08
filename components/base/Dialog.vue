<template>
  <v-dialog :model-value="true" :loading :disabled="loading" @click:outside="emit('close')">
    <v-card class="overflow-y-hidden">
      <v-card-text>
        <div class="flex justify-between items-center mb-4">
          <div class="text-2xl font-weight-bold">
            <slot name="title" />
          </div>
  
          <v-btn
            variant="text"
            icon="mdi-close"
            color="gray"
            @click="emit('close')"
          ></v-btn>
        </div>

        <slot />

        <div class="flex justify-end gap-2 mt-4">
          <v-btn variant="text" @click="emit('close')">إلفاء</v-btn>
          <v-btn :loading @click="emit('save')">حفظ</v-btn>
        </div>
      </v-card-text>

    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const emit = defineEmits(['close', 'save'])

defineProps<{
  loading?: boolean;
}>();
</script>
