<template>
  <v-select
    :items="categories"
    item-title="name"
    item-value="id"
    :loading="status === 'pending'"
    placeholder="اختر الفئات"
    multiple
    return-object
  >
    <template v-slot:selection="{ item }">
      <v-chip 
        :color="item.raw.color || 'primary'"
        text-color="white"
        class="me-2"
      >
        {{ item.raw.name }}
      </v-chip>
    </template>
  </v-select>
</template>

<script setup lang="ts">
import type { Category } from '~/types';

// Category store
const categoryStore = useCategoryStore();
const { categories } = storeToRefs(categoryStore);

// Local state for selected categories
const selectedCategories = ref<Category[]>([]);

// Fetch categories data
const { status } = useLazyAsyncData('categories', () => categoryStore.list());

</script>