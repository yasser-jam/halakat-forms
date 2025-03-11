<template>
  <v-container>
    <div class="flex justify-between mt-4 mb-6">
      <div class="text-3xl font-semibold">قائمة الأساتذة</div>

      <v-btn color="primary" elevation="0" to="/teachers/create"
        >إضافة أستاذ جديد</v-btn
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
            :items="teachers"
            :items-length="teachersTotalCount"
            :loading="status == 'pending'"
            :items-per-page="10"
            :page="1"
          >
            <template #item.name="{ item }">
              <div class="flex items-center gap-4 my-2">
                <div class="w-12 h-12 rounded-full bg-gray-200"></div>

                <div class="flex flex-col gap-1">
                  <div class="text-md font-weight-bold">
                    {{ item.first_name + ' ' + item.last_name }}
                  </div>
                </div>
              </div>
            </template>

            <template #item.groups="{ item }">
              <v-chip v-if="!item.groups?.length">غير مسجل بعد</v-chip>
              
              <div v-else>
                <v-chip v-for="group in item.groups" color="success">{{ group.title }}</v-chip>
              </div>
            </template>

            <template #item.mojaz="{ item }">
              <v-chip :color="item.is_mojaz ? 'success' : 'error'">{{
                item.is_mojaz ? 'حاصل على الإجازة' : 'غير حاصل على الإجازة'
              }}</v-chip>
            </template>

            <template #item.phone_number="{ item }">
              <v-chip color="success">{{ item.mobile_phone_number }}</v-chip>
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
                  :to="`teachers/${item.id}`"
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
import { storeToRefs } from 'pinia';

const teacherStore = useTeacherStore();

const { headers, paginationOptions, teachers, teachersTotalCount } =
  storeToRefs(teacherStore);

const key = ref<string>('');

const deleteToggler = ref<boolean>(false);
const deletedId = ref<number>();
const deleteLoading = ref<boolean>(false);

const { status, data, refresh } = useLazyAsyncData<Teacher[]>(() =>
  teacherStore.list()
);

const openDeleteDialog = (id: number) => {
  deletedId.value = id;
  deleteToggler.value = true;
};

const remove = async () => {
  deleteLoading.value = true;

  try {
    await teacherStore.remove(deletedId.value as number);

    await refresh();
  } finally {
    deleteLoading.value = false;
    deleteToggler.value = false;
  }
};

const search = () => {
  data.value = teachers.value.filter((teacher) =>
    teacher.first_name.includes(key.value)
  );
};
</script>
