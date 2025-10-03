<template>
  <v-container>
    <div class="flex justify-between mt-4 mb-6">
      <div class="text-3xl font-semibold">قائمة الفئات</div>

      <v-btn color="primary" elevation="0" to="/categories/create"
        >إضافة فئة جديدة</v-btn
      >
    </div>
    <v-card>
      <v-card-text>
        <v-text-field
          v-model="key"
          prepend-inner-icon="mdi-magnify"
          placeholder="ابحث..."
          variant="outlined"
          size="small"
          @update:model-value="search"
        />

        <client-only>
          <v-data-table-server 
            :headers="headers"
            :items="categories"
            :items-length="categoriesTotalCount"
            :loading="status == 'pending'"
            :items-per-page="10"
            :page="1"
          >
            <template #item.name="{ item }">
              <div class="flex items-center gap-4 my-2">
                <div class="flex flex-col gap-1">
                  <div class="text-md font-weight-bold">
                    {{ item.name }}
                  </div>
                </div>
              </div>
            </template>

            <template #item.description="{ item }">
              <div class="text-sm text-gray-600 max-w-xs truncate">
                {{ item.description || 'لا يوجد وصف' }}
              </div>
            </template>

            <template #item.color="{ item }">
                <div 
                  class="w-6 h-6 rounded-full border-2 border-gray-300"
                  :style="{ backgroundColor: item.color }"
                ></div>
            </template>

            <template #item.created_at="{ item }">
              <v-chip color="info">
                {{ formatDate(item.created_at) }}
              </v-chip>
            </template>

            <template #item.actions="{ item }">
              <div class="flex gap-2 justify-end">
                <v-btn
                  color="blue"
                  variant="tonal"
                  size="x-small"
                  :rounded="false"
                  class="rounded-lg"
                  icon="mdi-pencil"
                  :to="`categories/${item.id}`"
                ></v-btn>
                <v-btn
                  color="error"
                  variant="tonal"
                  size="x-small"
                  :rounded="false"
                  class="rounded-lg"
                  icon="mdi-trash-can"
                  @click="openDeleteDialog(item.id as number)"
                ></v-btn>
              </div>
            </template>

            <template #bottom></template>
          </v-data-table-server>
        </client-only>
      </v-card-text>
    </v-card>
  </v-container>

  <base-delete-dialog
    v-model="deleteToggler"
    :loading="deleteLoading"
    @delete="remove"
  ></base-delete-dialog>

  <NuxtPage />
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { storeToRefs } from 'pinia';

const categoryStore = useCategoryStore();

const { headers, paginationOptions, categories, categoriesTotalCount } =
  storeToRefs(categoryStore);

const allCategories = ref(categories.value);

const key = ref<string>('');

const deleteToggler = ref<boolean>(false);
const deletedId = ref<number>();
const deleteLoading = ref<boolean>(false);

const { status, data, refresh } = useLazyAsyncData<Category[]>(() =>
  categoryStore.list()
);

const openDeleteDialog = (id: number) => {
  deletedId.value = id;
  deleteToggler.value = true;
};

const remove = async () => {
  deleteLoading.value = true;

  try {
    await categoryStore.remove(deletedId.value as number);

    await refresh();
  } finally {
    deleteLoading.value = false;
    deleteToggler.value = false;
  }
};

const search = () => {
  if (!key.value) return categories.value = allCategories.value;
  
  categories.value = categories.value.filter((category) =>
    category.name.includes(key.value) || 
    category.description?.includes(key.value)
  );
};

const formatDate = (dateString: string) => {
  return dayjs(dateString).format('YYYY/MM/DD');
};
</script>
