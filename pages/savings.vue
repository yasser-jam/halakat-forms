<template>
  <v-container>
    <div class="flex justify-between mt-4 mb-6">
      <div class="text-3xl font-semibold">سجلات التسميع</div>

      <v-btn color="primary" elevation="0" to="/savings/create"
        >إضافة جلسة تسميع</v-btn
      >
    </div>
    <v-card>
      <v-card-text>
        <!-- <v-text-field
          v-model="key"
          prepend-inner-icon="mdi-magnify"
          placeholder="ابحث..."
          variant="outlined"
          size="small"
          @update:model-value="search"
        /> -->

        <client-only>
          <v-data-table-server
            :headers="headers"
            :items="savingSessions"
            :items-length="savingSessionsTotalCount"
            :loading="status == 'pending'"
            :items-per-page="paginationOptions.itemsPerPage"
            :page="paginationOptions.page"
          >
            <template #item.student="{ item }">
              <div class="flex items-center gap-4 my-2">
                <div class="w-12 h-12 rounded-full bg-gray-200"></div>

                <div class="flex flex-col gap-1">
                  <div class="text-md font-weight-bold">
                    {{ item.student.first_name + " " + item.student.last_name }}
                  </div>
                </div>
              </div>
            </template>

            <template #item.teacher="{ item }">
              <v-chip v-if="!item.teacher">غير مسجل بعد</v-chip>

              <div v-else>
                <v-chip color="success">{{
                  item.teacher.first_name + " " + item.teacher.last_name
                }}</v-chip>
              </div>
            </template>

            <template #item.rating="{ item }">
              <v-chip>{{ item.rating }}</v-chip>
            </template>

            <template #item.content="{ item }">
              <div class="flex items-center">
                <v-chip>الصفحة {{ item.from }}</v-chip>
  
                <v-icon size="small">mdi-chevron-left</v-icon>
              
                <v-chip>الصفحة {{ item.to }}</v-chip>
              </div>
            </template>


            <template #item.duration="{ item }">
              <v-chip color="success">{{ item.duration }}</v-chip>
            </template>

            <template #item.date="{ item }">
              <v-chip color="blue">{{ dayjs(item.created_at).format('YYYY-mm-d / hh:mm') }}</v-chip>
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
                  :to="`savings/${item.id}`"
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
import dayjs from "dayjs";
import type { SavingSession } from "~/types";

const savingSessionStore = useSavingSessionStore();

const {
  headers,
  paginationOptions,
  savingSessions,
  savingSessionsTotalCount,
  filters,
} = storeToRefs(savingSessionStore);

const key = ref<string>("");

const deleteToggler = ref<boolean>(false);
const deletedId = ref<number>();
const deleteLoading = ref<boolean>(false);

const { status, data, refresh } = useLazyAsyncData<SavingSession[]>(() =>
  savingSessionStore.filter()
);

const openDeleteDialog = (id: number) => {
  deletedId.value = id;
  deleteToggler.value = true;
};

const remove = async () => {
  deleteLoading.value = true;

  try {
    await savingSessionStore.remove(deletedId.value as number);

    await refresh();
  } finally {
    deleteLoading.value = false;
    deleteToggler.value = false;
  }
};
</script>
